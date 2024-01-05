import { atom } from 'recoil';
import { PokeMonDataInterface } from '@common/interface/pokemon.interface';
import Key from '@constants/index';

export const PokeMonData = atom<PokeMonDataInterface[]>({
  key: Key.atomKey.PokeMonData,
  default: [],
});

export const SearchData = atom<PokeMonDataInterface[]>({
  key: Key.atomKey.SearchData,
  default: [],
});

export const isLoading = atom<boolean>({
  key: Key.atomKey.isLoading,
  default: false,
});

export const Toggle = atom({
  key: Key.atomKey.Toggle,
  default: false,
});

export const ToggleData = atom({
  key: Key.atomKey.ToggleData,
  default: [],
});

export const Theme = atom({
  key: Key.atomKey.Theme,
  default: true,
});
