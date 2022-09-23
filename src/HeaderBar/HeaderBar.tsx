import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ShoppingBag, User as UserIcon, LogIn, LogOut } from 'react-feather';
import { WrapperCentered, UnstyledButton, VisuallyHidden } from '../StyledElements';
import { SignIn, UserCredential, auth, onUserStateChanged, User } from '../Firebase/Authentication';

function Header(): JSX.Element {
  const [userSignedIn, setUserSignIn] = useState<User | false>(false);

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

  const SignOutHandler = (): void => {
    auth
      .signOut()
      .then(result => {
        alert('You logged out successfully');
      })
      .catch(e => {
        alert('Logging out failed, please try again');
      });
  };

  const LoggedInOut = (): JSX.Element => {
    if (userSignedIn !== false)
      return (
        <LoggedInOutWrapper>
          <ButtonProfile>
            <Link to='/profile' title='Profile'>
              <span>{userSignedIn.displayName}</span>
              <UserIcon size={24} />
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

  useEffect(() => {
    console.log('render');
    onUserStateChanged(auth, user => {
      if (user !== null) {
        setUserSignIn(user);
        console.log('im in', user);
      } else {
        setUserSignIn(false);
        console.log('im out', user);
      }
    });
  }, []);

  return (
    <Wrapper>
      <WrapperCentered>
        <WrapperInner>
          <Offer>Free shipping on domestic orders over $85!</Offer>
          <WrapperNav>
            <LoggedInOut />
            <ButtonBag title='Cart'>
              <VisuallyHidden>Cart</VisuallyHidden>
              <ShoppingBag size={24} />
            </ButtonBag>
          </WrapperNav>
        </WrapperInner>
      </WrapperCentered>
    </Wrapper>
  );
}
const Button = styled(UnstyledButton)`
  display:flex;
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
const ButtonBag = styled(Button)``;
const LoggedInOutWrapper = styled.div`
  display: flex;
  gap: 32px;
`;

export default Header;
