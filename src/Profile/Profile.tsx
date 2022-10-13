import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer } from '../StyledElements';
import { useNavigate } from 'react-router-dom';
import UserProducts from './UserProducts';
import AddProduct from './AddProduct';
import { useAppSelector } from '../Redux/Hooks';
import { selectUser } from '../Redux/UserSlice';

function Profile(): JSX.Element {
  const [productsUpdated, setProductsUpdated] = useState<number>(0);

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(()=>{
    if (user === null) {
      navigate('/');
    }
  }, [user])

  return (
    <WrapperCentered>
      <Wrapper>
        <AddProduct setProductsUpdated={setProductsUpdated} />
        <UserProducts productsUpdated={productsUpdated} />
      </Wrapper>
      <Spacer size={32} />
    </WrapperCentered>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-top: var(--margin-row);
`;

export default Profile;
