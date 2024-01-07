import styled, { keyframes } from 'styled-components';

export const Section = styled.section`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.bgColor};
`;

export const CardBox = styled.div`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 425px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Rotate = keyframes`
 100% {
    	transform: rotate(360deg);
    }
`;

export const Loader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  width: 100%;
  color: #fff;
  font-size: 24px;

  .Loader {
    animation: ${Rotate} 1s linear infinite;
  }
`;
