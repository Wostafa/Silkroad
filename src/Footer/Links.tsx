import React from 'react';
import styled from 'styled-components/macro';

export default function Links(): JSX.Element {
  return (
    <LinksWrapper>
      <Column>
        <h3>Catagories</h3>
        <List>
          <li>
            <a href='#'>Cameras & Photography</a>
          </li>
          <li>
            <a href='#'>Laptops & Computers</a>
          </li>
          <li>
            <a href='#'>Smart Phones & Tablets</a>
          </li>
          <li>
            <a href='#'>Video Games & Consoles</a>
          </li>
          <li>
            <a href='#'>Waterproof Headphones</a>
          </li>
        </List>
      </Column>
      <Column>
        <h3>Customer Care</h3>
        <List>
          <li>
            <a href='#'>My Account</a>
          </li>
          <li>
            <a href='#'>Discount</a>
          </li>
          <li>
            <a href='#'>Returns</a>
          </li>
          <li>
            <a href='#'>Orders History</a>
          </li>
          <li>
            <a href='#'>Order Tracking</a>
          </li>
        </List>
      </Column>
      <Column>
        <h3>Pages</h3>
        <List>
          <li>
            <a href='#'>Blog</a>
          </li>
          <li>
            <a href='#'>Browse the Shop</a>
          </li>
          <li>
            <a href='#'>Category</a>
          </li>
          <li>
            <a href='#'>Pre-Built Pages</a>
          </li>
          <li>
            <a href='#'>Visual Composer Elements</a>
          </li>
          <li>
            <a href='#'>WooCommerce Pages</a>
          </li>
        </List>
      </Column>
    </LinksWrapper>
  );
}

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
