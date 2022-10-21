import React, {useState} from 'react';
import styled from 'styled-components/macro';
import { WrapperCentered, Spacer } from '../StyledElements';
import Product from './Products'
import Sidebar from './Sidebar'
import { QUERIES } from '../Constants';
//

export interface FiltersState {
  categories: {[key: string]: boolean};
  priceRange: [number,number] | [];
}

function Shop(): JSX.Element {

  const [filters, setFilters] = useState<FiltersState>({categories:{}, priceRange:[]})
  // ----
  return (
    <WrapperCentered>
      <Spacer size={32} />
      <Wrapper>
        <Sidebar setFilters={setFilters} filters={filters}/>
        <Product filters={filters} />
      </Wrapper>
      <Spacer size={32} />
    </WrapperCentered>
  );
}
// -----
const Wrapper = styled.div`
  display:flex;
  gap: 16px;

  @media ${QUERIES.phoneAndSmaller} {
    flex-direction: column;
  }
`;


export default Shop;
