import useApiList from '../hooks/useApiList';

export default function Users() {
  const { items, loading, error } = useApiList('/api/users/');

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
