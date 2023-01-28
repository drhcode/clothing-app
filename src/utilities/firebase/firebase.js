import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc,  } from 'firebase/firestore'
// import { collection, onSnapshot, query, where  } from '@firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBFJ4XgBElXx8u7kx569zE0CHc2jFTZtrs",
  authDomain: "clothing-app-db-86d00.firebaseapp.com",
  projectId: "clothing-app-db-86d00",
  storageBucket: "clothing-app-db-86d00.appspot.com",
  messagingSenderId: "5757038333",
  appId: "1:5757038333:web:599ba573fff77e82e91894"
};


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
    if(!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.user.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)




    // if user data exists, create / set the document with data from userAuth in the collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userSnapshot;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, 
                {
                    displayName,
                    email,
                    createdAt, 
                    ...additionalInformation
                });
        }catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    createUserWithEmailAndPassword(auth, email, password)
}