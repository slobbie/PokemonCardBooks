import PokeBall from '@assets/pokeball.svg';
import { ForwardedRef, forwardRef, useRef } from 'react';
import { PokeMonDataInterface } from '@common/interface/pokemon.interface';
import { Link } from 'react-router-dom';
import * as CardStyle from '@feature/main/styles/card.style';
import path from '@constants/index';

interface CardsInterface {
  pokeMonData: PokeMonDataInterface[];
}

/** 포켓몬 카드 컴포넌트 */
const Cards = (
  { pokeMonData }: CardsInterface,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const imgRef = useRef<HTMLImageElement>(null);
  /** 스토어에 저장된 포켓몬 데이터 */
  const renderDataList = pokeMonData;

  return (
    <>
      <>
        {renderDataList.map((item) => {
          return (
            <Link to={`${path.router.detail}/${item.id}`} key={item.id}>
              {renderDataList.length > 0 && (
                <CardStyle.Card color={item.color}>
                  <CardStyle.Name>
                    <img className='ball' src={PokeBall} alt='포켓볼사진' />
                    <p className='number'> No.{item.id}</p>
                  </CardStyle.Name>
                  <CardStyle.Img
                    ref={imgRef}
                    src={item.img as string}
                    loading='lazy'
                  />
                  <p className='name'> {item.name}</p>
                </CardStyle.Card>
              )}
            </Link>
          );
        })}
      </>
      <div ref={ref}></div>
    </>
  );
};

export default forwardRef<HTMLDivElement, CardsInterface>(Cards);
