import {getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, onAuthStateChanged, User } from 'firebase/auth'
import './App';


const provider = new GoogleAuthProvider();
export const auth = getAuth();
export type {UserCredential, User};
export const onUserStateChanged = onAuthStateChanged;

export async function SignIn(): Promise<UserCredential> {
      return await signInWithPopup(auth, provider)    
}



