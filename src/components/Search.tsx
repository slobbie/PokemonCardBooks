import { useRecoilState, useRecoilValue } from 'recoil';
import {SearchData, Data, Toggle, Theme} from '../atom';
import styled from 'styled-components';
import React, { useState } from 'react';
import SearchImg from '../assets/searchIcon.png'

/** 검색 컴포넌트 */
const Search = () => {
  const [searchData, setSearchData] = useRecoilState(SearchData);

  const data: any = useRecoilValue(Data);
  const [toggleValue, setToggleValue] = useRecoilState(Toggle);
  /** 검색 input 상태 */
  const [searchTerm, setSearchTerm] = useState('');

  /** 검색 onChange event */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSearch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const searchData = data.filter(({ name }: any) => name === searchTerm);
    if (searchData) {
      setSearchData(searchData);
      setToggleValue(true);
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


  // const onReset = (e: React.MouseEvent<HTMLElement>) => {
  //   setToggleValue(false);
  // };

  return (
      <SearchBar>
       <Warper>
          <Input
            onChange={onChangeSearch}
            onKeyPress={onkeyPress}
            placeholder='찾고 있는 포켓몬을 검색해 보세요'
            id='search'
            type='text'
          />
          <BtnBox>
            <Btn onClick={onSearch}>
              <SearchIcon src={SearchImg} />
            </Btn>
            {/* <Btn onClick={onReset}>Reset</Btn> */}
          </BtnBox>
       </Warper>
      </SearchBar>
  );
};

export default Search;

const SearchBar = styled.div`
  max-width: 1200px;
  width: 100%;
`;

const Warper = styled.div`
  max-width: 880px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(theme) => theme.theme.bg_fff};
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const Input = styled.input`
  /* max-width: 600px; */
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 13px;
  :focus {
    color: #333;
    outline: none;
  }
  ::placeholder {
    font-family: 'Press Start 2P';
    font-size: 13px;
    padding-left: 10px;
  }
`;

const Btn = styled.button`
  width: 100px;
  font-family: 'Press Start 2P';
  border: none;
  color: #000;
  border-radius: 15px;
  height: 50px;
  background-color: transparent;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  /* max-width: 240px; */
  justify-content: space-around;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 30px 0 auto;
  }
`;

const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`
