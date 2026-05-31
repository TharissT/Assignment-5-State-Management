import { Button } from '@/components/controls/buttons/Button';
import { SectionHeader } from '@/components/site/Loading';
import { DEFAULT_MOVIE_GENRES, DEFAULT_TV_GENRES, MOVIE_GENRES, TV_GENRES } from '@/core/constants';
import { useUserContext } from '@/hooks';
import { useState } from 'react';

const SettingsForm = () => {
  const { settings, updateUsername, updateMovieGenres, updateTvGenres } = useUserContext();

  const [username, setUsername] = useState(settings.username);
  const [movieGenres, setMovieGenres] = useState<string[]>(settings.movieGenres);
  const [tvGenres, setTvGenres] = useState<string[]>(settings.tvGenres);

  const handleSave = () => {
    const finalName = username.trim() || 'User';
    updateUsername(finalName);
    updateMovieGenres(movieGenres);
    updateTvGenres(tvGenres);
  };

  const handleReset = () => {
    updateUsername('User');
    updateMovieGenres(DEFAULT_MOVIE_GENRES);
    updateTvGenres(DEFAULT_TV_GENRES);
  };

  const toggleMovieGenre = (val: string) => {
    setMovieGenres((prev) => (prev.includes(val) ? prev.filter((g) => g !== val) : [...prev, val]));
  };

  const toggleTvGenre = (val: string) => {
    setTvGenres((prev) => (prev.includes(val) ? prev.filter((g) => g !== val) : [...prev, val]));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-1 text-base font-black text-white">Profile</h3>
        <p className="mb-4 text-xs text-zinc-500">Update your display profile</p>

        <label className="mb-1 block text-xs font-semibold tracking-wider text-zinc-400 uppercase">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4 w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-red-600 focus:outline-none"
        />

        <div className="flex gap-3">
          <Button variant="danger" onClick={handleReset}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>

      <div className="rounded border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-1 text-base font-black text-white">Preferences</h3>
        <p className="mb-4 text-xs text-zinc-500">Choose genres you like</p>

        <p className="mb-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">Movies</p>
        <div className="mb-4 flex flex-wrap gap-2">
          {MOVIE_GENRES.map((g) => (
            <label key={g.value} className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={movieGenres.includes(g.value)}
                onChange={() => toggleMovieGenre(g.value)}
                className="accent-red-600"
              />
              {g.label}
            </label>
          ))}
        </div>

        <p className="mb-2 text-xs font-bold tracking-wider text-zinc-400 uppercase">TV</p>
        <div className="flex flex-wrap gap-2">
          {TV_GENRES.map((g) => (
            <label key={g.value} className="flex cursor-pointer items-center gap-1.5 text-xs text-zinc-300">
              <input
                type="checkbox"
                checked={tvGenres.includes(g.value)}
                onChange={() => toggleTvGenre(g.value)}
                className="accent-red-600"
              />
              {g.label}
            </label>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export const SettingsView = () => {
  const { settings } = useUserContext();

  const formKey = `${settings.username}-${settings.movieGenres.join(',')}-${settings.tvGenres.join(',')}`;

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <SectionHeader title="Settings" />
      <SettingsForm key={formKey} />
    </section>
  );
};