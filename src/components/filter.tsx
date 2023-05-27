import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { setBackgroundColor } from '../styeld/FilterColorModel';

const Filter = () => {
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
  return (
    <FilterBox>
      <ItemBox>
        <TypeBtn color='#333' onClick={() => Navigate('/')}>
          ALL
        </TypeBtn>
        {types.map((type: any) => {
          return (
            <TypeBtn
              key={type}
              color={setBackgroundColor(type)}
              onClick={() => Navigate(type)}
            >
              {type}
            </TypeBtn>
          );
        })}
      </ItemBox>
    </FilterBox>
  );
};

export default Filter;

const FilterBox = styled.div`
  margin-top: 30px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(8,0fr);
  max-width: 880px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, 0fr);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(3, 0fr);
  }
`

const TypeBtn = styled.button`
  outline: none;
  border: none;
  padding: 10px;
  border-radius: 15px;
  width: 100px;
  height: 40px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.color};
  margin: 5px;
  font-size: 10px;
  font-family: 'Press Start 2P';
  -webkit-transition: all 250ms linear;
  transition: all 250ms linear;

  cursor: pointer;
  &:hover() {
    opacity: 0.5;
  }
`;
