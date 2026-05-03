export default function ProcessTable({ processes, removeProcess }) {
  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h2>Process Table</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Burst Time</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => (
              <tr key={p.pid}>
                <td>
                  <strong>{p.pid}</strong>
                </td>
                <td>{p.bt}</td>
                <td>{p.at}</td>
                <td>
                  <button
                    className="btn btn-danger btn-small"
                    onClick={() => removeProcess(p.pid)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
