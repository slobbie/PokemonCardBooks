import { atom } from 'recoil';
import { PokeMonDataInterface } from '@common/interface/pokemon.interface';

export const PokeMonData = atom<PokeMonDataInterface[]>({
  key: 'PokeMonData',
  default: [],
});

export const SearchData = atom<PokeMonDataInterface[]>({
  key: 'SearchData',
  default: [],
});

export const isLoading = atom<boolean>({
  key: 'isLoading',
  default: false,
});

export const Toggle = atom({
  key: 'Toggle',
  default: false,
});

export const ToggleData = atom({
  key: 'ToggleData',
  default: [],
});

export const Theme = atom({
  key: 'theme',
  default: true,
});
