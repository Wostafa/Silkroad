import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { ShoppingBag, User as UserIcon, LogIn, LogOut, Menu } from 'react-feather';
import { WrapperCentered, UnstyledButton, VisuallyHidden } from '../StyledElements';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { selectUser } from '../Redux/UserSlice';
import { fetchCart, selectCart } from '../Redux/CartSlice';
import { QUERIES } from '../Constants';
import MobileMenu from './MobileMenu';
import * as Auth from './Auth';

function Header(): JSX.Element {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector(selectCart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  Auth.useFirebaseAuth();

  // ------------------

  const onMenuButton = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  // ----
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

  // --------- show buttons based on user state
  const LoggedInOut = (): JSX.Element => {
    if (user !== null)
      return (
        <LoggedInOutWrapper>
          <ButtonProfile>
            <Link to='/profile' title='Profile'>
              <UserName>{user.displayName}</UserName>
              <UserIcon size={24} />
              <VisuallyHidden>my account</VisuallyHidden>
            </Link>
          </ButtonProfile>
          <ButtonLogOut title='logout' onClick={Auth.SignOutHandler}>
            <VisuallyHidden>Logout</VisuallyHidden>
            <LogOut size={24} />
          </ButtonLogOut>
        </LoggedInOutWrapper>
      );
    else
      return (
        <ButtonLogIn title='Login' onClick={Auth.SignInHandler}>
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
            <ButtonMenu onClick={() => onMenuButton()}>
              <Menu size={24} />
              <VisuallyHidden>Open Menu</VisuallyHidden>
            </ButtonMenu>
          </WrapperNav>
        </WrapperInner>
      </WrapperCentered>
      <MobileMenu isOpen={isMenuOpen} onDismiss={onMenuButton} />
    </Wrapper>
  );
}

// ------------------
const Button = styled(UnstyledButton)`
  display:flex;
  align-items:center;
  &:hover {
    opacity: 0.8;
  }
`;
const Wrapper = styled.div`
  background-color: var(--color-purple);
  color: white;
  width: 100%;

  @media ${QUERIES.tabletAndSmaller} {
  }
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
  gap: 32px;

  @media ${QUERIES.tabletAndSmaller} {
    margin-left:auto;
  }
`;
const Offer = styled.div`
  @media ${QUERIES.phoneAndSmaller} {
    display: none;
  }
`;
const ButtonWithText = styled(Button)`
  justify-content: space-between;
  gap: 8px;
`;

const UserName = styled.div`
  @media ${QUERIES.tabletAndSmaller} {
    display: none;
  }
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

const ButtonMenu = styled(Button)`
  display: none;

  @media ${QUERIES.tabletAndSmaller} {
    display: flex;
  }
`;

export default Header;
