import { useEffect, useState } from 'react';
import { fetchList } from '../api';

/**
 * Loads a list resource from the API and tracks loading/error state.
 * @param {string} url Full absolute endpoint URL, e.g.
 *   `https://<codespace>-8000.app.github.dev/api/activities/`.
 */
export default function useApiList(url) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchList(url)
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
  }, [url]);

  return { items, loading, error };
}
