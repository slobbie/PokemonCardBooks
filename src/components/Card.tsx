import { Link } from 'react-router-dom';
import { Data, SearchData, Toggle } from '../atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import PokeBall from '../assets/pokeball.svg';

interface IPokemoms {
  color: string;
  genera: string;
  height: number;
  id: number;
  img: string;
  name: string;
  text: string;
  type: string;
  weight: number;
}

const Cards = ({ scrollEnd, ToggleData }: any) => {
  const data: any = useRecoilValue(Data);
  const SeachData: any = useRecoilValue(SearchData);
  const ToggleValue = useRecoilValue(Toggle);
  console.log(ToggleValue);
  return (
    <CardBox>
      {ToggleValue ? (
        <>
          {SeachData.map((item: IPokemoms) => {
            return (
              <Link to={`/detail/${item.id}`} key={item.id}>
                <Card color={item.color}>
                  <Name>
                    <img className='ball' src={PokeBall} alt='포켓볼사진' />
                    <p className='number'> No.{item.id}</p>
                  </Name>
                  <Img src={item.img} />
                  <p className='name'> {item.name}</p>
                </Card>
              </Link>
            );
          })}
        </>
      ) : (
        <>
          {data.map((item: IPokemoms) => {
            return (
              <Link to={`/detail/${item.id}`} key={item.id}>
                <Card color={item.color}>
                  <Name>
                    <img className='ball' src={PokeBall} alt='포켓볼사진' />
                    <p className='number'> No.{item.id}</p>
                  </Name>
                  <Img src={item.img} />
                  <p className='name'> {item.name}</p>
                </Card>
              </Link>
            );
          })}
        </>
      )}
      <div ref={scrollEnd}></div>
    </CardBox>
  );
};

export default Cards;

const CardBox = styled.div`
  max-width: 50%;
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px;
  align-items: center;
  margin: 0 auto;
`;

const Card = styled.div`
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
`;

const Name = styled.div`
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

const Img = styled.img`
  width: 80px;
  height: 80px;
  position: relative;
  bottom: 35px;

  &:hover {
    transform: translateY(-10px);
  }
`;
