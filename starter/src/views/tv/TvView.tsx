import { LinkGroup } from '@/components/controls/links/LinkGroup';
import { Loading } from '@/components/site/Loading';
import { Modal } from '@/components/site/Modal';
import { TV_ENDPOINT } from '@/core/constants';
import type { MovieResponse } from '@/core/types';
import { getBackdropUrl, getImageUrl } from '@/core/utils';
import { useTmdb, useUserContext } from '@/hooks';
import { FiHeart, FiStar } from 'react-icons/fi';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export const TvView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<MovieResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const { addFavorite, removeFavorite, isFavorite } = useUserContext();

  if (loading) {
    return (
      <Modal onClose={() => navigate(-1)}>
        <Loading />
      </Modal>
    );
  }

  if (!data) return null;

  const title = data.name ?? data.title ?? 'Unknown';
  const year = data.first_air_date ? new Date(data.first_air_date).getFullYear() : '';
  const score = typeof data.vote_average === 'number' ? data.vote_average.toFixed(1) : '—';
  const numId = Number(id);
  const favorited = isFavorite(numId);

  const handleFavorite = () => {
    if (favorited) {
      removeFavorite(numId);
    } else {
      addFavorite({ id: numId, title, imageUrl: getImageUrl(data.poster_path), media: 'tv' });
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
            <h2 className="text-2xl font-black text-white">{title}</h2>
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
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            {year && <span>{year}</span>}
            {data.number_of_seasons && (
              <span>
                {data.number_of_seasons} Season{data.number_of_seasons !== 1 ? 's' : ''}
              </span>
            )}
            <span className="flex items-center gap-1 font-bold text-yellow-400">
              <FiStar size={13} /> {score}
            </span>
          </div>

          <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">{data.overview}</p>
        </div>
      </div>
      <div className="px-6 pb-4">
        <LinkGroup
          links={[
            { label: 'Summary', to: `/tv-show/${id}` },
            { label: 'Credits', to: `/tv-show/${id}/credits` },
            { label: 'Trailers', to: `/tv-show/${id}/trailers` },
            { label: 'Reviews', to: `/tv-show/${id}/reviews` },
            { label: 'Seasons', to: `/tv-show/${id}/seasons` },
          ]}
        />
        <Outlet />
      </div>
    </Modal>
  );
};
