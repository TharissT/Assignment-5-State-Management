import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Loading } from '@/components/site/Loading';
import { PERSON_ENDPOINT } from '@/core/constants';
import type { PersonCreditsResponse } from '@/core/types';
import { getImageUrl } from '@/core/utils';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const CareerView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<PersonCreditsResponse>(`${PERSON_ENDPOINT}/${id}/combined_credits`, {}, [id]);

  if (loading) return <Loading />;
  if (!data) return null;

  const seen = new Set<number>();
  const sorted = [...data.cast]
    .sort((a, b) => {
      const aDate = a.release_date ?? a.first_air_date ?? '';
      const bDate = b.release_date ?? b.first_air_date ?? '';
      return bDate.localeCompare(aDate);
    })
    .filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });

  const images = sorted.map((r) => ({
    id: r.id,
    imageUrl: getImageUrl(r.poster_path),
    primaryText: r.title ?? r.name ?? 'Unknown',
    secondaryText: r.character,
    media: (r.media_type === 'tv' ? 'tv' : 'movie') as 'movie' | 'tv',
  }));

  return (
    <div className="space-y-4">
      <p className="text-xs font-bold tracking-wider text-zinc-600 uppercase">{sorted.length} credits</p>
      {images.length ? (
        <ImageGrid
          images={images}
          onClick={(img) => {
            if (img.media === 'tv') {
              navigate(`/tv-show/${img.id}`);
            } else {
              navigate(`/movie/${img.id}`);
            }
          }}
        />
      ) : (
        <p className="py-10 text-center text-zinc-600">No career credits found.</p>
      )}
    </div>
  );
};
