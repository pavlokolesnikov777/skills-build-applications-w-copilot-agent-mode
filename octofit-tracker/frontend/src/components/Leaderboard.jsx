import useApiList from '../hooks/useApiList';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local); falls back to
// localhost so the app never requests https://undefined-8000...
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const LEADERBOARD_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function displayUser(user) {
  if (!user) return '—';
  if (typeof user === 'string') return user;
  return user.displayName ?? user.username ?? user.email ?? '—';
}

export default function Leaderboard() {
  const { items, loading, error } = useApiList(LEADERBOARD_API_URL);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>;

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {items.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.rank}</td>
              <td>{displayUser(entry.userId)}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
