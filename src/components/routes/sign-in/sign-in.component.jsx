import React from 'react'
import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utilities/firebase/firebase'

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
  return (
    <div>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sig in with Google</button>
    </div>
  )
}

export default SignIn