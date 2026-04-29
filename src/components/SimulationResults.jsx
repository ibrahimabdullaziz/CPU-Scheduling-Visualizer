export default function SimulationResults({ simulationData }) {
  if (!simulationData) return null;

  const totalTime = simulationData.ganttData[simulationData.ganttData.length - 1].end;
  
  const sortedResults = [...simulationData.results].sort((a, b) => {
    const aNum = parseInt(a.pid.replace(/[^0-9]/g, '')) || 0;
    const bNum = parseInt(b.pid.replace(/[^0-9]/g, '')) || 0;
    return aNum - bNum;
  });

  const avgTat = (simulationData.results.reduce((acc, curr) => acc + curr.tat, 0) / simulationData.results.length).toFixed(2);
  const avgWt = (simulationData.results.reduce((acc, curr) => acc + curr.wt, 0) / simulationData.results.length).toFixed(2);

  return (
    <div className="card">
      <h2>Simulation Results</h2>
      
      <div className="gantt-container">
        <label>Gantt Chart</label>
        <div className="gantt-chart">
          {simulationData.ganttData.map((block, i) => {
            const width = ((block.end - block.start) / totalTime) * 100;
            return (
              <div 
                key={i}
                className={`gantt-block ${block.pid === 'IDLE' ? 'color-idle' : 'color-' + (block.id % 8)}`}
                style={{
                  width: `${Math.max(width, 5)}%`,
                  flexGrow: block.end - block.start
                }}
              >
                <span>{block.pid}</span>
                {i === 0 && <span className="gantt-time start">{block.start}</span>}
                <span className="gantt-time">{block.end}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ overflowX: "auto", marginTop: "2rem" }}>
        <table>
          <thead>
            <tr>
              <th>PID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map(r => (
              <tr key={r.pid}>
                <td><strong>{r.pid}</strong></td>
                <td>{r.at}</td>
                <td>{r.bt}</td>
                <td>{r.ct}</td>
                <td>{r.tat}</td>
                <td>{r.wt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="metrics">
        <div className="metric-card">
          <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Average Turnaround Time</div>
          <div className="metric-value">{avgTat} ms</div>
        </div>
        <div className="metric-card">
          <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Average Waiting Time</div>
          <div className="metric-value">{avgWt} ms</div>
        </div>
      </div>
    </div>
  );
}
