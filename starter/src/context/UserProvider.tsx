import { UserContext } from '@/context/UserContext';
import { DEFAULT_MOVIE_GENRES, DEFAULT_TV_GENRES, DEFAULT_USERNAME } from '@/core/constants';
import type { CartItem, FavoriteItem, UserSettings } from '@/core/types';
import { useMemo, useState, type ReactNode } from 'react';

type UserProviderProps = {
  children: ReactNode;
};

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently fail
  }
}

const defaultSettings: UserSettings = {
  username: DEFAULT_USERNAME,
  movieGenres: DEFAULT_MOVIE_GENRES,
  tvGenres: DEFAULT_TV_GENRES,
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [settings, setSettings] = useState<UserSettings>(() => loadFromStorage<UserSettings>('tmdb_settings', defaultSettings));

  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => loadFromStorage<FavoriteItem[]>('tmdb_favorites', []));

  const [cart, setCart] = useState<CartItem[]>(() => loadFromStorage<CartItem[]>('tmdb_cart', []));

  const updateUsername = (name: string) => {
    const updated = { ...settings, username: name };
    setSettings(updated);
    saveToStorage('tmdb_settings', updated);
  };

  const updateMovieGenres = (genres: string[]) => {
    const updated = { ...settings, movieGenres: genres };
    setSettings(updated);
    saveToStorage('tmdb_settings', updated);
  };

  const updateTvGenres = (genres: string[]) => {
    const updated = { ...settings, tvGenres: genres };
    setSettings(updated);
    saveToStorage('tmdb_settings', updated);
  };

  const addFavorite = (item: FavoriteItem) => {
    // remove from cart if present (mutually exclusive)
    const newCart = cart.filter((c) => c.id !== item.id);
    setCart(newCart);
    saveToStorage('tmdb_cart', newCart);

    if (!favorites.find((f) => f.id === item.id)) {
      const newFavs = [...favorites, item];
      setFavorites(newFavs);
      saveToStorage('tmdb_favorites', newFavs);
    }
  };

  const removeFavorite = (id: number) => {
    const newFavs = favorites.filter((f) => f.id !== id);
    setFavorites(newFavs);
    saveToStorage('tmdb_favorites', newFavs);
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some((f) => f.id === id);
  };

  const clearFavorites = () => {
    setFavorites([]);
    saveToStorage('tmdb_favorites', []);
  };

  const addToCart = (item: CartItem) => {
    // remove from favorites if present (mutually exclusive)
    const newFavs = favorites.filter((f) => f.id !== item.id);
    setFavorites(newFavs);
    saveToStorage('tmdb_favorites', newFavs);

    if (!cart.find((c) => c.id === item.id)) {
      const newCart = [...cart, item];
      setCart(newCart);
      saveToStorage('tmdb_cart', newCart);
    }
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((c) => c.id !== id);
    setCart(newCart);
    saveToStorage('tmdb_cart', newCart);
  };

  const isInCart = (id: number): boolean => {
    return cart.some((c) => c.id === id);
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage('tmdb_cart', []);
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);

  return (
    <UserContext.Provider
      value={{
        settings,
        updateUsername,
        updateMovieGenres,
        updateTvGenres,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        clearFavorites,
        cart,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
