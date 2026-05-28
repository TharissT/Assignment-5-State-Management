import type { CartItem, FavoriteItem, UserSettings } from '@/core/types';
import { createContext } from 'react';

export type UserContextType = {
  settings: UserSettings;
  updateUsername: (name: string) => void;
  updateMovieGenres: (genres: string[]) => void;
  updateTvGenres: (genres: string[]) => void;

  favorites: FavoriteItem[];
  addFavorite: (item: FavoriteItem) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  clearFavorites: () => void;

  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  isInCart: (id: number) => boolean;
  clearCart: () => void;
  cartTotal: number;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);
