import styled from 'styled-components';

export const SearchBar = styled.div`
  max-width: 1200px;
  max-height: 50px;
  width: 100%;
`;

export const Warper = styled.div`
  max-width: calc(1200px - 40px);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  background-color: ${(theme) => theme.theme.bg_fff};
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 15px;
  padding: 0 10px;
  font-size: 13px;
  :focus {
    color: #333;
    outline: none;
  }
  ::placeholder {
    font-family: 'Press Start 2P';
    font-size: 13px;
    padding-left: 10px;
  }
`;

export const Btn = styled.button`
  width: 100px;
  font-family: 'Press Start 2P';
  border: none;
  color: #000;
  border-radius: 15px;
  height: 50px;
  background-color: transparent;
`;

export const BtnBox = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-around;
  /* @media screen and (max-width: 768px) {
    width: 100%;
    margin: 30px 0 auto;
  } */
`;

export const SearchIcon = styled.img`
  width: 30px;
  height: 30px;
`;
