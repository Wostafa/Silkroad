import { useEffect } from 'react';
import { getAuth, UserCredential, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addCurrentUser } from '../Redux/UserSlice';
import { useAppDispatch } from '../Redux/Hooks';
const provider = new GoogleAuthProvider();

// ---- sign in and out
export const SignInHandler = (): void => {
  signInWithPopup(getAuth(), provider)
    .then((result: UserCredential) => {
      console.log('User logged in', result.user);
    })
    .catch(e => {
      console.log('User login failed', e.message);
      alert('Signing in failed, please try again');
    });
};
//
export const SignOutHandler = (): void => {
  getAuth()
    .signOut()
    .then(result => {
      alert('You logged out successfully');
    })
    .catch(e => {
      alert('Logging out failed, please try again');
    });
};

// ------- listening to user's auth state change
export const useFirebaseAuth = (): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(getAuth(), user => {
      if (user !== null) {
        dispatch(addCurrentUser({ displayName: user.displayName, uid: user.uid }));
        console.log('user state changed: Signed In');
      } else {
        dispatch(addCurrentUser(null));
        console.log('user state changed: Signed Out');
      }
    });
    return () => unSubscribe();
  }, []);
};
