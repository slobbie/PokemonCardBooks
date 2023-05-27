import { atom } from "recoil";
import { PokeMonDataInterface } from "./common/interface/pokemon.interface";

export const Data = atom({
  // atom 은 두가지를 요구한다.
  // 첫번째로는 key로 유일한 값이여한다.
  key: "data",
  // 두번째로 dafault value 가 필요하다.
  default: [],
});

export const PokeMonData = atom<PokeMonDataInterface[]>({
  key: "PokeMonData",
  default: [],
});

export const SearchData = atom<PokeMonDataInterface[]>({
  key: "SearchData",
  default: [],
});

export const Toggle = atom({
  key: "Toggle",
  default: false,
});

export const ToggleData = atom({
  key: "Toggle",
  default: [],
});

export const Theme = atom({
  key: "theme",
  default: true,
});
