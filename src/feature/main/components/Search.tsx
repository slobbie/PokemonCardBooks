import { useRecoilValue, useSetRecoilState } from 'recoil';
import { SearchData, PokeMonData } from '@atom/main/atom';
import React, { useState } from 'react';
import SearchImg from '@assets/searchIcon.png';
import { useNavigate } from 'react-router-dom';
import * as SearchStyle from '@feature/main/styles/search.style';

/** 검색 컴포넌트 */
const Search = () => {
  const navigate = useNavigate();

  /** 포켓몬 데이터 */
  const pokemonData = useRecoilValue(PokeMonData);

  /** 포켓몬 셋팅 함수 */
  const setSearchData = useSetRecoilState(SearchData);

  /** 검색 input 상태 */
  const [search, setSearch] = useState('');

  /** 검색 onChange event */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /** 검색 이벤트 */
  const onSearch = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const searchData = pokemonData.filter(({ name }) => name?.includes(search));

    if (searchData) {
      setSearchData(searchData);
      navigate(`/search/${searchData[0].name}`);
    }
    if (searchData.length === 0) {
      alert('항목없음');
    }
    setSearch('');
  };

  /** 검색 엔터 이벤트 */
  const onkeyPress = (e: any) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };

  return (
    <SearchStyle.SearchBar>
      <SearchStyle.Warper>
        <SearchStyle.Input
          value={search}
          onChange={onChangeSearch}
          onKeyPress={onkeyPress}
          placeholder='찾고 있는 포켓몬을 검색해 보세요'
          type='text'
        />
        <SearchStyle.BtnBox>
          <SearchStyle.Btn onClick={onSearch}>
            <SearchStyle.SearchIcon src={SearchImg} />
          </SearchStyle.Btn>
          {/* <Btn onClick={onReset}>Reset</Btn> */}
        </SearchStyle.BtnBox>
      </SearchStyle.Warper>
    </SearchStyle.SearchBar>
  );
};

export default Search;
