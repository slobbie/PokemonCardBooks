import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Data } from '../../atom';
import { setBackgroundColor } from '../../styeld/FilterColorModel';

const Filter = () => {
  const TypeValue = useRecoilValue(Data);
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
  return (
    <FilterBox>
      {types.map((type: any) => {
        return (
          <TypeBtn key={type} color={setBackgroundColor(type)}>
            {type}
          </TypeBtn>
        );
      })}
    </FilterBox>
  );
};

export default Filter;

const FilterBox = styled.div`
  display: flex;
  max-width: 50%;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const TypeBtn = styled.button`
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 3px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.color};
  margin: 5px;
  font-size: 12px;
  font-family: 'Press Start 2P', cursive;
  -webkit-transition: all 250ms linear;
  transition: all 250ms linear;
  cursor: pointer;
`;
