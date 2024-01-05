import { useNavigate } from 'react-router-dom';
import { setBackgroundColor } from '@common/utils/FilterColorModel';
import { useSetRecoilState } from 'recoil';
import { isLoading } from '@atom/main/atom';
import * as TypeFilterStyle from '@feature/main/styles/typeFilter';

/** 포켓몬 타입 필터 컴포넌트 */
const TypeFilter = () => {
  const types = [
    'grass',
    'ghost',
    'ice',
    'ground',
    'electric',
    'poison',
    'dragon',
    'normal',
    'steel',
    'flying',
    'fairy',
    'fire',
    'water',
    'bug',
    'dark',
    'rock',
    'psychic',
    'fighting',
  ];
  const Navigate = useNavigate();

  /** 스토어에 데이터 저장 함수 */
  const setIsLoading = useSetRecoilState(isLoading);

  /** 필터 클릭 이벤트 */
  const onFilter = (pType: string) => {
    setIsLoading(false);
    Navigate(pType);
  };

  return (
    <TypeFilterStyle.FilterBox>
      <TypeFilterStyle.ItemBox>
        <TypeFilterStyle.TypeBtn color='#333' onClick={() => Navigate('/')}>
          ALL
        </TypeFilterStyle.TypeBtn>
        {types.map((type: any) => {
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
