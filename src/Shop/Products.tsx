import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { collectionGroup, getDocs, where, query, Query, DocumentData } from 'firebase/firestore';
import { db } from '../Firebase/Database';
import { FiltersState } from './Shop';
import { Product } from '../Constants';
import { Loading } from '../StyledElements';
import { Link } from 'react-router-dom';

function Products({ filters }: {filters:FiltersState}): JSX.Element {
  // const products = [1, 2];
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // --------
  useEffect(() => {
    
    setIsLoading(true);
    console.log('Filters: ', filters);
    const filterCategory = filters.categories;
    const filterPrice = filters.priceRange;
    // --- filter based on category
    // remove keys with false values
    const checkedCategories = Object.keys(filterCategory).filter(key => filterCategory[key]);

    const colRef = collectionGroup(db, 'products');
    let categoryQuery: Query<DocumentData>;
    // if none of checkboxes are checked, get all
    if (checkedCategories.length === 0) {
      categoryQuery = colRef;
    } else {
      categoryQuery = query(colRef, where('category', 'in', checkedCategories));
    }
    //
    getDocs(categoryQuery)
      .then(result => {
        const _productArray: Product[] = [];
        result.forEach(doc => {
          const data = doc.data() as Product;
          // --- filter based on price
          if(filterPrice.length === 0){
            _productArray.push(data);
          }
          else {
            if(data.price >= filterPrice[0] && data.price <= filterPrice[1]){
              _productArray.push(data);
            }
          }
        });
        setIsLoading(false);
        setProducts(_productArray);
      })
      .catch(e => {
        setIsLoading(false);
        console.log('Failed to get products: ', e);
      });
  }, [filters]);

  // ----
  return (
    <Wrapper>
      {isLoading ? (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      ) : (
        <List>
          {products.map(product => (
            <Item key={product.key}>
              <ImageWrapper>
                <img src={product.image} alt={product.name} />
              </ImageWrapper>
              <DetailsWrapper>
                <Name to={`/product/${product.key}`}>{product.name}</Name>
                <Category>{product.category}</Category>
                <Price>${product.price}</Price>
                {/* this div is essential for avoid bug between flexbox and -webkit-line-clamp */}
                <div>
                  <Description>{product.description}</Description>
                </div>
              </DetailsWrapper>
            </Item>
          ))}
        </List>
      )}
    </Wrapper>
  );
}
// -----
const Wrapper = styled.div`
  flex: 3;
`;
const List = styled.ul``;
const Item = styled.li`
  height: 200px;
  margin-bottom: 16px;
  padding: 10px;
  display: flex;
  gap: 16px;
  box-shadow: var(--shadow-box);
`;
const DetailsWrapper = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ImageWrapper = styled.div`
  height: 100%;
  overflow: hidden;

  img {
    height: 100%;
    object-fit: cover;
    border-radius: var(--image-radius);
    transition: transform 200ms;

    &:hover {
      transform: scale(1.2);
      transition: transform 300ms;
    }
  }
`;
const Name = styled(Link)`
  display: block;
  width: fit-content;
  font-weight: bold;
  color: var(--color-product-name);
  font-size: var(--font-size-h3);
  text-transform:capitalize;

  &:hover {
    color: var(--color-link-hover);
  }
`;
const Price = styled.h4`
  margin: 0;
  font-family: var(--font-family-lato);
`;
const Category = styled.h4`
  margin: 0;
  font-family: var(--font-family-lato);
  color: var(--color-sub-text-darker);
`;
const Description = styled.p`
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Products;
