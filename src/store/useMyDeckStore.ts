import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IPokemon } from '@/types/pokemon';

interface IMyDeckState {
  deck: IPokemon[];
  addToDeck: (pokemon: IPokemon) => void;
  removeFromDeck: (id: number) => void;
  isInDeck: (id: number) => boolean;
}

export const useMyDeckStore = create<IMyDeckState>()(
  persist(
    (set, get) => ({
      deck: [],
      addToDeck: (pokemon: IPokemon) => {
        if (get().deck.length >= 6) return; // 최대 6마리 제한
        if (get().isInDeck(pokemon.id)) return;
        set((state: IMyDeckState) => ({ deck: [...state.deck, pokemon] }));
      },
      removeFromDeck: (id: number) => {
        set((state: IMyDeckState) => ({
          deck: state.deck.filter((p: IPokemon) => p.id !== id),
        }));
      },
      isInDeck: (id: number) => get().deck.some((p: IPokemon) => p.id === id),
    }),

    {
      name: 'pokemon-deck-storage',
    },
  ),
);
