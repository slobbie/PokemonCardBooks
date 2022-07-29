import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FilterBackgroundColor } from '../../utils/filterBackground';

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

  const navigate = useNavigate();

  return (
    <Div>
      <Button color='#333' onClick={() => navigate('/')}>
        All
      </Button>
      {types.map((type) => (
        <>
          <Button
            key={type}
            color={FilterBackgroundColor(type)}
            onClick={() => navigate(type)}
          >
            {type}
          </Button>
        </>
      ))}
    </Div>
  );
};

export default Filter;

const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  justify-content: space-around;
  margin: 20px;
  align-items: center;
  margin: 0 auto;
  width: 50%;
  margin-top: 30px;
`;

const Button = styled.button<{ color: string }>`
  border-radius: 15px;
  width: 100px;
  height: 50px;
  border: none;
  cursor: pointer;
  font-family: 'Press Start 2P';
  font-size: 10px;
  color: #fff;
  background-color: ${(props) => props.color};
  &:hover {
    opacity: 0.5;
  }
`;
