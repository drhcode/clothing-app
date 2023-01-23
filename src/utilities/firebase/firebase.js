import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'


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
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = ()=> signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot)
    console.log(userSnapshot.exists())



    // if user data exists, create / set the document with data from userAuth in the collection
    if(!userSnapshot.exists()) {
        const { displayName, email } = userSnapshot;
        const createAt = new Date();

        try {
            await setDoc(userDocRef, 
                {
                    displayName,
                    email,
                    createAt
                });
        }catch (error) {
            console.log('Error creating the user', error.message);
        }
    }

    return userDocRef;

    // return userdocRef
}