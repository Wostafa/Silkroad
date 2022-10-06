import React, { useState } from 'react';
import styled from 'styled-components/macro';
import {FiltersState} from './Shop';
import {Categories} from '../Constants';
// 

interface ParentState {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}

function Sidebar({filters, setFilters}:ParentState): JSX.Element {
  
  interface PriceRange {
    [key: number]: boolean
  }

  const [priceRangeChecked, setPriceRangeChecked] = useState<PriceRange>([])
  const priceRangeArray = [[0,50],[50,100],[100,200]];

  // -----------------
  const categoryHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newCategoryState = { ...filters.categories, [e.target.value]: e.target.checked };
    setFilters({...filters ,categories: newCategoryState, });
  };

  // -----------
  const priceHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newPriceRangeState = {[e.target.value]: e.target.checked };
    setPriceRangeChecked(newPriceRangeState);
    setFilters({...filters, priceRange: priceRangeArray[Number(e.target.value)] as [number, number]});
  };


  // ----
  return (
    <Wrapper>
      <FilterWrapper>
        <>
        <Title>Categories</Title>
        {Categories.map((category) => (
          <Label key={category}>
            <input type='checkbox' checked={filters.categories[category] ?? false} value={category} onChange={categoryHandler} />
            <span>{category}</span>
          </Label>
        ))}
        </>
      </FilterWrapper>

      <FilterWrapper>
        <>
        <Title>Price filter</Title>
          {priceRangeArray.map((range, index) => (
            <Label key={index}>
                <input type='radio' checked={priceRangeChecked[index] ?? false} value={index} onChange={priceHandler} />
                <span>${range[0]} - ${range[1]}</span>
              </Label>
            ))}
        </>
      </FilterWrapper>
    </Wrapper>
  );
}
// ----------
const Wrapper = styled.aside`
  flex: 1;
  background-color: var(--color-fill-page2);
  border-radius: var(--box-radius);
  padding: var(--box-text-padding);
  height: fit-content;
`;
const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
`;

const Label = styled.label`
  text-transform: capitalize;
  display: flex;
  gap: 8px;
  align-items: baseline;
  width: fit-content;
`;
const Title = styled.h3`
  color: var(--color-product-name);
  margin: 0;
  margin-bottom: 8px;
  text-decoration: underline;
  text-underline-offset: 0.4rem;
`;

export default Sidebar;
