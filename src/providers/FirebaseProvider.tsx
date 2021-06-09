import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import firebase from "firebase";
import "firebase/auth";
import { Notifications } from "components/Navbar/Navbar";

interface UserData {
  tags: string[];
  notifications: Notifications;
  currentToken: string[];
}

interface IFirebaseContext {
  currentUser: firebase.User | null;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  setTags: (tags: string[]) => Promise<void | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>;
  setNotifications: (notifications: Notifications) => Promise<void>;
  getUserData: () => Promise<firebase.firestore.DocumentSnapshot<UserData> | undefined>;
  loginWithFacebook: () => Promise<void>;
  loginWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  loadingUserData: boolean;
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
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

var userDataConveter = {
  toFirestore: (user: any) => {
    return {
      uid: user.uid,
      tags: user.tags,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data: UserData = snapshot.data(options);
    return data;
  },
};

const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  const [loadingUserData, setLoadingUserData] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const messaging = firebase.messaging();

  messaging.onMessage((payload) => {
    console.dir(payload);
  });

  const loginWithEmail = async (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      result.user?.emailVerified ? setCurrentUser(result.user) : setCurrentUser(null);
    });

  const loginWithFacebook = async () => {
    return auth.signInWithPopup(facebookProvider).then((result) => {
      setCurrentUser(result.user);
    });
  };

  const loginWithTwitter = async () => {
    return auth.signInWithPopup(twitterProvider).then((result) => {
      setCurrentUser(result.user);
    });
  };

  const logout = async () => {
    return auth.signOut();
  };

  const register = async (email: string, password: string) => auth.createUserWithEmailAndPassword(email, password);

  const setTags = async (tags: string[]) => {
    if (currentUser) {
      return firestore.collection("users").doc(currentUser.uid).update({ tags });
    }
  };

  const setNotifications = async (notifications: Notifications) => {
    if (currentUser) {
      return firestore.collection("users").doc(currentUser.uid).update({ notifications });
    }
  };

  const setToken = async (currentToken: string, user: firebase.User) => {
    if (user?.uid) {
      getUserData().then((userData) => {
        const data = userData?.data();
        let newTokens: string[] = [];
        if (data?.currentToken) {
          if (data?.currentToken.length >= 3) {
            newTokens = [currentToken, data.currentToken[0], data.currentToken[1]];
          } else {
            newTokens = [currentToken, ...data.currentToken];
          }
        }
        newTokens = newTokens.length > 0 ? newTokens : [currentToken];
        return firestore.collection("users").doc(user.uid).update({ tokens: newTokens });
      });
    }
  };

  const getUserData = async () => {
    if (currentUser) {
      return firestore
        .collection("users")
        .doc(currentUser.uid)
        .withConverter(userDataConveter)
        .get()
        .then((data) => {
          setLoadingUserData(false);
          return data;
        });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        firestore
          .collection("users")
          .doc(user?.uid)
          .get()
          .then((x) => {
            if (!x.exists) {
              firestore.collection("users").doc(user?.uid).set({});
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
        loginWithEmail,
        loginWithFacebook,
        loginWithTwitter,
        register,
        setTags,
        setNotifications,
        getUserData,
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
