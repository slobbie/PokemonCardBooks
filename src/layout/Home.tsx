import { ForwardedRef, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { PokeMonData } from '../atom';
import Cards from '../components/Card';
import Filter from '../components/filter';
import MarginBottom from '../components/layout/margin-bottom copy';
import Search from '../components/Search';
import { ReactComponent as Spinner } from '../assets/spinner.svg';
import { useLocation } from 'react-router-dom';

/** 메인 홈 페이지 */
const Home = () => {
  /** 스토어에 저장된 포켓몬 데이터 */
  const setPokeMonData = useSetRecoilState(PokeMonData);
  const pokemonData = useRecoilValue(PokeMonData);
  const path = useLocation();

  /** 로딩 상태 */
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(100);

  const fetchPokemons = async (count: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
    const json = await res.json();
    const { results } = json;

    const pokemonItem: any = await Promise.all(
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
    setIsLoading(false);
  };

  const loadMore = () => {
    setCount((prev) => prev + 9);
  };
  useEffect(() => {
    fetchPokemons(count);
  }, [count]);

  const scrollEnd = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoading) {
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
  }, [isLoading]);

  const FilterType = path.pathname.replace('/', '');

  const FilterData = pokemonData.filter((type) => type.type === FilterType);

  return (
    <Section>
      <Filter />
      <MarginBottom margin={20} />
      <MarginBottom margin={50} />
      <CardBox>
        <Cards
          pokeMonData={FilterData.length > 0 ? FilterData : pokemonData}
          ref={scrollEnd}
        />
      </CardBox>
      <MarginBottom margin={50} />
      {isLoading ? (
        <Loader>
          <Spinner width={50} height={50} fill='#fff' className='Loader' />
        </Loader>
      ) : null}

      <MarginBottom margin={50} />
    </Section>
  );
};

export default Home;

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
  /* margin: 20px; */
  align-items: center;
  /* margin: 0 auto; */
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
