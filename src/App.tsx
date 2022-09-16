import React from 'react';
import styled from 'styled-components/macro';
import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import Banner from './Banner';
import Footer from "./Footer";

function App(): JSX.Element {
  return (
    <div className="App">
      <Header>
        <HeaderBar />
        <HeaderNav />
      </Header>
      <Banner/>
      <Footer/>
    </div>
  );
}

const Header = styled.header`
  width: 100%;
`;
export default App;
