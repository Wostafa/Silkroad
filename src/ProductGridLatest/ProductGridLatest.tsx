import React from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, LinkButton, Spacer } from '../StyledElements';

function Product(): JSX.Element {
  return(
    <>
      <ImageWrapper >
        <Image src="./template/image-1169.png" alt="" />
      </ImageWrapper>
      <Name>Cantilever chair</Name>
      <Price>$42.00</Price>
    </>
  )
}

function getProduct() : JSX.Element[]{
  const array = [];
 for(let i = 0; i < 8; i++){
  const p = Product();
  array.push(p)
 } 
 return array;
}


function ProductGridLatest(): JSX.Element {
  return(
    <WrapperCentered>
      <Wrapper>
        <h1>Latest Products</h1>
        <WrapperGrid>

        { 
          getProduct().map((pr, index) => (
            <Link href='#' key={index}>
              {pr}
            </Link>
          ))
        }
        </WrapperGrid>
          <Button href='#'>See More</Button>
      
      </Wrapper>
      <Spacer size={32} />
    </WrapperCentered>
  )
}

const Wrapper = styled.section`
  h1 {
    text-align:center;
    color: var(--color-off-blue);
  }
`
const WrapperGrid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`
const Link = styled.a`
  --margin-top: 16px;
  --color-name: var(--color-pink);
  --color-price: var(--color-off-blue);
  display:block;
  height: 350px;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--color-border-gray);
  text-decoration:none;
  transition: 400ms;

  &:hover {
    background-color: var(--color-product-background);
    transition: 200ms;
  }
  &:hover 

`
const ImageWrapper = styled.div`
  background-color: var(--color-product-background);
  height: 230px;
  display: flex;
  justify-content:center;
  align-items:center;
`
const Image = styled.img`
  width: 175px;
  height: 175px;
  margin: 0 auto;
`

const Name = styled.div`
  color: var(--color-name);
  font-family: var(--font-family-lato);
  font-weight: 700;
  font-size: var(--font-size-product-name);
  text-align: center;
  letter-spacing: var(--letter-spacing-lato-2x);
  margin-top: var(--margin-top);
`
const Price = styled.div`
  color: var(--color-price);
  text-align: center;
  margin-top: var(--margin-top);
`;

const Button = styled(LinkButton)`
  display:block;
  line-height:1;
  width:fit-content;
  margin:0 auto;
  margin-top: 32px;
  padding-bottom:12px;
`

export default ProductGridLatest;