import React from 'react';
import styled from 'styled-components/macro';
import { WebsiteTitle, CompanyAddress } from '../Constants';
import { LinkButton } from '../StyledElements';
// hi im here
function Footer(): JSX.Element {
  return (
    <Wrapper>
      <NavWrapper>
        <EmailWrapper>
          <h2>{WebsiteTitle}</h2>
          <SignUpWrapper>
            <SignUpInput type={'email'} placeholder={'Enter Email Address'}></SignUpInput>
            <LinkButton>Sign Up</LinkButton>
          </SignUpWrapper>
          <Address>{CompanyAddress}</Address>
        </EmailWrapper>
        <LinksWrapper>
          <Column>
            <h3>Catagories</h3>
            <List>
              <li>
                <a href="#">Cameras & Photography</a>
              </li>
              <li>
                <a href="#">Laptops & Computers</a>
              </li>
              <li>
                <a href="#">Smart Phones & Tablets</a>
              </li>
              <li>
                <a href="#">Video Games & Consoles</a>
              </li>
              <li>
                <a href="#">Waterproof Headphones</a>
              </li>
            </List>
          </Column>
          <Column>
            <h3>Customer Care</h3>
            <List>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Discount</a>
              </li>
              <li>
                <a href="#">Returns</a>
              </li>
              <li>
                <a href="#">Orders History</a>
              </li>
              <li>
                <a href="#">Order Tracking</a>
              </li>
            </List>
          </Column>
          <Column>
            <h3>Pages</h3>
            <List>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Browse the Shop</a>
              </li>
              <li>
                <a href="#">Category</a>
              </li>
              <li>
                <a href="#">Pre-Built Pages</a>
              </li>
              <li>
                <a href="#">Visual Composer Elements</a>
              </li>
              <li>
                <a href="#">WooCommerce Pages</a>
              </li>
            </List>
          </Column>
        </LinksWrapper>
      </NavWrapper>
      <CopyrightWrapper>
        <span>©{WebsiteTitle} - All Rights Reserved</span>
      </CopyrightWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto; /* for flex */
  max-width: var(--max-width-full-wide);
  background-color: var(--color-fill-page2);
  height: var(--height-footer);
  min-height: var(--height-footer);
  padding: 0 var(--gutter2x);
`;
const NavWrapper = styled.div`
  height: 90%;
  display: flex;
  gap: 32px;
  justify-content: space-around;
  align-items: center;
`;
const CopyrightWrapper = styled.div`
  height: 10%;
  background-color: var(--color-footer-bottom);
  display: flex;
  border-radius: var(--box-radius) var(--box-radius) 0 0;
  justify-content: center;
  align-items: center;
  color: var(--color-sub-text);
`;
const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;

  h2 {
    margin-top: 0;
  }
`;

const SignUpWrapper = styled.div`
  display: flex;
  gap: 5px;
`;
// const SignUpButton = styled.a`
//   text-decoration:none;

// `
const SignUpInput = styled.input`
  border: 2px solid var(--color-soft-gray);
  font-size: 1rem;
  padding: 0 8px;
  color: var(--color-sub-text);
  width: 300px;
`;

const Address = styled.div`
  color: var(--color-sub-text);
  margin-top: 32px;
`;
const LinksWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  flex: 5;
`;
const Column = styled.div`
  font-family: var(--font-family-lato);

  h3 {
    letter-spacing: var(--letter-spacing-heading-lato);
  }
`;
const List = styled.ul`
  > li {
    margin-bottom: 16px;

    &:hover > a {
      color: var(--color-sub-text-hover);
    }
    > a {
      text-decoration: none;
      color: var(--color-sub-text);
      letter-spacing: var(--letter-spacing-lato);
    }
  }
`;

export default Footer;
