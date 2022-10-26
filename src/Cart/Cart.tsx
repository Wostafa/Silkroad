import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer, Button, UnstyledButton, Notify } from '../StyledElements';
import { Trash } from 'react-feather';
import { useAppSelector, useAppDispatch } from '../Redux/Hooks';
import { selectCart, deleteProduct } from '../Redux/CartSlice';
import { selectUser } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import useStripe from './Stripe';
import { StripeConfig, QUERIES } from '../Constants';

function Cart(): JSX.Element {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const stripe = useStripe();
  const [waitingForCheckout, setWaitingForCheckout] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --- redirect to home
  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [user]);

  // --- delete from cart
  const deleteHandler = (key: string): void => {
    setIsDeleting(true);
    const deleteFromCart = async (): Promise<void> => {
      await dispatch(deleteProduct({ key, userId: user?.uid as string }));
      setIsDeleting(false);
    };
    deleteFromCart().catch(() => {});
  };

  const onCheckout: React.MouseEventHandler<HTMLButtonElement> = (): void => {
    if (stripe === null) return;
    setWaitingForCheckout(true);
    interface Order {
      key: string;
      quantity: number;
    }
    const orders: Order[] = [];
    cart.forEach(pr => {
      orders.push({
        key: pr.key,
        quantity: 1,
      });
    });
    (async () => {
      // getting session id from netlify
      const response = await fetch(StripeConfig.CHECKOUT_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(orders),
      });
      const session = await response.json();
      // redirecting to stripe payment page
      const redirect = await stripe.redirectToCheckout({ sessionId: session.id });
      if (redirect.error !== null) {
        console.log('Redirect Error: ', redirect.error.message);
      }
    })().catch(e => {
      Notify.Show.error('Checkout went wrong!');
      console.log('Checkout Failed: ', e);
      setWaitingForCheckout(false);
    });
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
              <ButtonWrapper>
              <DeleteButton title='Remove Product' onClick={() => deleteHandler(pr.key)} disabled={isDeleting}>
                <Trash size={20} color={'#FB2E86'} />
              </DeleteButton>
              </ButtonWrapper>
            </Product>
          ))}
        </ProductsWrapper>
        {/* Total */}
        <TotalWrapper>
          <Title>Cart Totals</Title>
          <TotalBox>
            <Total>
              <TotalH>Totals:</TotalH>
              <TotalH data-testid='total-price'>${CalculateTotal()}</TotalH>
            </Total>
            <CheckOutButton data-testid='checkout' onClick={onCheckout} disabled={cart.length === 0 || waitingForCheckout}>
              Proceed To Checkout
            </CheckOutButton>
          </TotalBox>
        </TotalWrapper>
      </Wrapper>
      <Spacer size={32} />
      <Notify.Layout/>
    </WrapperCentered>
  );
}
// ---------
const Wrapper = styled.div`
  display: flex;
  gap: 64px;

  @media ${QUERIES.laptopAndSmaller} {
    gap:16px;
  }
  @media ${QUERIES.tabletAndSmaller} {
    flex-direction: column;
  }
`;
const TotalWrapper = styled.aside`
  flex: 1;
  max-width: 500px;
  width: 100%;

  @media ${QUERIES.tabletAndSmaller} {
    align-self: center;
  }
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 8px 16px;
  gap: 16px;
  border-bottom: 1px solid var(--color-border-gray);

  @media ${QUERIES.phoneAndSmaller} {
    display:flex;
    flex-direction:column;
    gap:16px;
    align-items:center;
  }
`;
const ImageWrapper = styled.div`
  height: 180px;
  width: 180px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
    border-radius: var(--image-radius);
  }
`;
const Name = styled.h4`
margin:0;
display: flex;
align-items: center;
justify-content: center;
  color: var(--color-off-blue);
`;
const Price = styled.h4`
margin:0;
display: flex;
align-items: center;
justify-content: center;
  color: var(--color-off-blue);
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DeleteButton = styled(UnstyledButton)`
  width:fit-content;
  height: fit-content;
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
  margin: 0 auto;
  width:100%;
  max-width: 280px;
`;

export default Cart;
