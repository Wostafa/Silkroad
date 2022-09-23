import React from 'react';
import styled from 'styled-components/macro';
import {WrapperCentered, Spacer} from '../StyledElements';
import UserProducts from './UserProducts';
import AddProduct from './AddProduct';

function Profile(): JSX.Element {
  return(
    <WrapperCentered>
      <Wrapper>
        <AddProduct />
        <UserProducts />
      </Wrapper>
      <Spacer size={32}/>
    </WrapperCentered>
  )
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  justify-content:space-between;
  margin-top: var(--margin-row);
`;

export default Profile;
