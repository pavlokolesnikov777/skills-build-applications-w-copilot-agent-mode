import useApiList from '../hooks/useApiList';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local); falls back to
// localhost so the app never requests https://undefined-8000...
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const TEAMS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function memberNames(members) {
  if (!Array.isArray(members) || members.length === 0) return '—';
  return members
    .map((member) => (typeof member === 'string' ? member : member.displayName ?? member.username ?? member.email))
    .join(', ');
}

export default function Teams() {
  const { items, loading, error } = useApiList(TEAMS_API_URL);

  if (loading) return <p>Loading teams…</p>;
  if (error) return <p className="text-danger">Error loading teams: {error}</p>;

  return (
    <div>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mascot</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {items.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.mascot}</td>
              <td>{memberNames(team.members)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
