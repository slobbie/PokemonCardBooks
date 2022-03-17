import { atom } from 'recoil';

export const Data = atom({
  // atom 은 두가지를 요구한다.
  // 첫번째로는 key로 유일한 값이여한다.
  key: 'data',
  // 두번째로 dafault value 가 필요하다.
  default: [],
});

export const Theme = atom({
  key: 'theme',
  default: true,
});
