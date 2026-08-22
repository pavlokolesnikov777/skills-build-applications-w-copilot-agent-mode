import useApiList from '../hooks/useApiList';

// VITE_CODESPACE_NAME must be defined (e.g. in .env.local); falls back to
// localhost so the app never requests https://undefined-8000...
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const USERS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

export default function Users() {
  const { items, loading, error } = useApiList(USERS_API_URL);

  if (loading) return <p>Loading users…</p>;
  if (error) return <p className="text-danger">Error loading users: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {items.map((user) => (
            <tr key={user._id}>
              <td>{user.displayName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
