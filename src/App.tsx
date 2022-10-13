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
import Cart from './Cart'
import Product from './Product';
import HeaderTitle from './HeaderTitle';

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
      <h2>Page Not Found</h2>
    </WrapperCentered>
  )
}

function Page(content:JSX.Element, title:string): JSX.Element{
  return (
    <>
      <HeaderTitle title={title}/>
      {content}
    </>
  )
}

function App(): JSX.Element {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='/product/:id' element={Page(<Product/>, 'Product Details')} />
          <Route path='/shop' element={Page(<Shop/>, 'Shop')} />
          <Route path='/contact' element={Page(<Contact/>, 'Contact Us')} />
          <Route path='/about' element={Page(<About/>, 'About Us')} />
          <Route path='/profile' element={Page(<Profile/>, 'My Account')} />
          <Route path='/cart' element={Page(<Cart/>, 'Shopping Cart')} />
          <Route path='*' element={Page(<NotFound/>, '404')} />
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
