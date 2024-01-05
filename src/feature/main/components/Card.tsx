import PokeBall from '../../../assets/pokeball.svg';
import { ForwardedRef, forwardRef } from 'react';
import { PokeMonDataInterface } from '@common/interface/pokemon.interface';
import { Link } from 'react-router-dom';
import * as CardStyle from '@feature/main/styles/card.style';

interface CardsInterface {
  pokeMonData: PokeMonDataInterface[];
}

/** 포켓몬 카드 컴포넌트 */
const Cards = (
  { pokeMonData }: CardsInterface,
  ref: ForwardedRef<HTMLDivElement>
) => {
  /** 스토어에 저장된 포켓몬 데이터 */
  const renderDataList = pokeMonData;

  return (
    <>
      <>
        {renderDataList.map((item) => {
          return (
            <Link to={`/detail/${item.id}`} key={item.id}>
              <CardStyle.Card color={item.color}>
                <CardStyle.Name>
                  <img className='ball' src={PokeBall} alt='포켓볼사진' />
                  <p className='number'> No.{item.id}</p>
                </CardStyle.Name>
                <CardStyle.Img src={item.img} />
                <p className='name'> {item.name}</p>
              </CardStyle.Card>
            </Link>
          );
        })}
      </>
      <div ref={ref}></div>
    </>
  );
};

export default forwardRef<HTMLDivElement, CardsInterface>(Cards);
