import React, { useState, useEffect, MouseEventHandler } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer, Button, Loading, Notify } from '../StyledElements';
import { useParams, useLocation } from 'react-router-dom';
import { Product as ProductType } from '../Constants';
import { getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import { addProduct } from '../Redux/CartSlice';
import { selectUser } from '../Redux/UserSlice';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import 'react-toastify/dist/ReactToastify.css';

function Product(): JSX.Element {
  const [product, setProduct] = useState<ProductType>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { id = '' } = useParams();
  const { state } = useLocation();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  // -----
  const addToCartHandler: MouseEventHandler<HTMLButtonElement> = (): void => {
    if (user === null) {
      Notify.Show.error('You must login first!');
      return;
    }
    const addToCart = async (): Promise<void> => {
      setIsAdding(true);
      try {
        await dispatch(addProduct({ product: product as ProductType, userId: user.uid })).unwrap();
        setIsAdding(false);
        Notify.Show.success('Product added to cart!');
      } catch (e) {
        setIsAdding(false);
        Notify.Show.error('Failed to add to cart!');
        console.log('Failed to add to cart: ', e);
      }
    };
    addToCart().catch(() => {});
  };
  // --------
  useEffect(() => {
    // if user comes here from router
    if (state !== null) {
      setProduct(state);
      setIsLoading(false);
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
          <ProductElement product={product} handler={addToCartHandler} isAdding={isAdding} />
        )}
      </Wrapper>
      <Notify.Layout />
      <Spacer size={32} />
    </WrapperCentered>
  );
}

// --------
function ProductElement({
  product,
  handler,
  isAdding,
}: {
  product: ProductType | undefined;
  handler: MouseEventHandler<HTMLButtonElement>;
  isAdding: boolean;
}): JSX.Element {
  if (product === undefined) return <></>;
  return (
    <>
      <ImageWrapper>
        <img src={product.image} alt={product.name} />
      </ImageWrapper>
      <DetailsWrapper>
        <Name>{product.name}</Name>
        <Category>{product.category}</Category>
        <Price>${product.price}</Price>
        <Description>{product.description}</Description>
        <ButtonAddToCart onClick={handler} disabled={isAdding}>
          Add to cart
        </ButtonAddToCart>
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
const ButtonAddToCart = styled(Button)`
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
