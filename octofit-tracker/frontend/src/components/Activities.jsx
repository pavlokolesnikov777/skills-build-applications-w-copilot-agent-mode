import useApiList from '../hooks/useApiList';

function displayUser(user) {
  if (!user) return '—';
  if (typeof user === 'string') return user;
  return user.displayName ?? user.username ?? user.email ?? '—';
}

export default function Activities() {
  const { items, loading, error } = useApiList('activities');

  if (loading) return <p>Loading activities…</p>;
  if (error) return <p className="text-danger">Error loading activities: {error}</p>;

  return (
    <div>
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((activity) => (
            <tr key={activity._id}>
              <td>{displayUser(activity.userId)}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.caloriesBurned}</td>
              <td>{activity.activityDate ? new Date(activity.activityDate).toLocaleDateString() : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
