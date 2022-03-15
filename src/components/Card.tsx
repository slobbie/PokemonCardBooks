import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

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
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(9);

  const fetchPokemons = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
    const json = await res.json();
    const { results } = json;

    const pokemonItem: any = await Promise.all(
      results.map(async ({ url }: any) => {
        const pokemonRes = await fetch(url);
        const pokemonJson = await pokemonRes.json();
        const detailUrl = pokemonJson.species.url;

        const detailRes = await fetch(detailUrl);
        const detailJson = await detailRes.json();

        return {
          id: pokemonJson.id,
          name: detailJson.names[2].name,
          img: pokemonJson.sprites.other['official-artwork'].front_default,
          type: pokemonJson.types[0].type.name,
          color: detailJson.color.name,
          text: detailJson.flavor_text_entries[23].flavor_text,
          genera: detailJson.genera[1].genus,
          height: pokemonJson.height,
          weight: pokemonJson.weight,
        };
      })
    );

    setPokemons(pokemonItem);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchPokemons();
  }, []);
  console.log(pokemons);
  return (
    <CardBox>
      {pokemons.map((item: IPokemoms, i) => {
        return (
          <Card key={i}>
            <Name>{item.name}</Name>
            <Img src={item.img} />
          </Card>
        );
      })}
    </CardBox>
  );
};

export default Cards;

const CardBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
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
  cursor: pointer;
`;

const Name = styled.h3`
  margin-top: 20px;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: auto;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  bottom: 20px;
`;
