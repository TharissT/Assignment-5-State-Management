import { useUserContext } from '@/hooks';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { FiFilm, FiHeart, FiSearch, FiSettings, FiShoppingCart, FiTrendingUp, FiTv, FiUser } from 'react-icons/fi';
import { MdOutlineCategory } from 'react-icons/md';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

const SEARCH_FILTERS = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV', value: 'tv' },
  { label: 'Person', value: 'person' },
];

export const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { settings, favorites, cart } = useUserContext();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [filter, setFilter] = useState('movie');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedQuery.trim())}&filter=${filter}`);
    }
  }, [debouncedQuery, filter, navigate]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-black tracking-widest text-red-600 italic">
          TMDB Explorer
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-4">
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`
            }
          >
            <FiFilm size={13} /> Movies
          </NavLink>
          <NavLink
            to="/tv"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`
            }
          >
            <FiTv size={13} /> TV
          </NavLink>
          <NavLink
            to="/trending"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`
            }
          >
            <FiTrendingUp size={13} /> Trending
          </NavLink>
          <NavLink
            to="/genre"
            className={({ isActive }) =>
              `flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`
            }
          >
            <MdOutlineCategory size={13} /> Genre
          </NavLink>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className="relative">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-zinc-500" size={14} />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-44 rounded border border-zinc-700 bg-zinc-800/80 py-1.5 pr-3 pl-9 text-sm text-white placeholder-zinc-500 transition-all duration-200 focus:w-56 focus:border-red-600 focus:outline-none"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1">
          {SEARCH_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`flex cursor-pointer items-center gap-1 rounded px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                filter === f.value ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {f.value === 'movie' && <FiFilm size={11} />}
              {f.value === 'tv' && <FiTv size={11} />}
              {f.value === 'person' && <FiUser size={11} />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <NavLink to="/favorites" className="relative text-zinc-400 transition-colors hover:text-white">
            <FiHeart size={20} />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/cart" className="relative text-zinc-400 transition-colors hover:text-white">
            <FiShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </NavLink>
          <NavLink to="/settings" className="text-zinc-400 transition-colors hover:text-white">
            <FiSettings size={20} />
          </NavLink>
        </div>
      </nav>

      {/* Welcome bar */}
      <div className="border-t border-zinc-800/50 bg-zinc-950 px-6 py-1.5">
        <p className="mx-auto max-w-7xl text-sm font-semibold text-zinc-300">
          Welcome, <span className="text-red-500">{settings.username}</span>
        </p>
      </div>
    </header>
  );
};
