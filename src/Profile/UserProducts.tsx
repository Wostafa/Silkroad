import React from 'react';
import styled from 'styled-components/macro';
import { Trash } from 'react-feather';
import {UnstyledButton} from '../StyledElements';

interface Product {
  key: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

function UserProducts(): JSX.Element {
  // const [productsUpdated, setProductsUpdated] = useState(false);
  const products = getProducts();
  // products = []

  return (
    <Wrapper>
        <h3>Your Products</h3>
        {products.length > 0 ? (
            <List>
              {products.map(pr => (
                <Item key={pr.key}>
                  <DeleteWrapper title='Remove Product'><Trash size={32} color={'#FB2E86'}/></DeleteWrapper>
                  <ProductWrapper>
                    <DetailsWrapper>
                      <Name href='#'><h3>{pr.name}</h3></Name>
                      <PriceAndCategory><span>Category: </span>{pr.category}</PriceAndCategory>
                      <PriceAndCategory><span>Price: </span>{pr.price}$</PriceAndCategory>
                      <p>{pr.description}</p>
                    </DetailsWrapper>
                    <ImageWrapper>
                      <img src={pr.image} />
                    </ImageWrapper>
                  </ProductWrapper>
                </Item>
              ))}
            </List>
          
        ) : (
          <NoProduct>You have no product</NoProduct>
        )}
    </Wrapper>
  );
}

function getProducts(): Product[] {
  return [
    {
      key: 'key',
      name: 'Name',
      price: 105,
      category: 'Chair',
      image: '../../template/sofa.png',
      description:
        'The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family. The cat is a domestic species of small carnivorous mammal. It is the only domesticated species in the family Felidae and is often referred to as the domestic cat to distinguish it from the wild members of the family.',
    },
  ];
}

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
`;
const ProductWrapper = styled.div`
  display: flex;
  gap: 16px;
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
  }
`;

const NoProduct = styled.h3`
  text-align:center;
  color: var(--color-sub-text);
`
const Name = styled.a`
  width: fit-content;
  &:hover h3 {
    color: var(--color-link-hover);
  }
`
const PriceAndCategory = styled.h4`
  color: var(--color-sub-text-darker);
  margin:0;
`
const DeleteWrapper = styled(UnstyledButton)`
  position: absolute;
  right: 10px;
  top: 10px;
  width: fit-content;
  height: fit-content;
  padding: 5px 3px 0px 3px;
  border-radius: var(--button-radius);
  border: 1px solid var(--color-border-gray);
  // background-color: var(--color-soft-gray);

  &:hover {
    border-color: var(--color-border-gray-hover);
  }
`

export default UserProducts;
