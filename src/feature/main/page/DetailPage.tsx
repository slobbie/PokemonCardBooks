import { useMatch, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { PokeMonData } from '@atom/main/atom';

const DetailPage = () => {
  const Navigate = useNavigate();
  /** url 의 정보를 가져옴 */
  const matchId = useMatch('/detail/:id');

  /** 뒤로가기 이벤트 */
  const onBackClick = () => {
    Navigate(`/`);
  };

  /** 저장된 포켓몬 데이터 */
  const pokemonData = useRecoilValue(PokeMonData);

  /** 선택한 포멧몬 디테일 데이터 */
  const clickedData =
    matchId?.params.id &&
    pokemonData?.find((item) => item.id + '' === matchId.params.id);

  return (
    <DetailSection>
      <MiniImgBox>
        {clickedData && (
          <>
            <MiniImg className='miniImg front' src={clickedData?.front_img} />
            <MiniImg className='miniImg back' src={clickedData?.back_img} />
          </>
        )}
      </MiniImgBox>
      <DetailBox>
        {clickedData && (
          <>
            <Top>
              <Circle className='Circle' color={clickedData.color} />
              <h3 className='number'>No.{clickedData?.id}</h3>
              <p className='Type'>Type : {clickedData?.type}</p>
            </Top>

            <ImgBox color={clickedData.color}>
              <Img src={clickedData.img} />
            </ImgBox>

            <TextBox>
              <p className='name'>{clickedData?.name}</p>
              <p className='pokemonType'>{clickedData?.genera}</p>
              <p>{clickedData?.text}</p>
            </TextBox>
          </>
        )}
      </DetailBox>
      <Btn onClick={onBackClick}>Back</Btn>
    </DetailSection>
  );
};
export default DetailPage;

const DetailSection = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const DetailBox = styled.div`
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

const Top = styled.div`
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

const Circle = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  position: relative;
  left: 10px;
`;

const ImgBox = styled.div`
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

const Img = styled.img`
  width: 150px;
  @media screen and (max-width: 768px) {
    width: 100px;
  }
`;

const animate = keyframes`
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

const animate2 = keyframes`
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

const MiniImgBox = styled.div`
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

const MiniImg = styled.img`
  width: 100px;
  margin-left: 20px;
  margin-right: 20px;

  animation-delay: 0s;
`;

const TextBox = styled.div`
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

const Btn = styled.button`
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
