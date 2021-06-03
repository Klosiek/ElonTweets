import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import "firebase/auth";

interface IFirebaseContext {
  currentUser: firebase.User | null;
  loginWithEmail: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  register: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  setTags: (
    tags: string[]
  ) => Promise<
    | firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
    | undefined
  >;
  loginWithFacebook: () => Promise<void>;
  loginWithTwitter: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
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

const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const loginWithEmail = async (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

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

  const register = async (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const setTags = async (tags: string[]) => {
    if (currentUser)
      return firestore
        .collection("users")
        .add({ userId: currentUser?.uid, tags });
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.dir(user?.email);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        loginWithEmail,
        register,
        currentUser,
        setTags,
        loginWithFacebook,
        loginWithTwitter,
        logout,
        loading,
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
