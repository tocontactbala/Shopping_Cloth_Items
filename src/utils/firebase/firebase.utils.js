import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAz71IsYDjZGB8TtT9gyTRSihVnnI0NPDY",
    authDomain: "crwn-clothing-db-68449.firebaseapp.com",
    projectId: "crwn-clothing-db-68449",
    storageBucket: "crwn-clothing-db-68449.appspot.com",
    messagingSenderId: "988752789379",
    appId: "1:988752789379:web:5b4e2989a31eb8532280b6"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  //export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    //console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    //console.log(userSnapshot);
    //console.log(userSnapshot.exists());

    //if user data does not exists
    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInAuthUserWithEmailAndPassword(auth, email, password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

