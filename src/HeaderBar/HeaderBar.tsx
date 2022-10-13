import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ShoppingBag, User as UserIcon, LogIn, LogOut } from 'react-feather';
import { WrapperCentered, UnstyledButton, VisuallyHidden } from '../StyledElements';
import { SignIn } from '../Firebase/Authentication';
import { getAuth, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { addCurrentUser, selectUser } from '../Redux/UserSlice';
import { fetchCart, selectCart } from '../Redux/CartSlice';

function Header(): JSX.Element {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  // ------------------
  const cartHandler = (): void => {
    if (user == null) {
      alert('You must login to manage your cart');
    } else {
      navigate('/cart');
    }
  };
  // ---- fetch cart
  useEffect(() => {
    if (user === null) return;
    const _fetchCart = async (): Promise<void> => {
      await dispatch(fetchCart(user.uid));
    };
    _fetchCart().catch(() => {});
  }, [user]);

  // ---- sign in and out
  const SignInHandler = (): void => {
    SignIn()
      .then((result: UserCredential) => {
        console.log('User logged in', result.user);
      })
      .catch(e => {
        console.log('User login failed', e.message);
        alert('Signing in failed, please try again');
      });
  };
  //
  const SignOutHandler = (): void => {
    getAuth()
      .signOut()
      .then(result => {
        alert('You logged out successfully');
      })
      .catch(e => {
        alert('Logging out failed, please try again');
      });
  };

  // ----------------
  useEffect(() => {
    console.log('render HeaderBar');
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

  // --------- show buttons based on user state
  const LoggedInOut = (): JSX.Element => {
    if (user !== null)
      return (
        <LoggedInOutWrapper>
          <ButtonProfile>
            <Link to='/profile' title='Profile'>
              <span>{user.displayName}</span>
              <UserIcon size={24} />
              <VisuallyHidden>my account</VisuallyHidden>
            </Link>
          </ButtonProfile>
          <ButtonLogOut title='logout' onClick={SignOutHandler}>
            <VisuallyHidden>Logout</VisuallyHidden>
            <LogOut size={24} />
          </ButtonLogOut>
        </LoggedInOutWrapper>
      );
    else
      return (
        <ButtonLogIn title='Login' onClick={SignInHandler}>
          <VisuallyHidden>login</VisuallyHidden>
          <LogIn size={24} />
        </ButtonLogIn>
      );
  };

  return (
    <Wrapper>
      <WrapperCentered>
        <WrapperInner>
          <Offer>Free shipping on domestic orders over $85!</Offer>
          <WrapperNav>
            <LoggedInOut />
            <ButtonCart onClick={() => cartHandler()} title='Cart'>
              <VisuallyHidden>Cart</VisuallyHidden>
              <Counter>{cart.length}</Counter>
              <ShoppingBag size={24} />
            </ButtonCart>
          </WrapperNav>
        </WrapperInner>
      </WrapperCentered>
    </Wrapper>
  );
}

// ------------------
const Button = styled(UnstyledButton)`
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
`;
const Wrapper = styled.div`
  background-color: var(--color-purple);
  color: white;
  width: 100%;
`;
const WrapperInner = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  height: 46px;
`;
const WrapperNav = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
`;
const Offer = styled.div``;
const ButtonWithText = styled(Button)`
  justify-content: space-between;
  gap: 8px;
`;
const ButtonLogIn = styled(Button)``;
const ButtonLogOut = styled(Button)``;
const ButtonProfile = styled(ButtonWithText)`
  a {
    display: flex;
    gap: 8px;
    align-items: end;
  }
`;
const ButtonCart = styled(Button)`
  position: relative;
`;

const Counter = styled.div`
  position: absolute;
  right: -4px;
  bottom: -4px;
  height: 18px;
  width: 18px;
  background-color: var(--color-pink);
  color: white;
  display: flex;
  border-radius: 18%;
  align-items: center;
  justify-content: center;
  line-height: 0;
  font-family: var(--font-family-lato);
`;
const LoggedInOutWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export default Header;
