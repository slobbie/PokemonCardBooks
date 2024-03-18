import Cards from '@feature/main/components/Card';
import { useRecoilValue } from 'recoil';
import { SearchData } from '@atom/main/atom';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MarginModel from '@src/common/components/marginModel/MarginModel';

/** 검색 결과 페이지 */
const SearchPage = () => {
  const navigate = useNavigate();

  /** 검색 데이터 */
  const pokemonSearchData = useRecoilValue(SearchData);

  /** 뒤로가기 버튼 */
  const onBackClick = () => {
    navigate(`/`);
  };

  return (
    <Section>
      <ContentBox>
        <MarginModel bottom={20} />
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
  justify-content: space-around;
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
