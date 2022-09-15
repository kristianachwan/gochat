import firebase from 'firebase/compat/app';  
import { projectAuth } from '../config';
export default function SignIn() {  
    
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider() 
        projectAuth.signInWithPopup(provider)
    }
    return (<button className="sign-in" onClick={signInWithGoogle}>Sign in with google</button>)
  }