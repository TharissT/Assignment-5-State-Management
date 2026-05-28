import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Loading } from '@/components/site/Loading';
import { TV_ENDPOINT } from '@/core/constants';
import type { CreditsResponse } from '@/core/types';
import { getImageUrl } from '@/core/utils';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

export const TvCreditsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading } = useTmdb<CreditsResponse>(`${TV_ENDPOINT}/${id}/credits`, {}, [id]);

  if (loading) return <Loading />;
  if (!data) return null;

  const images = data.cast.map((p) => ({
    id: p.id,
    imageUrl: getImageUrl(p.profile_path),
    primaryText: p.name,
    secondaryText: p.character,
  }));

  return (
    <div className="py-4">
      {data.cast.length ? (
        <ImageGrid images={images} onClick={(img) => navigate(`/person/${img.id}`)} />
      ) : (
        <p className="py-10 text-center text-zinc-600">No credits available.</p>
      )}
    </div>
  );
};
