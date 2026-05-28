import { ButtonGroup } from '@/components/controls/buttons/ButtonGroup';
import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Pagination } from '@/components/controls/Pagination';
import { Loading, SectionHeader } from '@/components/site/Loading';
import { TV_CATEGORIES, TV_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { getImageUrl } from '@/core/utils';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const TelevisionView = () => {
  const navigate = useNavigate();
  const { category = 'airing_today' } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useTmdb<MoviesResponse>(`${TV_ENDPOINT}/${category}`, { page }, [page, category]);

  const images = (data?.results ?? []).map((r) => ({
    id: r.id,
    imageUrl: getImageUrl(r.poster_path),
    primaryText: r.name ?? r.original_title ?? r.title ?? '',
    media: 'tv' as const,
  }));

  const handleCategoryChange = (val: string) => {
    navigate(`/tv/${val}`);
    setPage(1);
  };

  const label = TV_CATEGORIES.find((c) => c.value === category)?.label ?? category;

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={label}>
        <ButtonGroup value={category} options={TV_CATEGORIES} onClick={handleCategoryChange} />
      </SectionHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ImageGrid images={images} onClick={(img) => navigate(`/tv-show/${img.id}`)} />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  );
};
