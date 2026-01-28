import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IFavoritesState {
  favorites: number[]; // Store pokemon IDs
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<IFavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [], // 즐겨찾기한 포켓몬 ID 목록 초기값
      // 즐겨찾기 상태를 토글(추가/제거)하는 액션
      toggleFavorite: (id: number) => {
        const { favorites } = get();
        const isFav = favorites.includes(id);

        if (isFav) {
          // 이미 즐겨찾기 상태면 제거
          set({ favorites: favorites.filter((favId: number) => favId !== id) });
        } else {
          // 즐겨찾기 상태가 아니면 추가
          set({ favorites: [...favorites, id] });
        }
      },
      /** 특정 ID의 포켓몬이 즐겨찾기 목록에 있는지 확인하는 함수 */
      isFavorite: (id: number) => get().favorites.includes(id),
    }),
    {
      /** 로컬 스토리지 키 설정 */
      name: 'pokemon-favorites-storage',
    },
  ),
);
