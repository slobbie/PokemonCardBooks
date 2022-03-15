const BASE_URL = 'https://pokeapi.co/api/v2/';

export const getData = () => {
  return fetch(`${BASE_URL}/pokemon/`).then((res) => res.json());
};
