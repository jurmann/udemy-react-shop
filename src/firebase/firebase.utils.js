import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC61E9Gvmm_XPdHoFZ8_7SHyYuEmPGG50Q",
  authDomain: "udemy-react-shop.firebaseapp.com",
  databaseURL: "https://udemy-react-shop.firebaseio.com",
  projectId: "udemy-react-shop",
  storageBucket: "udemy-react-shop.appspot.com",
  messagingSenderId: "460106548275",
  appId: "1:460106548275:web:ba3adb85ab76e94a1d4f46",
  measurementId: "G-KS7YX4RWTH",
};

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
