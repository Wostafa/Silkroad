import React from 'react';
import styled from 'styled-components/macro';
import { WebsiteTitle, CompanyAddress, QUERIES } from '../Constants';
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
  // height: var(--height-footer);
  // min-height: var(--height-footer);
  padding: 0 var(--gutter2x);
`;
const NavWrapper = styled.div`
  height: fit-content;
  display: flex;
  gap: 32px;
  justify-content: space-around;
  align-items: start;
  margin: 32px 0;

  @media ${QUERIES.tabletAndSmaller} {
    flex-direction:column;
    align-items: center;

  }
`;
const CopyrightWrapper = styled.div`
  height: 40px;
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
  gap: 24px;

  h2 {
    margin: 0;

    @media ${QUERIES.tabletAndSmaller}{
      text-align:center;
    }
  }
`;

const Address = styled.div`
  color: var(--color-sub-text);
`;
