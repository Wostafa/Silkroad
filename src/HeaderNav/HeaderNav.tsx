import React from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered } from '../StyledElements';
import { WebsiteTitle, QUERIES } from '../Constants';
import { Link } from 'react-router-dom';
import Search from './Search';

function Header(): JSX.Element {
  return (
    <WrapperCentered>
      <Wrapper>
        <Logo>{WebsiteTitle}</Logo>
        <List>
          <Item>
            <Link to='/'>Home</Link>
          </Item>
          <Item>
            <Link to='/shop'>Shop</Link>
          </Item>
          <Item>
            <Link to='/about'>About</Link>
          </Item>
          <Item>
            <Link to='/contact'>Contact</Link>
          </Item>
        </List>
        <Search />
      </Wrapper>
    </WrapperCentered>
  );
}

const Wrapper = styled.div`
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap:16px;
`;
const Logo = styled.a`
  font-size: calc(34 / 16 * 1rem);
  font-weight: 700;
`;
const List = styled.ul`
  display: flex;
  gap: 36px;
  font-family: var(--font-family-lato);

  @media ${QUERIES.tabletAndSmaller} {
    display:none;
  }
`;
const Item = styled.li`
  font-weight: 600;

  &:hover a {
    color: var(--color-pink-hover);
  }
`;

export default Header;
