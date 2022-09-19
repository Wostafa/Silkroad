import React from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, UnstyledButton } from '../StyledElements';
import { WebsiteTitle } from '../Constants';
import { Search } from 'react-feather';
import { Link } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <WrapperCentered>
      <Wrapper>
        {/* <WrapperInner> */}
        <Logo>{WebsiteTitle}</Logo>
        {/* <Nav> */}
        <List>
          <Item><Link to="/">Home</Link></Item>
          <Item><Link to="/shop">Shop</Link></Item>
          <Item>
            <Link to="/about">About</Link>
          </Item>
          <Item>
            <Link to="/contact">Contact</Link>
          </Item>
        </List>
        <SearchWrapper>
          <Input type={'search'}></Input>
          <Button>
            <Search size={24} />
          </Button>
        </SearchWrapper>
        {/* </Nav> */}
        {/* </WrapperInner> */}
      </Wrapper>
    </WrapperCentered>
  );
}

const Wrapper = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border-gray);
`;
// const WrapperInner = styled.div`
//   height: 40px;
// `;
const Logo = styled.a`
  font-size: calc(34 / 16 * 1rem);
  font-weight:700;
`;
// const Nav = styled.div``;
const List = styled.ul`
  display: flex;
  gap: 36px;
  font-family: var(--font-family-lato);
`;
const Item = styled.li`
  font-weight:600;

  &:hover a {
    color: var(--color-pink-hover);
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  height: 40px;
`;
const Input = styled.input`
  width: 270px;
  height: 100%;
  border-radius: var(--input-radius) 0 0 var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  border-right: none;
  font-size: 1rem;
  padding: 0 8px;
`;
const Button = styled(UnstyledButton)`
  background-color: var(--color-pink);
  height: 100%;
  color: white;
  width: 50px;
  border-radius: 0 var(--button-radius) var(--button-radius) 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
