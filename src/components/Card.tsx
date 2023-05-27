import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PokeBall from "../assets/pokeball.svg";
import { ReactComponent as Spinner } from "../assets/spinner.svg";
import { type } from "os";
import { ForwardedRef, forwardRef } from "react";
import { PokeMonDataInterface } from "../common/interface/pokemon.interface";

interface CardsInterface {
  pokeMonData: PokeMonDataInterface[];
}

/** 포켓몬 카드 컴포넌트 */
const Cards = (
  { pokeMonData }: CardsInterface,
  ref: ForwardedRef<HTMLDivElement>
) => {
  /** 스토어에 저장된 포켓몬 데이터 */
  // const pokeMonData = useRecoilValue(PokeMonData);
  const renderDataList = pokeMonData;

  // const SearchDatas: any = useRecoilValue(SearchData);
  // const ToggleValue = useRecoilValue(Toggle);
  const path = useLocation();
  const FilterType = path.pathname.replace("/", "");

  const FilterData = renderDataList.filter((type) => type.type === FilterType);

  return (
    <>
      {/* <CardBox> */}
      {/* {path.pathname === '/' ? ( */}
      <>
        {renderDataList.map((item) => {
          return (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <Card color={item.color}>
                <Name>
                  <img className="ball" src={PokeBall} alt="포켓볼사진" />
                  <p className="number"> No.{item.id}</p>
                </Name>
                <Img src={item.img} />
                <p className="name"> {item.name}</p>
              </Card>
            </Link>
          );
        })}
      </>
      {/* ) : (
          <>
            {FilterData.map((item) => {
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
          </> */}
      {/* )} */}

      {/* {ToggleValue ? (
          <>
            {SearchDatas ? (
              <>
                {SearchDatas.map((item: IPokemoms) => {
                  return (
                    <Link to={`/detail/${item.id}`} key={item.id}>
                      <Card color={item.color}>
                        <Name>
                          <img
                            className='ball'
                            src={PokeBall}
                            alt='포켓볼사진'
                          />
                          <p className='number'> No.{item.id}</p>
                        </Name>
                        <Img src={item.img} />
                        <p className='name'> {item.name}</p>
                      </Card>
                    </Link>
                  );
                })}
              </>
            ) : null}
          </>
        ) : null} */}
      <div ref={ref}></div>
      {/* </CardBox> */}
      {/* <Loader>
        <Spinner width={50} height={50} fill='#fff' className='Loader' />
      </Loader> */}
    </>
  );
};

export default forwardRef<HTMLDivElement, CardsInterface>(Cards);

const Card = styled.div<{ color?: string }>`
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
    font-family: "Press Start 2P", cursive;
    color: #000;
  }
  .name {
    font-family: "Poor Story", cursive;
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
  @media screen and (max-width: 768px) {
    bottom: 10px;
  }
`;
