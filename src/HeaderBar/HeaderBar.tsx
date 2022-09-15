import React from 'react';
import styled from 'styled-components/macro';
import { ShoppingBag, LogIn } from 'react-feather';
import { WrapperCentered, UnstyledButton, VisuallyHidden } from '../StyledElements';

function Header(): JSX.Element {
  return (
    <Wrapper>
      <WrapperCentered>
        <WrapperInner>
          <Offer>Free shipping on domestic orders over $85!</Offer>
          <WrapperNav>
            <ButtonLogin>
              <span>Login</span>
              <LogIn size={24} />
            </ButtonLogin>
            {/* <div className="header-logout" style={{ display: 'none' }}></div> */}
            <ButtonBag>
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
const ButtonLogin = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;
const ButtonBag = styled(Button)``;

export default Header;
