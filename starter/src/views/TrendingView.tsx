import { ButtonGroup } from '@/components/controls/buttons/ButtonGroup';
import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Pagination } from '@/components/controls/Pagination';
import { Loading, SectionHeader } from '@/components/site/Loading';
import { TRENDING_ENDPOINT } from '@/core/constants';
import type { TrendingResponse } from '@/core/types';
import { getImageUrl } from '@/core/utils';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const MEDIA_TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
];

const INTERVALS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
];

export const TrendingView = () => {
  const navigate = useNavigate();
  const { mediaType = 'movie' } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') ?? 'day';
  const [page, setPage] = useState(1);

  const { data, loading } = useTmdb<TrendingResponse>(`${TRENDING_ENDPOINT}/${mediaType}/${interval}`, { page }, [
    mediaType,
    interval,
    page,
  ]);

  const images = (data?.results ?? []).map((r) => ({
    id: r.id,
    imageUrl: getImageUrl(r.poster_path),
    primaryText: r.title ?? r.name ?? r.original_title ?? '',
    media: (r.media_type === 'tv' ? 'tv' : 'movie') as 'movie' | 'tv',
    releaseDate: r.release_date ?? r.first_air_date,
  }));

  const handleMediaChange = (val: string) => {
    navigate(`/trending/${val}?interval=${interval}`);
    setPage(1);
  };

  const handleIntervalChange = (val: string) => {
    setSearchParams({ interval: val });
    setPage(1);
  };

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title="Trending">
        <div className="flex items-center gap-3">
          <ButtonGroup value={mediaType} options={MEDIA_TYPES} onClick={handleMediaChange} />
          <ButtonGroup value={interval} options={INTERVALS} onClick={handleIntervalChange} />
        </div>
      </SectionHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
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
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  );
};
