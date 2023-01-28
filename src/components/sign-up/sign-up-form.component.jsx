import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from './../../utilities/firebase/firebase';

import "./sign-up.styles.scss"


const defaultFormFields = {
    displayName: "",
    email: "",
    passwords: "",
    confirmPassword: "",
}

const SingUpform = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword} = formFields;

    const handleSubmit = async (e) => {
        e.preventDefaults()

        if (!password || !confirmPassword) {
          alert("password do not match")
          return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

        }catch (err) {
            console.log("user doesnt not created", err)
        }
        
      }

    const handleChange = (e) => {
        const { name, value} = e.target;

        setFormFields({...formFields, [name]: value})
    }
    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <label>Display Name</label>
                <input className="form-input" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email}/>
                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password}/>
                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SingUpform;