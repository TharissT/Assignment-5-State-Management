import { LinkGroup } from '@/components/controls/links/LinkGroup';
import { Loading } from '@/components/site/Loading';
import { Modal } from '@/components/site/Modal';
import { MOVIE_ENDPOINT } from '@/core/constants';
import type { MovieResponse } from '@/core/types';
import { calculatePrice, getBackdropUrl, getImageUrl } from '@/core/utils';
import { useTmdb, useUserContext } from '@/hooks';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const MovieView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<MovieResponse>(`${MOVIE_ENDPOINT}/${id}`, {}, [id]);
  const { addFavorite, removeFavorite, isFavorite, addToCart, removeFromCart, isInCart } = useUserContext();

  if (loading) {
    return (
      <Modal onClose={() => navigate(-1)}>
        <Loading />
      </Modal>
    );
  }

  if (!data) return null;

  const title = data.title ?? data.name ?? 'Unknown';
  const year = data.release_date ? new Date(data.release_date).getFullYear() : '';
  const score = typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : '—';
  const price = calculatePrice(data.release_date);
  const numId = Number(id);
  const favorited = isFavorite(numId);
  const inCart = isInCart(numId);

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(numId);
    } else {
      addFavorite({ id: numId, title, imageUrl: getImageUrl(data.poster_path), media: 'movie' });
    }
  };

  const handleCart = () => {
    if (inCart) {
      removeFromCart(numId);
    } else {
      addToCart({
        id: numId,
        title,
        imageUrl: getImageUrl(data.poster_path),
        price,
        type: 'movie',
      });
    }
  };

  return (
    <Modal onClose={() => navigate(-1)}>
      {data.backdrop_path && (
        <div className="relative h-56 w-full overflow-hidden">
          <img src={getBackdropUrl(data.backdrop_path)} alt={title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
      )}
      <div className="relative -mt-16 flex gap-6 p-6">
        {data.poster_path && (
          <img src={getImageUrl(data.poster_path)} alt={title} className="w-32 shrink-0 rounded border border-zinc-800 shadow-2xl" />
        )}
        <div className="flex-1 space-y-3 pt-16">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-white">{title}</h2>
              {data.tagline && <p className="text-sm text-red-400 italic">{data.tagline}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleFavorite}
                title={favorited ? 'Remove from Favorites' : 'Add to Favorites'}
                className={`cursor-pointer rounded-full p-2 transition-all duration-200 ${
                  favorited ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                <FiHeart size={16} fill={favorited ? 'currentColor' : 'none'} />
              </button>
              <button
                type="button"
                onClick={handleCart}
                title={inCart ? 'Remove from Cart' : 'Add to Cart'}
                className={`cursor-pointer rounded-full p-2 transition-all duration-200 ${
                  inCart ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                <FiShoppingCart size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            {year && <span>{year}</span>}
            {data.runtime && <span>{data.runtime}m</span>}
            <span className="flex items-center gap-1 font-bold text-yellow-400">
              <FiStar size={13} /> {score}
            </span>
            <span className="font-bold text-red-400">${price.toFixed(2)}</span>
          </div>

          {data.genres && data.genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.genres.map((g) => (
                <span key={g.id} className="rounded border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">{data.overview}</p>
        </div>
      </div>
      <div className="px-6 pb-4">
        <LinkGroup
          links={[
            { label: 'Summary', to: `/movie/${id}` },
            { label: 'Credits', to: `/movie/${id}/credits` },
            { label: 'Trailers', to: `/movie/${id}/trailers` },
            { label: 'Reviews', to: `/movie/${id}/reviews` },
          ]}
        />
        <Outlet />
      </div>
    </Modal>
  );
};
