import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { PokeMonData, isLoading } from '@atom/main/atom';
import Cards from '@feature/main/components/Card';
import Filter from '@src/feature/main/components/TypeFilter';
import { ReactComponent as Spinner } from '@assets/spinner.svg';
import { useLocation } from 'react-router-dom';
import MarginModel from '@src/common/components/marginModel/MarginModel';
import * as MainStyles from '@feature/main/styles/mainPage.style';
import services from '@constants/index';
import {
  IFlavorTextEntries,
  IGetPokeCountUrlResult,
  IPokeMonsterDetailData,
  PokeMonsterData,
} from '@src/common/interface/pokemon.interface';

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
  const [loading, setLoading] = useRecoilState(isLoading);

  /** 한번에 보여줄 데이터 수량 */
  const [count, setCount] = useState(100);

  /** 호출 api에 대한 count url 반환 */
  const getPokeCountUrl = async (
    pCount: number
  ): Promise<IGetPokeCountUrlResult> => {
    const getUrl = await fetch(`${services.apiServices.url.pokeApi}${pCount}`);
    const CountUrlJson = await getUrl.json();
    const results: IGetPokeCountUrlResult = CountUrlJson;
    return results;
  };

  /** 포켓몬스터 각각의 데이터를 얻을수 있음 */
  const getPokeMonsterData = async (pUrl: string): Promise<PokeMonsterData> => {
    const pokemonRes = await fetch(pUrl);
    const pokemonMonsterJson: PokeMonsterData = await pokemonRes.json();

    return pokemonMonsterJson;
  };

  /** 몬스터에 대한 디테일 데이터 호출 */
  const getPokeMonsterDetail = async (
    pUrl: string
  ): Promise<IPokeMonsterDetailData> => {
    const detailRes = await fetch(pUrl);
    const detailJson: IPokeMonsterDetailData = await detailRes.json();
    return detailJson;
  };

  /** 포켓몬 데이터 호출 */
  const fetchPokemons = useCallback(
    async (pCount: number) => {
      try {
        const getCountUrl = await getPokeCountUrl(pCount);
        setLoading(true);
        const pokemonItem = await Promise.all(
          getCountUrl.results.map(async ({ url }: any) => {
            const monsterData = await getPokeMonsterData(url);

            const monsterDetailData = await getPokeMonsterDetail(
              monsterData.species.url
            );

            /** 포켓몬 이름 */
            const pokemonName = monsterDetailData.names.find((item) => {
              return item.language.name === 'ko';
            })?.name;

            /** 포켓몬 설명 */
            const flavorText: IFlavorTextEntries =
              monsterDetailData.flavor_text_entries.find((item) => {
                return item.language.name === 'ko';
              })!;

            /** 포켓몬 타입 */
            const pokemonGenera = monsterDetailData.genera.find((item) => {
              return item.language.name === 'ko';
            })!;
            return {
              id: monsterData.id,
              name: pokemonName,
              img: monsterData.sprites.other['official-artwork'].front_default,
              front_img: monsterData.sprites.front_default,
              back_img: monsterData.sprites.back_default,
              type: monsterData.types[0].type.name,
              color: monsterDetailData.color.name,
              text: flavorText.flavor_text,
              genera: pokemonGenera.genus,
              height: monsterData.height,
              weight: monsterData.weight,
            };
          })
        );
        /** 새로운 포멧몬 데이터 업데이트 */
        setPokeMonData(pokemonItem);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setPokeMonData]
  );

  /** 페이지의 하단으로 진입할때 몇개의 데이터를 더 보여줄지설정 */
  const loadMore = () => {
    setCount((prev) => prev + 9);
  };

  /** 데이터 호출  */
  useLayoutEffect(() => {
    fetchPokemons(count);
  }, [count]);

  /** 무한 스크롤 이팩팅 */
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
    <MainStyles.Section>
      <Filter />
      <MarginModel bottom={70} />
      <MainStyles.CardBox>
        <Cards
          pokeMonData={FilterData.length > 0 ? FilterData : pokemonData}
          ref={scrollEnd}
        />
      </MainStyles.CardBox>
      <MarginModel bottom={50} />
      {/* TODO: 어떤식으로 로딩 처리 할지에 대한 고민 */}
      {loading ? (
        <MainStyles.Loader>
          <Spinner width={50} height={50} fill='#fff' className='Loader' />
        </MainStyles.Loader>
      ) : null}
      <MarginModel bottom={50} />
    </MainStyles.Section>
  );
};

export default MainPage;
