import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { PokeMonData, isLoading } from '@atom/main/atom';
import Cards from '@feature/main/components/Card';
import Filter from '@feature/main/components/filter';
import { ReactComponent as Spinner } from '../../../assets/spinner.svg';
import { useLocation } from 'react-router-dom';
import MarginModel from '@src/common/components/marginModel/MarginModel';

/** 메인 홈 페이지 */
const MainPage = () => {
  const path = useLocation();

  /** 스토어에 데이터 저장 함수 */
  const setPokeMonData = useSetRecoilState(PokeMonData);

  /** 스토어에 저장된 포켓몬 데이터 */
  const pokemonData = useRecoilValue(PokeMonData);

  /** loading ref */
  const scrollEnd = useRef<HTMLDivElement | null>(null);

  /** 로딩 상태 */
  // const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useRecoilState(isLoading);

  /** 한번에 보여줄 데이터 수량 */
  const [count, setCount] = useState(100);

  /** 포켓몬 데이터 호출 */
  const fetchPokemons = useCallback(
    async (pCount: number) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pCount}`
      );
      const json = await res.json();
      const { results } = json;
      setLoading(true);
      const pokemonItem = await Promise.all(
        results.map(async ({ url }: any) => {
          const pokemonRes = await fetch(url);
          const pokemonJson = await pokemonRes.json();
          const detailUrl = pokemonJson.species.url;
          const detailRes = await fetch(detailUrl);
          const detailJson = await detailRes.json();
          return {
            id: pokemonJson.id,
            name: detailJson.names[2].name,
            img: pokemonJson.sprites.other['official-artwork'].front_default,
            front_img: pokemonJson.sprites.front_default,
            back_img: pokemonJson.sprites.back_default,
            type: pokemonJson.types[0].type.name,
            color: detailJson.color.name,
            text: detailJson.flavor_text_entries[23].flavor_text,
            genera: detailJson.genera[1].genus,
            height: pokemonJson.height,
            weight: pokemonJson.weight,
          };
        })
      );
      /** 새로운 포멧몬 데이터 업데이트 */
      setPokeMonData(pokemonItem);
      setLoading(false);
    },
    [setPokeMonData]
  );

  /** 페이지의 하단으로 진입할때 몇개의 데이터를 더 보여줄지설정 */
  const loadMore = () => {
    setCount((prev) => prev + 9);
  };

  /** 데이터 호출  */
  useEffect(() => {
    fetchPokemons(count);
  }, [count]);

  useEffect(() => {
    if (!loading) {
      const observer = new IntersectionObserver(
        (entrise) => {
          if (entrise[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.2 }
      );
      if (scrollEnd.current) {
        observer.observe(scrollEnd.current);
      }
    }
  }, [loading]);

  /** url 에서 선택한 타입을 가져와줌 */
  const FilterType = path.pathname.replace('/', '');

  /** 선택한 타입을 필터링한 데이터 */
  const FilterData = pokemonData.filter((type) => type.type === FilterType);

  return (
    <Section>
      <Filter />
      <MarginModel bottom={20} />
      <MarginModel bottom={50} />
      <CardBox>
        <Cards
          pokeMonData={FilterData.length > 0 ? FilterData : pokemonData}
          ref={scrollEnd}
        />
      </CardBox>
      <MarginModel bottom={50} />
      {/* TODO: 어떤식으로 로딩 처리 할지에 대한 고민 */}
      {loading ? (
        <Loader>
          <Spinner width={50} height={50} fill='#fff' className='Loader' />
        </Loader>
      ) : null}
      <MarginModel bottom={50} />
    </Section>
  );
};

export default MainPage;

const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

const CardBox = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Rotate = keyframes`
 100% {
    	transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  width: 100%;
  color: #fff;
  font-size: 24px;

  .Loader {
    animation: ${Rotate} 1s linear infinite;
  }
`;
