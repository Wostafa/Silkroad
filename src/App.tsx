import React from 'react';
import styled from 'styled-components/macro';
import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import Banner from './Banner';
import Footer from "./Footer";
import Features from './Features';

function App(): JSX.Element {
  return (
    <Wrapper>
      <Header>
        <HeaderBar />
        <HeaderNav />
      </Header>
      <Main>
        <Banner/>
        <Features/>
      </Main>
      <Footer/>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display:flex;
  flex-direction:column;
  height: 100%;
`
const Main = styled.main`
  margin-bottom: var(--margin-row);
`

const Header = styled.header`
  width: 100%;
`;
export default App;
