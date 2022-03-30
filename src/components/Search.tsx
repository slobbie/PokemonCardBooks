import { useRecoilState, useRecoilValue } from 'recoil';
import { SearchData, Data } from '../atom';
import styled from 'styled-components';
import React, { useState } from 'react';

const Search = () => {
  const [searchData, setSearchData] = useRecoilState(SearchData);
  const [count, setCount] = useState(9);
  const data: any = useRecoilValue(Data);
  const search: any = document.getElementById('search');

  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const searchData = data.filter(({ name }: any) => name === search.value);
    if (searchData) {
      setSearchData(searchData);
    }
    if (searchData.length === 0) {
      alert('항목없음');
    }
  };

  const onkeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };
  const handlePokemonReset = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (searchTerm === '') {
      setCount(9);
    }
  };
  return (
    <>
      <SearchBar>
        <Input
          onChange={handlePokemonReset}
          onKeyPress={onkeyPress}
          placeholder='search name'
          id='search'
          type='text'
        />
        <Btn onClick={onSearch}>검색</Btn>
      </SearchBar>
    </>
  );
};

export default Search;

const SearchBar = styled.div`
  width: 45%;
  display: flex;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
`;

const Btn = styled.button`
  margin-left: 20px;
  width: 100px;
`;
