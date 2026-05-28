import { Loading } from '@/components/site/Loading';
import { TV_ENDPOINT } from '@/core/constants';
import type { SeasonsResponse } from '@/core/types';
import { calculatePrice, getImageUrl } from '@/core/utils';
import { useTmdb, useUserContext } from '@/hooks';
import { FiShoppingCart } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

export const SeasonsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<SeasonsResponse>(`${TV_ENDPOINT}/${id}`, {}, [id]);
  const { addToCart, removeFromCart, isInCart } = useUserContext();

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <div className="space-y-3 py-4">
      {data.seasons.length ? (
        data.seasons.map((season) => {
          const seasonCartId = season.id;
          const inCart = isInCart(seasonCartId);
          const price = calculatePrice(season.air_date);

          const handleCart = () => {
            if (inCart) {
              removeFromCart(seasonCartId);
            } else {
              addToCart({
                id: seasonCartId,
                title: `${data.name} — ${season.name}`,
                imageUrl: getImageUrl(season.poster_path),
                price,
                type: 'tv-season',
                showId: Number(id),
                season: season.season_number,
              });
            }
          };

          return (
            <div
              key={season.id}
              className="flex cursor-pointer gap-4 rounded border border-zinc-800 bg-zinc-900/60 p-3 transition-all hover:border-red-600/40 hover:bg-zinc-800/60"
              onClick={() => navigate(`/tv-show/${id}/seasons/${season.season_number}`)}
            >
              {season.poster_path ? (
                <img src={getImageUrl(season.poster_path)} alt={season.name} className="h-24 w-16 shrink-0 rounded object-cover" />
              ) : (
                <div className="flex h-24 w-16 shrink-0 items-center justify-center rounded bg-zinc-800">
                  <span className="text-xs text-zinc-600">No image</span>
                </div>
              )}
              <div className="flex flex-1 items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-white">{season.name}</p>
                  <p className="text-xs text-zinc-500">{season.episode_count} Episodes</p>
                  {season.overview && <p className="line-clamp-2 text-xs text-zinc-400">{season.overview}</p>}
                  <p className="text-sm font-bold text-red-400">${price.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart();
                  }}
                  title={inCart ? 'Remove from Cart' : 'Add to Cart'}
                  className={`ml-4 shrink-0 cursor-pointer rounded-full p-2 transition-all duration-200 ${
                    inCart ? 'bg-red-600 text-white' : 'bg-zinc-700 text-zinc-400 hover:bg-zinc-600 hover:text-white'
                  }`}
                >
                  <FiShoppingCart size={16} />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="py-10 text-center text-zinc-600">No seasons available.</p>
      )}
    </div>
  );
};
