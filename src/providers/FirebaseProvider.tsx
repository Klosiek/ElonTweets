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
  login: (
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

const FirebaseProvider = ({ children }: { children: ReactElement }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  const loginWithEmail = async (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

  const loginWithFacebook = async () => {
    return auth
      .signInWithPopup(facebookProvider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // The signed-in user info.
        var user = result.user;
        setCurrentUser(result.user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;

        // ...
      });
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
      setCurrentUser(user);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        login: loginWithEmail,
        register,
        currentUser,
        setTags,
        loginWithFacebook,
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
