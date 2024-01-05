const version = Object.freeze({
  v1: '/v1',
  v2: '/v2',
});

const api = Object.freeze('/api');

export const apiVersion = Object.freeze({
  v1: api + version.v1,
  v2: api + version.v2,
});

export const apiMethod = Object.freeze({
  post: 'POST',
  get: 'GET',
});

export const apiServices = Object.freeze({
  apiVersion: apiVersion,
  apiMethod: apiMethod,
  url: {
    pokeApi: `https://pokeapi.co${apiVersion.v2}/pokemon?limit=`,
  },
});
