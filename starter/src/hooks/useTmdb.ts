import axios from 'axios';
import { useEffect, useState } from 'react';

export const useTmdb = <T>(url: string, params: Record<string, unknown> = {}, deps: unknown[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    axios
      .get<T>(url, {
        params: { api_key: import.meta.env.VITE_TMDB_API_KEY, ...params },
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err: unknown) => {
        if (axios.isCancel(err)) return;
        setError(err instanceof Error ? err.message : 'An error occurred');
      })
      .finally(() => {
        setLoading(false);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...deps]);

  return { data, loading, error };
};
