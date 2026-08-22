import useApiList from '../hooks/useApiList';

export default function Workouts() {
  const { items, loading, error } = useApiList('workouts');

  if (loading) return <p>Loading workouts…</p>;
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>;

  return (
    <div>
      <h1>Workouts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
            <th>Target Muscle Groups</th>
          </tr>
        </thead>
        <tbody>
          {items.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
              <td>{Array.isArray(workout.targetMuscleGroups) ? workout.targetMuscleGroups.join(', ') : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
