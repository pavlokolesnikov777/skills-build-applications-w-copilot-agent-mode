// Base origin for the Octofit Tracker API (no trailing path).
// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) to build the
// GitHub Codespaces forwarded-port URL. Falls back to localhost when unset,
// so the app never requests https://undefined-8000...
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

/**
 * Fetch a list resource from the API, handling both plain array responses
 * and paginated responses (e.g. `{ results: [...] }` or `{ data: [...] }`).
 * @param {string} path Full endpoint path, e.g. `/api/activities/`.
 */
export async function fetchList(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }
  if (Array.isArray(payload?.results)) {
    return payload.results;
  }
  if (Array.isArray(payload?.data)) {
    return payload.data;
  }
  return [];
}
