import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer, Button, UnstyledButton } from '../StyledElements';
import { Trash } from 'react-feather';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { selectCart, deleteProduct } from '../Redux/CartSlice';
import { selectUser } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';

function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  // --- redirect to home
  useEffect(()=>{
    if (user === null) {
      navigate('/');
    }
  },[user])

  // --- delete from cart
  const deleteHandler = (key: string): void => {
    setIsDeleting(true);
    const deleteFromCart = async (): Promise<void> => {
      await dispatch(deleteProduct({ key, userId: user?.uid as string }));
      setIsDeleting(false);
    };
    deleteFromCart().catch(() => {});
  };

  // ----
  const CalculateTotal = (): string => {
    let total = 0;
    cart.forEach(pr => {
      total = total + Number(pr.price);
    });
    return total.toFixed(2);
  };

  return (
    <WrapperCentered>
      <Spacer size={32} />
      <Wrapper>
        <ProductsWrapper>
          {cart.map(pr => (
            <Product key={pr.key}>
              <ImageWrapper>
                <img src={pr.image} />
              </ImageWrapper>
              <Name>{pr.name}</Name>
              <Price>${pr.price}</Price>
              <DeleteButton title='Remove Product' onClick={() => deleteHandler(pr.key)} disabled={isDeleting}>
                <Trash size={20} color={'#FB2E86'} />
              </DeleteButton>
            </Product>
          ))}
        </ProductsWrapper>
        {/* Total */}
        <TotalWrapper>
          <Title>Cart Totals</Title>
          <TotalBox>
            <Total>
              <TotalH>Totals:</TotalH>
              <TotalH>${CalculateTotal()}</TotalH>
            </Total>
            <CheckOutButton>Proceed To Checkout</CheckOutButton>
          </TotalBox>
        </TotalWrapper>
      </Wrapper>
      <Spacer size={32} />
    </WrapperCentered>
  );
}
// ---------
const Wrapper = styled.div`
  display: flex;
  gap: 64px;
`;
const TotalWrapper = styled.aside`
  flex: 1;
`;
const TotalBox = styled.div`
  background-color: var(--color-fill-page2);
  border-radius: var(--box-radius);
  padding: var(--box-text-padding);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 200px;
`;
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-border-gray-darker);
  margin-bottom: 16px;
`;
const TotalH = styled.h4`
  color: var(--color-off-blue);
  margin: 16px 0 16px 0;
`;

const Title = styled.h3`
  color: var(--color-off-blue);
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  margin-bottom: 16px;
`;

const ProductsWrapper = styled.ul`
  flex: 3;
`;
const Product = styled.li`
  display: flex;
  justify-content: space-between;
  height: 110px;
  align-items: center;

  padding: 8px 16px;
  border-bottom: 1px solid var(--color-border-gray);
`;
const ImageWrapper = styled.div`
  height: 100%;

  img {
    height: 100%;
    display: block;
  }
`;
const Name = styled.h4`
  color: var(--color-off-blue);
`;
const Price = styled.h4`
  color: var(--color-off-blue);
`;

const DeleteButton = styled(UnstyledButton)`
  display: flex;
  padding: 6px;
  border-radius: var(--button-radius);
  border: 1px solid var(--color-border-gray);
  &:hover {
    border-color: var(--color-border-gray-hover);
  }
`;

const CheckOutButton = styled(Button)`
  background-color: var(--color-button-green);
`;

export default Cart;