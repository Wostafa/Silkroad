import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Trash } from 'react-feather';
import { UnstyledButton, Loading, Notify } from '../StyledElements';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Product } from '../Constants';

// ----------------
function UserProducts({ productsUpdated }: {productsUpdated: number}): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | false >(false);
  const [productDeleted, setProductDeleted] = useState<string>('');

  // --------
  useEffect(()=>{
    const Unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user !== null) {
        setUserId(user.uid);
      }
    });
    return ()=> Unsubscribe()
  },[])

  // ---------
  useEffect(() => {
    if(userId === false) return;
    console.log('Loading user products');
    setIsLoading(true);

    const getProducts = async (): Promise<void> => {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/products`));
      const productsArray: Product[] = [];
      querySnapshot.forEach(doc => {
        productsArray.push(doc.data() as Product);
      });

      setIsLoading(false);
      setProducts(productsArray);
      console.log('Products: ', productsArray)
    };
    //
    getProducts().catch(e => {});
  }, [productsUpdated, userId, productDeleted]);

  // ----------------
  const deleteHandler = (key:string):void =>{
  
    deleteDoc(doc(db, `users/${userId as string}/products`, key)).then(result => {
      setProductDeleted(key);
      console.log('Product Deleted: ', key);
      Notify.Show.success('Product Deleted!');
  
    }).catch(e=>{console.log('Failed to delete product!',e)});
  }
  // -----
  return (
    <Wrapper>
      <h3>Your Products</h3>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <ProductsList products={products} deleteHandler={deleteHandler}/>
      )}
      <Notify.Layout />
    </Wrapper>
  );
}

// -------------------
const ProductsList = ({ products, deleteHandler }:{ products:Product[], deleteHandler:Function }): JSX.Element => {
  if (products.length > 0) {
    return (
      <List>
        {products.map(pr => (
          <Item key={pr.key}>
            <DeleteWrapper title='Remove Product' onClick={()=> deleteHandler(pr.key)}>
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
                  {pr.price}$
                </PriceAndCategory>
                <p>{pr.description}</p>
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
`;
const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 300px;

  h3 {
    margin: 0;
  }
`;
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--image-radius);
  }
`;

const NoProduct = styled.h3`
  text-align: center;
  color: var(--color-sub-text);
`;
const Name = styled.a`
  width: fit-content;
  &:hover h3 {
    color: var(--color-link-hover);
  }
`;
const PriceAndCategory = styled.h4`
  color: var(--color-sub-text-darker);
  margin: 0;
  font-family: var(--font-family-lato);
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

export default UserProducts;
