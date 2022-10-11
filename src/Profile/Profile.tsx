import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer } from '../StyledElements';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import UserProducts from './UserProducts';
import AddProduct from './AddProduct';

function Profile(): JSX.Element {
  const navigate = useNavigate();
  const [productsUpdated, setProductsUpdated] = useState<number>(0);
  useEffect(() => {
    console.log('render Profile');
    const Unsubscribe = onAuthStateChanged(getAuth(), user => {
      if (user === null) {
        navigate('/');
      }
    });
    return () => Unsubscribe();
  }, []);

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
