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
    </FilterBox>
  );
};

export default Filter;

const FilterBox = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  max-width: 50%;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

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
