import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import { Search as SearchIcon } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../Redux/Hooks';
import { fetchAllProducts, selectAllProducts } from '../Redux/ProductsSlice';
import { Link } from 'react-router-dom';
import type { Product } from '../Constants';

export default function Search(): JSX.Element {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const [searchedValue, setSearchedValue] = useState('');
  const [showDropdown, setShowDropdown] = useState('none');
  const [results, setResults] = useState<Product[]>([]);
  const node = useRef<HTMLDivElement>(null);

  // ----- initial data
  useEffect(() => {
    const fetchAll = async (): Promise<void> => {
      await dispatch(fetchAllProducts());
    };
    fetchAll().catch(e => {});
  }, []);

  // ---- hide on click outside
  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick);
    return () => document.removeEventListener('mousedown', onOutsideClick);
  }, []);

  const onOutsideClick = (e: MouseEvent): void => {
    if (node.current?.contains(e.target as Node) === false) {
      setShowDropdown('none');
    }
  };
  // ----- search and input handler
  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setSearchedValue(e.target.value);
    if (e.target.value.length <= 1) {
      setShowDropdown('none');
      return;
    }
    const keyword = e.target.value.toLocaleLowerCase();
    const _results = products.filter(pr => pr.name.toLocaleLowerCase().includes(keyword));
    if (_results.length > 0) {
      setResults(_results);
      setShowDropdown('revert');
    } else {
      setShowDropdown('none');
    }
  };

  return (
    <SearchWrapper ref={node}>
      <InputWrapper >
        <Label htmlFor='search-input'>
          <SearchIcon size={24} color='#cbcbcb' />
        </Label>
        <Input id='search-input' type='search' value={searchedValue} onChange={onSearchChange} placeholder='Search here' />
      </InputWrapper>
        <ResultWrapper data-testid='result-wrapper' showDropdown={showDropdown}>
          <ul>
            {results.map(pr => (
              <Item key={pr.key}>
                <A to={`/product/${pr.key}`}>{pr.name}</A>
              </Item>
            ))}
          </ul>
        </ResultWrapper>
    </SearchWrapper>
  );
}

// ------
const SearchWrapper = styled.div`
  height: 40px;
  width: 270px;
  position: relative;
  isolation: isolate;
  z-index: 1;
`;

const InputWrapper = styled.div`
  border-radius: var(--input-radius);
  border: 2px solid var(--color-soft-gray);
  display:flex;
  gap:8px;
  align-items:center;
  height:100%;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border:none;
  font-size: 1rem;
  padding: 0 8px;
`;
const Label = styled.label`
  margin-left:8px;

  svg {
    display:block;
  }
`;

const ResultWrapper = styled.div<{ showDropdown: string }>`
  position: absolute;
  left: 0;
  margin-top: 4px;
  border-radius: var(--input-radius);
  width: 100%;
  min-height: 30px;
  padding: 0 8px;
  display: ${props => props.showDropdown};
  background: white;
  box-shadow: var(--shadow-box);
`;
const Item = styled.li`
  padding: 10px 0 8px 0;

  &:not(:last-of-type) {
    border-bottom: 1px solid var(--color-border-gray);
  }
`;
const A = styled(Link)`
  opacity: 0.7;
  display: block;
  text-transform: capitalize;
  &:hover {
    opacity: 1;
  }
`;
