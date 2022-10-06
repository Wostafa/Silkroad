import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, LinkButton, Spacer, Loading } from '../StyledElements';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import { Link as LinkRouter } from 'react-router-dom';
import { Product } from '../Constants';

//
function ProductGridLatest(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --------- loading products
  useEffect(() => {
    console.log('Loading products');
    setIsLoading(true);
    const getProducts = async (): Promise<void> => {
      const query = collectionGroup(db, 'products');
      const docs = await getDocs(query);

      const productsArray: Product[] = [];
      docs.forEach(doc => {
        productsArray.push(doc.data() as Product);
      });
      setIsLoading(false);
      setProducts(productsArray);
      console.log('Products: ', productsArray);
    };
    //
    getProducts().catch(e => {
      console.log('Failed to load products: ', e);
    });
  }, []);
  // -----
  return (
    <WrapperCentered>
      <Wrapper>
        <h1>Latest Products</h1>
        {isLoading ? (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        ) : (
          <>
            <WrapperGrid>
              {products.slice(0, 12).map(pr => (
                <Link to={`/product/${pr.key}`} key={pr.key} state={pr}>
                  <ImageWrapper>
                    <Image src={pr.image} alt='' />
                  </ImageWrapper>
                  <Name>{pr.name}</Name>
                  <Price>${pr.price}</Price>
                </Link>
              ))}
            </WrapperGrid>
            <Button href='#'>See More</Button>
          </>
        )}
      </Wrapper>
      <Spacer size={32} />
    </WrapperCentered>
  );
}

// ----------
const Wrapper = styled.section`
  h1 {
    text-align: center;
    color: var(--color-off-blue);
  }
`;
const WrapperGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;
const Link = styled(LinkRouter)`
  --margin-top: 16px;
  --color-name: var(--color-pink);
  --color-price: var(--color-off-blue);
  display: block;
  height: 350px;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--color-border-gray);
  text-decoration: none;
  transition: 400ms;

  &:hover {
    background-color: var(--color-product-background);
    transition: 200ms;
  }
  &: hover;
`;
const ImageWrapper = styled.div`
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  width: 175px;
  height: 175px;
  margin: 0 auto;
`;

const Name = styled.div`
  color: var(--color-name);
  font-family: var(--font-family-lato);
  font-weight: 700;
  font-size: var(--font-size-product-name);
  text-align: center;
  letter-spacing: var(--letter-spacing-lato-2x);
  margin-top: var(--margin-top);
`;
const Price = styled.div`
  color: var(--color-price);
  text-align: center;
  margin-top: var(--margin-top);
`;

const Button = styled(LinkButton)`
  display: block;
  line-height: 1;
  width: fit-content;
  margin: 0 auto;
  margin-top: 32px;
  padding-bottom: 12px;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProductGridLatest;
