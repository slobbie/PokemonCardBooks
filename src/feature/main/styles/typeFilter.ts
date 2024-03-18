import styled from 'styled-components';

export const FilterBox = styled.div`
  margin-top: 30px;
  max-width: 1200px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const ItemBox = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  max-width: 1200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  justify-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(5, 0fr);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(4, 0fr);
  }
`;

export const TypeBtn = styled.button`
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

  @media screen and (max-width: 425px) {
    width: 80px;
    height: 40px;
    font-size: 8px;
  }

  cursor: pointer;
  &:hover() {
    opacity: 0.5;
  }
`;
