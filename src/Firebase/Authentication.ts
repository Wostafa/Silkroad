import {getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth'
import './App';


const provider = new GoogleAuthProvider();
const auth = getAuth();

export type {UserCredential};

export async function SignIn(): Promise<UserCredential> {
      return await signInWithPopup(auth, provider)    
}