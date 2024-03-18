import { setBackgroundColor } from '@common/utils/FilterColorModel';
import { useSetRecoilState } from 'recoil';
import { isLoading } from '@atom/main/atom';
import * as TypeFilterStyle from '@feature/main/styles/typeFilter';
import { pokemonType } from '@feature/main/constants/pokemonType';

interface ITypeFilter {
  findTypeMonsterCallback: (pType: string) => void;
}

/** 포켓몬 타입 필터 컴포넌트 */
const TypeFilter = ({ findTypeMonsterCallback }: ITypeFilter) => {
  /** 스토어에 데이터 저장 함수 */
  const setIsLoading = useSetRecoilState(isLoading);

  /** 필터 클릭 이벤트 */
  const onFilter = (pType: string) => {
    setIsLoading(false);
    findTypeMonsterCallback(pType);
  };

  return (
    <TypeFilterStyle.FilterBox>
      <TypeFilterStyle.ItemBox>
        <TypeFilterStyle.TypeBtn color='#333' onClick={() => onFilter('all')}>
          ALL
        </TypeFilterStyle.TypeBtn>
        {pokemonType.map((type: string) => {
          return (
            <TypeFilterStyle.TypeBtn
              key={type}
              color={setBackgroundColor(type)}
              onClick={() => onFilter(type)}
            >
              {type}
            </TypeFilterStyle.TypeBtn>
          );
        })}
      </TypeFilterStyle.ItemBox>
    </TypeFilterStyle.FilterBox>
  );
};

export default TypeFilter;
