import { useEffect, useState } from 'react';
import { fetchList } from '../api';

/**
 * Loads a list resource from the API and tracks loading/error state.
 * @param {string} path Full endpoint path, e.g. `/api/activities/`.
 */
export default function useApiList(path) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchList(path)
      .then((data) => {
        if (!cancelled) {
          setItems(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { items, loading, error };
}
