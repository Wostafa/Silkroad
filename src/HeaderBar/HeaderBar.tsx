import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import { ShoppingBag, User, LogIn } from 'react-feather';
import { WrapperCentered, UnstyledButton, VisuallyHidden } from '../StyledElements';

function Header(): JSX.Element {
  return (
    <Wrapper>
      <WrapperCentered>
        <WrapperInner>
          <Offer>Free shipping on domestic orders over $85!</Offer>
          <WrapperNav>
            <ButtonLogIn title='Login'>
              <span>Login</span>
              <LogIn size={24} />
            </ButtonLogIn>
            <ButtonProfile>
              <Link to="/profile" title='Profile'>
                <User size={24} />
              </Link>
            </ButtonProfile>
            {/* <div className="header-logout" style={{ display: 'none' }}></div> */}
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
const ButtonLogIn = styled(ButtonWithText)`
`;
const ButtonProfile = styled(ButtonWithText)`
`;
const ButtonBag = styled(Button)``;

export default Header;
