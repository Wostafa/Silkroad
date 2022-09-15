import React from 'react'
import styled from 'styled-components/macro';
// hi im here
function Footer(): JSX.Element {
  return(
  <Wrapper>
    <NavWrapper></NavWrapper>
    <CopyrightWrapper></CopyrightWrapper>
  </Wrapper>
  )
}

const Wrapper = styled.footer`
  width: 100%
  max-width: var(--max-width-full-wide);
  background-color: var(--color-fill-page2);
  margin-top:20px;
  height: var(--height-footer);
`
const NavWrapper = styled.div`
  height: 90%
`
const CopyrightWrapper = styled.div`
  height:10%;
  background-color: var(--color-footer-bottom);
  display:flex;
`

export default Footer;