import React from 'react';
import styled from 'styled-components/macro';
import {WrapperCentered} from '../StyledElements';
import {useParams, useLocation} from 'react-router-dom';

function Product(): JSX.Element {

  const params = useParams();
  console.log(params)
  const location = useLocation();
  console.log(location);

  return(
    <WrapperCentered>
      <Wrapper>
      </Wrapper>
    </WrapperCentered>
  )
}

const Wrapper = styled.div`

`


export default Product;