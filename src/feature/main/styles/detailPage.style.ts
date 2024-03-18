import styled, { keyframes } from 'styled-components';

export const DetailSection = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

export const DetailBox = styled.div`
  height: 500px;
  width: 500px;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Top = styled.div`
  width: 100%;
  margin-top: 30px;
  display: flex;
  font-family: 'Press Start 2P', cursive;
  font-size: 17px;
  align-items: center;
  .number {
    margin-left: 25px;
  }
  .Type {
    margin-left: auto;
    margin-right: 25px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    font-size: 14px;
    text-align: start;
    .number {
      margin-left: 0px;
    }
    .Type {
      margin: 10px 0 10px 0;
    }
    .Circle {
      position: relative;
      left: 0;
      margin-bottom: 10px;
    }
  }
`;

export const Circle = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  position: relative;
  left: 10px;
`;

export const ImgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 250px;
  height: 250px;
  border-radius: 100px;
  background-color: ${(props) => props.color};
  @media screen and (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;

export const Img = styled.img`
  width: 150px;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

export const animate = keyframes`
   0% {

      transform: translateX(0);
    }
    40% {

      transform: translatey(-10px);
    }
    70% {
      transform: translateY(10px);
    }
   100%{
    transform: translateY(0);
    }
`;

export const animate2 = keyframes`
   0% {

      transform: translateX(0);
    }
    40% {

      transform: translatey(10px);
    }
    70% {
      transform: translateY(-10px);
    }
   100%{
    transform: translateY(0);
    }
`;

export const MiniImgBox = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-around;
  align-items: center;
  position: relative;
  .front {
    animation: ${animate} 5s linear infinite;
  }
  .back {
    animation: ${animate2} 5s linear infinite;
  }
`;

export const MiniImg = styled.img`
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;

  animation-delay: 0s;
`;

export const TextBox = styled.div`
  font-family: 'Poor Story', cursive;
  width: 50%;
  .name {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .pokemonType {
    margin: 20px 0 20px 0;
    font-size: 18px;
  }
`;

export const Btn = styled.button`
  font-family: 'Press Start 2P', cursive;
  margin-top: 20px;
  border: none;
  height: 40px;
  border-radius: 15px;
  font-size: 17px;
  background-color: transparent;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
`;
