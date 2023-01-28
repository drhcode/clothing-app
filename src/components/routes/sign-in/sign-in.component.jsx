import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../../utilities/firebase/firebase'
import SingUpform from '../../sign-up/sign-up-form.component';

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log( user );
        const userDocRef = await createUserDocumentFromAuth(user)
    }

  return (
    <div>
        <h1>Sign in</h1>
        <button onClick={logGoogleUser}>Sig in with Google</button>
        <SingUpform />
    </div>
  )
}

export default SignIn