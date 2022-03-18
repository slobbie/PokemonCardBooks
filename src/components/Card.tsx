import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Data } from '../atom';
import { useRecoilState } from 'recoil';
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

const Cards = () => {
  const [pokeMonsData, setPokeMonsData] = useRecoilState(Data);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(9);

  const fetchPokemons = async (count: number) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${count}`);
    const json = await res.json();
    const { results } = json;

    const pokemonItem: any = await Promise.all(
      results.map(async ({ url }: any) => {
        const pokemonRes = await fetch(url);
        const pokemonJson = await pokemonRes.json();
        const detailUrl = pokemonJson.species.url;
        console.log(pokemonJson);
        const detailRes = await fetch(detailUrl);
        const detailJson = await detailRes.json();
        console.log(pokemonJson);
        return {
          id: pokemonJson.id,
          name: detailJson.names[2].name,
          img: pokemonJson.sprites.other['official-artwork'].front_default,
          front_img: pokemonJson.sprites.front_default,
          back_img: pokemonJson.sprites.back_default,
          type: pokemonJson.types[0].type.name,
          color: detailJson.color.name,
          text: detailJson.flavor_text_entries[23].flavor_text,
          genera: detailJson.genera[1].genus,
          height: pokemonJson.height,
          weight: pokemonJson.weight,
        };
      })
    );
    setPokeMonsData(pokemonItem);
    // setPokemons(pokemonItem);
    setIsLoading(false);
  };
  const loadMore = () => {
    setCount((prev) => prev + 9);
  };
  useEffect(() => {
    fetchPokemons(count);
  }, [count]);

  const scrollEnd = useRef<any>();
  useEffect(() => {
    if (!isLoading) {
      const observer = new IntersectionObserver(
        (entrise) => {
          if (entrise[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(scrollEnd.current);
    }
  }, [isLoading]);

  return (
    <CardBox>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <>
          {pokeMonsData.map((item: IPokemoms) => {
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
