import styled from 'styled-components';

export const Card = styled.div<{ color?: string }>`
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 20px;
  border: none;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.color};
  }
  .number {
    margin-right: 10px;
    font-family: 'Press Start 2P', cursive;
    color: #000;
  }
  .name {
    font-family: 'Poor Story', cursive;
    font-size: 25px;
    color: #000;
    position: relative;
    bottom: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 180px;
    height: 180px;
  }
  @media screen and (max-width: 425px) {
    width: 160px;
    height: 160px;
  }
`;

export const Name = styled.div`
  display: flex;
  margin-top: 20px;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: auto;
  align-items: center;
  .ball {
    width: 30px;
    margin-right: 10px;
    color: red;
  }
`;

export const Img = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  bottom: 35px;
  &:hover {
    transform: translateY(-10px);
  }
  @media screen and (max-width: 768px) {
    bottom: 10px;
  }
`;
