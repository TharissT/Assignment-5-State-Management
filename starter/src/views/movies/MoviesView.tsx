import { ButtonGroup } from '@/components/controls/buttons/ButtonGroup';
import { ImageGrid } from '@/components/controls/images/ImageGrid';
import { Pagination } from '@/components/controls/Pagination';
import { Loading, SectionHeader } from '@/components/site/Loading';
import { MOVIE_CATEGORIES, MOVIE_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { calculatePrice, getImageUrl } from '@/core/utils';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviesView = () => {
  const navigate = useNavigate();
  const { category = 'now_playing' } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useTmdb<MoviesResponse>(`${MOVIE_ENDPOINT}/${category}`, { page }, [page, category]);

  const images = (data?.results ?? []).map((r) => ({
    id: r.id,
    imageUrl: getImageUrl(r.poster_path),
    primaryText: r.original_title ?? r.title ?? r.name ?? '',
    secondaryText: calculatePrice(r.release_date) < 19.99 ? `$${calculatePrice(r.release_date).toFixed(2)}` : '$19.99',
    releaseDate: r.release_date,
  }));

  const handleCategoryChange = (val: string) => {
    navigate(`/movies/${val}`);
    setPage(1);
  };

  const label = MOVIE_CATEGORIES.find((c) => c.value === category)?.label ?? category;

  return (
    <section className="mx-auto max-w-7xl space-y-6 px-6 py-8">
      <SectionHeader title={label}>
        <ButtonGroup value={category} options={MOVIE_CATEGORIES} onClick={handleCategoryChange} />
      </SectionHeader>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <ImageGrid images={images} onClick={(img) => navigate(`/movie/${img.id}`)} />
          <Pagination page={page} maxPages={data?.total_pages ?? 1} onClick={setPage} />
        </div>
      )}
    </section>
  );
};
