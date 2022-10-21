import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Trash } from 'react-feather';
import { UnstyledButton, Loading, Notify } from '../StyledElements';
import { collection, doc, deleteDoc, getDocsFromServer } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import { Product, QUERIES } from '../Constants';
import { selectUser } from '../Redux/UserSlice';
import { useAppSelector } from '../Redux/Hooks';

// ----------------
function UserProducts({ productsUpdated }: { productsUpdated: number }): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(selectUser);
  const [productDeleted, setProductDeleted] = useState<string>('');

  // --------- loading products
  useEffect(() => {
    if (user === null) return;
    console.log('Loading user products');
    setIsLoading(true);

    const getProducts = async (): Promise<void> => {
      const querySnapshot = await getDocsFromServer(collection(db, `users/${user.uid}/products`));

      const productsArray: Product[] = [];
      querySnapshot.forEach(doc => {
        productsArray.push(doc.data() as Product);
      });
      setIsLoading(false);
      setProducts(productsArray);
      console.log('Products: ', productsArray);
    };
    //
    getProducts().catch(e => {
      setIsLoading(false);
      Notify.Show.error("Can't load your products!");
    });
  }, [productsUpdated, user, productDeleted]);

  // ---------------- delete product
  const deleteHandler = (key: string): void => {
    deleteDoc(doc(db, `users/${user?.uid as string}/products`, key))
      .then(result => {
        setProductDeleted(key);
        console.log('Product Deleted: ', key);
        Notify.Show.success('Product Deleted!');
      })
      .catch(e => {
        console.log('Failed to delete product!', e);
      });
  };
  // -----
  return (
    <Wrapper>
      <h3>Your Products</h3>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <ProductsList products={products} deleteHandler={deleteHandler} />
      )}
      <Notify.Layout />
    </Wrapper>
  );
}

// -------------------
const ProductsList = ({ products, deleteHandler }: { products: Product[]; deleteHandler: Function }): JSX.Element => {
  if (products.length > 0) {
    return (
      <List>
        {products.map(pr => (
          <Item key={pr.key}>
            <DeleteWrapper title='Remove Product' onClick={() => deleteHandler(pr.key)}>
              <Trash size={32} color={'#FB2E86'} />
            </DeleteWrapper>
            <ProductWrapper>
              <DetailsWrapper>
                <Name href='#'>
                  <h3>{pr.name}</h3>
                </Name>
                <PriceAndCategory>
                  <span>Category: </span>
                  {pr.category}
                </PriceAndCategory>
                <PriceAndCategory>
                  <span>Price: </span>
                  ${pr.price}
                </PriceAndCategory>
                {/* this div is for avoiding bug in flex box with a -webkit-line-clamp child style */}
                <div>
                  <Description>{pr.description}</Description>
                </div>
              </DetailsWrapper>
              <ImageWrapper>
                <img src={pr.image} />
              </ImageWrapper>
            </ProductWrapper>
          </Item>
        ))}
      </List>
    );
  }
  return <NoProduct>You have no product</NoProduct>;
};

// -------------
const Wrapper = styled.section`
  flex: 1;
  padding: 8px;
  background-color: var(--color-fill-page);
  padding: 8px;
  border-radius: var(--box-radius);

  h3 {
    margin: 1rem;
  }
`;
const List = styled.ul``;
const Item = styled.li`
  border-radius: var(--box-radius);
  background: white;
  padding: var(--box-text-padding);
  position: relative;
  margin-bottom: 10px;
`;
const ProductWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media ${QUERIES.laptopAndSmaller}{
    flex-direction: column;
  }
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex:3;

  h3 {
    margin: 0;
  }
`;
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  flex:2;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: var(--image-radius);
  }

  @media ${QUERIES.laptopAndSmaller}{
    align-self: center;
  }
`;

const NoProduct = styled.h3`
  text-align: center;
  color: var(--color-sub-text);
`;
const Name = styled.a`
  width: fit-content;
  color: var(--color-product-name);
  &:hover h3 {
    color: var(--color-link-hover);
  }
`;
const PriceAndCategory = styled.h4`
  color: var(--color-sub-text-darker);
  margin: 0;
  font-family: var(--font-family-lato);

  span {
    margin-right: 8px;
  }
`;
const DeleteWrapper = styled(UnstyledButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  width: fit-content;
  height: fit-content;
  padding: 5px 3px 0px 3px;
  border-radius: var(--button-radius);
  border: 1px solid var(--color-border-gray);
  background-color: white;

  &:hover {
    border-color: var(--color-border-gray-hover);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Description = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

export default UserProducts;
