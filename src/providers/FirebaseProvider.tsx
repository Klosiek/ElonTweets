import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import * as SharedTypes from "shared/types";
interface IFirebaseContext {
  currentUser: firebase.User | null;
  loginWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  loginWithFacebook: () => Promise<firebase.auth.UserCredential>;
  loginWithTwitter: () => Promise<firebase.auth.UserCredential>;
  register: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  resetUserPassword: (email: string) => Promise<void>;
  getUserData: (uid: string) => Promise<firebase.firestore.DocumentSnapshot<SharedTypes.UserData>>;
  setTags: (tags: string[]) => Promise<void | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
  subscribeToSet: (set: string) => Promise<string[] | undefined>;
  unsubscribeFromSet: (set: string) => Promise<string[] | undefined>;

  logout: () => Promise<void>;
  loading: boolean;
  loadingUserData: boolean;
  isNewUser: boolean;
}
const firebaseConfig = {
  apiKey: "AIzaSyDbKv6Wvvd1Ilgl0MxfgJYoR5OXITAwphY",
  authDomain: "filtrelon.firebaseapp.com",
  projectId: "filtrelon",
  storageBucket: "filtrelon.appspot.com",
  messagingSenderId: "557349282817",
  appId: "1:557349282817:web:cf8fe492a0963f1558cc00",
};

const FirebaseContext = createContext<IFirebaseContext | null>(null);
const firebaseInit = firebase.initializeApp(firebaseConfig);
const auth = firebaseInit.auth();
const firestore = firebaseInit.firestore();
const usersCollection = firestore.collection("users");
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

var userDataConveter = {
  toFirestore: (user: any) => {
    return {
      uid: user.uid,
      tags: user.tags,
      sets: user.sets,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data: SharedTypes.UserData = snapshot.data(options);
    return data;
  },
};

const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.dir(payload);
  });

  const loginWithEmail = async (email: string, password: string) => {
    return await auth.signInWithEmailAndPassword(email, password);
  };

  const loginWithFacebook = async () => {
    return await auth.signInWithPopup(facebookProvider);
  };

  const loginWithTwitter = async () => {
    return await auth.signInWithPopup(twitterProvider);
  };

  const register = async (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);

  const resetUserPassword = async (email: string) => auth.sendPasswordResetEmail(email);

  const logout = async () => {
    return auth.signOut();
  };

  const setTags = async (tags: string[]) => {
    if (currentUser) {
      return usersCollection.doc(currentUser.uid).update({ tags });
    }
  };

  const setToken = async (currentToken: string, user: firebase.User) => {
    if (user?.uid) {
      getUserData(user.uid).then((userData) => {
        const data = userData.data();
        if (data?.currentToken!?.length >= 3) {
          const newTokens = [currentToken, data!.currentToken[0], data!.currentToken[1]];
          return usersCollection.doc(user.uid).update({ tokens: newTokens ? newTokens : [currentToken] });
        } else if (data?.currentToken) {
          const newTokens = [currentToken, ...data.currentToken];
          return usersCollection.doc(user.uid).update({ tokens: newTokens ? newTokens : [currentToken] });
        }
      });
    }
  };

  const getUserData = async (uid: string) => {
    return usersCollection
      .doc(uid)
      .withConverter(userDataConveter)
      .get()
      .then((data) => {
        setLoadingUserData(false);
        return data;
      });
  };

  const subscribeToSet = async (set: string) => {
    if (currentUser) {
      const userSets = await getUserData(currentUser.uid);
      const data = userSets.data();
      if (data?.sets) {
        const sets = [...data.sets, set];
        const newSets = Array.from(new Set(sets));
        usersCollection.doc(currentUser.uid).withConverter(userDataConveter).update({ sets: newSets });
        return newSets;
      } else {
        usersCollection
          .doc(currentUser.uid)
          .withConverter(userDataConveter)
          .update({ sets: [set] });
        return [set];
      }
    }
  };

  const unsubscribeFromSet = async (set: string) => {
    if (currentUser) {
      const userSets = await getUserData(currentUser.uid);
      const data = userSets.data();
      if (data?.sets) {
        const sets = [...data.sets];
        if (sets.includes(set)) {
          const newSets = sets.filter((x) => x !== set);
          usersCollection.doc(currentUser.uid).withConverter(userDataConveter).update({ sets: newSets });
          return newSets;
        }
      }
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        console.log(user.metadata.creationTime);
        console.log(user.metadata.lastSignInTime);
        setIsNewUser(user.metadata.creationTime === user.metadata.lastSignInTime);
        usersCollection
          .doc(user?.uid)
          .get()
          .then((x) => {
            if (!x.exists) {
              usersCollection.doc(user?.uid).set({});
            }
          });

        Notification.requestPermission()
          .then(() => {
            console.log("Notification permission granted.");
            return messaging.getToken();
          })
          .then((token) => {
            if (token) {
              setToken(token, user);
              console.dir(token);
            }
          })
          .catch(function (err) {
            console.log("Unable to get permission to notify.", err);
          });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        loading,
        loadingUserData,
        currentUser,
        isNewUser,
        loginWithEmail,
        loginWithFacebook,
        loginWithTwitter,
        register,
        resetUserPassword,
        getUserData,
        setTags,
        subscribeToSet,
        unsubscribeFromSet,
        logout,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext) as IFirebaseContext;
  return context;
};
export default FirebaseProvider;
