import { Button } from '@/components/controls/buttons/Button';
import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { SectionHeader } from '@/components/site/Loading';
import { useUserContext } from '@/hooks';
import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const FavoritesView = () => {
  const navigate = useNavigate();
  const { favorites, clearFavorites } = useUserContext();

  const movieFavs = favorites.filter((f) => f.media === 'movie');
  const tvFavs = favorites.filter((f) => f.media === 'tv');

  if (favorites.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16 text-center">
        <FiHeart size={48} className="mx-auto mb-4 text-zinc-700" />
        <p className="text-xl font-bold text-zinc-500">No favorites yet.</p>
        <p className="mt-2 text-sm text-zinc-600">Click the heart icon on any movie or TV show to add it here.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 px-6 py-8">
      <SectionHeader title="Favorites">
        <Button variant="danger" onClick={clearFavorites}>
          Clear All
        </Button>
      </SectionHeader>

      {movieFavs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">Movies</h3>
          <ImageGrid
            images={movieFavs.map((f) => ({ id: f.id, imageUrl: f.imageUrl, primaryText: f.title, media: 'movie' }))}
            onClick={(img) => navigate(`/movie/${img.id}`)}
          />
        </div>
      )}

      {tvFavs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase">TV Shows</h3>
          <ImageGrid
            images={tvFavs.map((f) => ({ id: f.id, imageUrl: f.imageUrl, primaryText: f.title, media: 'tv' }))}
            onClick={(img) => navigate(`/tv-show/${img.id}`)}
          />
        </div>
      )}
    </section>
  );
};
