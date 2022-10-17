import React from 'react';
import styled from 'styled-components/macro';
import { WebsiteTitle, CompanyAddress } from '../Constants';
import Subscribe from './Subscribe';
import Links from './Links';

export default function Footer(): JSX.Element {
  return (
    <Wrapper>
      <NavWrapper>
        <EmailWrapper>
          <h2>{WebsiteTitle}</h2>
          <Subscribe />
          <Address>{CompanyAddress}</Address>
        </EmailWrapper>
        <Links />
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

const Address = styled.div`
  color: var(--color-sub-text);
  margin-top: 32px;
`;
