import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import ProductGridLatest from './ProductGridLatest';
import styled from 'styled-components/macro';
import { WrapperCentered } from './StyledElements';
import HeaderBar from './HeaderBar';
import HeaderNav from './HeaderNav';
import Footer from "./Footer";
import Banner from './Banner';
import Features from './Features';
import Contact from './Contact';
import Profile from './Profile';
import About from './About';
import Shop from './Shop';

function Layout():JSX.Element {
  return(
    <Wrapper>
      <Header>
        <HeaderBar />
        <HeaderNav />
      </Header>
      <Main>
        <Outlet/>
        <Features/>
      </Main>
      <Footer/>
    </Wrapper>
  )
}

function Home():JSX.Element {
  return(
    <>
      <Banner/>
      <ProductGridLatest/>
    </>
  )
}

function NotFound():JSX.Element{
  return(
    <WrapperCentered>
      <h1>404</h1>
      <h2>Page Not Found</h2>
    </WrapperCentered>
  )
}

function App(): JSX.Element {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='*' element={<NotFound/>} />
        </Route>
      </Routes>
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
