import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer, Button, Loading, Notify } from '../StyledElements';
import { useParams, useLocation } from 'react-router-dom';
import { Product as ProductType } from '../Constants';
import { getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import 'react-toastify/dist/ReactToastify.css';

function Product(): JSX.Element {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(true);

  const { id = '' } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    // if user comes here from router
    if (state !== null) {
      setProduct(state);
      setIsLoading(false);
      console.log('Product result from router: ', state);
      return;
    }
    // if your comes here directly
    const query = collectionGroup(db, 'products');
    getDocs(query)
      .then(result => {
        const doc = result.docs.find(doc => doc.id === id);
        if (doc !== undefined) {
          setIsLoading(false);
          setProduct(doc.data() as ProductType);
          console.log('Product result from database: ', doc.data());
        } else {
          setIsLoading(false);
          Notify.Show.error('Product not found!');
          console.log('Product not found, id: ', id);
        }
      })
      .catch(e => {
        setIsLoading(false);
        Notify.Show.error('Something went wrong!');
        console.log('Failed to get product: ', e);
      });
  }, []);

  // ----
  return (
    <WrapperCentered>
      <Spacer size={32} />
      <Wrapper>
        {isLoading ? (
          <LoadingWrapper>
            <Loading />
          </LoadingWrapper>
        ) : (
          <ProductElement product={product} />
        )}
      </Wrapper>
      <Notify.Layout />
      <Spacer size={32} />
    </WrapperCentered>
  );
}

// --------
function ProductElement({ product }: { product: ProductType | undefined }): JSX.Element {
  if (product === undefined) return <></>;
  return (
    <>
      <ImageWrapper>
        <img src={product.image} alt={product.name} />
      </ImageWrapper>
      <DetailsWrapper>
        <Name>{product.name}</Name>
        <Category>{product.category}</Category>
        <Price>{product.price}$</Price>
        <Description>{product.description}</Description>
        <ButtonBuy>Buy Now</ButtonBuy>
      </DetailsWrapper>
    </>
  );
}

// ----------
const Wrapper = styled.div`
  min-height: 500px;
  width: 100%;
  display: flex;
  gap: 32px;
  padding: var(--box-text-padding);
  box-shadow: var(--shadow-box);
`;
const ImageWrapper = styled.div`
  height: 100%;
  flex: 1;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Name = styled.h2`
  color: var(--color-product-name);
`;
const Price = styled.h3`
  margin: 0;
  font-family: var(--font-family-lato);
`;
const Category = styled.h3`
  margin: 0;
  color: var(--color-sub-text-darker);
  font-family: var(--font-family-lato);
`;
const Description = styled.p`
  margin-bottom: 32px;
`;
const ButtonBuy = styled(Button)`
  width: fit-content;
  padding-left: 20px;
  padding-right: 20px;
`;
const LoadingWrapper = styled.div`
  display: flex;
  flex: 1;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

export default Product;
