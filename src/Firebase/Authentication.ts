import {getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import './App';

const provider = new GoogleAuthProvider();

export async function SignIn(): Promise<UserCredential> {
      return await signInWithPopup(getAuth(), provider)    
}



