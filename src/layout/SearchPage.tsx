import React from 'react';
import Cards from '../components/Card';
import { useRecoilValue } from 'recoil';
import { SearchData } from '../atom';
import styled from 'styled-components';
import MarginBottom from '../components/layout/margin-bottom copy';
import { useNavigate } from 'react-router-dom';

/** 검색 결과 페이지 */
const SearchPage = () => {
  const navigate = useNavigate();
  /** 검색 데이터 */
  const pokemonSearchData = useRecoilValue(SearchData);

  const onBackClick = () => {
    navigate(`/`);
  };

  return (
    <Section>
      <ContentBox>
        <MarginBottom margin={20} />
        <Cards pokeMonData={pokemonSearchData} />
      </ContentBox>
      <Btn onClick={onBackClick}>Back</Btn>
    </Section>
  );
};

export default SearchPage;

const Section = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex: 1;
`;

const ContentBox = styled.div`
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  font-family: 'Press Start 2P', cursive;
  margin-top: 20px;
  border: none;
  height: 40px;
  border-radius: 15px;
  font-size: 17px;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;