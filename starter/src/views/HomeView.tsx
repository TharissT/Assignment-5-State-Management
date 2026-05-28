import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden bg-zinc-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/5 blur-[120px]" />
      </div>

      <section className="relative z-10 w-full max-w-4xl space-y-14 px-6 text-center">
        <div className="group relative">
          <h1 className="bg-gradient-to-b from-red-400 via-red-600 to-red-900 bg-clip-text text-[9rem] font-black tracking-tight text-transparent uppercase italic drop-shadow-[0_20px_50px_rgba(229,9,20,0.4)]">
            TMDB
          </h1>
          <p className="text-2xl font-black tracking-[0.4em] text-zinc-400 uppercase">Explorer</p>
        </div>

        <p className="mx-auto max-w-xl text-lg leading-relaxed font-light tracking-widest text-zinc-500 uppercase">
          Discover <strong className="font-black text-red-500">movies</strong>, binge{' '}
          <strong className="font-black text-red-500">TV shows</strong>, explore people.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/movies')}
            className="cursor-pointer border border-red-500/30 bg-red-600 px-14 py-4 font-black tracking-[0.3em] text-white uppercase shadow-[0_0_40px_rgba(229,9,20,0.3)] transition-all duration-300 hover:scale-105 hover:bg-red-500 active:scale-95"
          >
            Browse Movies
          </button>
          <button
            type="button"
            onClick={() => navigate('/tv')}
            className="cursor-pointer border border-zinc-700 bg-transparent px-14 py-4 font-black tracking-[0.3em] text-white uppercase transition-all duration-300 hover:scale-105 hover:border-red-600 hover:text-red-400 active:scale-95"
          >
            Browse TV
          </button>
        </div>

        <div className="flex justify-center gap-8 pt-2">
          {[
            { label: 'Trending', path: '/trending' },
            { label: 'Genre', path: '/genre' },
            { label: 'Search', path: '/search' },
          ].map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className="cursor-pointer text-xs font-bold tracking-widest text-zinc-600 uppercase transition-colors duration-200 hover:text-red-500"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};
