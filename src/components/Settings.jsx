export default function Settings({ algo, setAlgo, quantum, setQuantum, runSimulation, resetAll }) {
  return (
    <div className="card" style={{ marginBottom: "1.5rem" }}>
      <h2>Settings</h2>
      <div className="form-group">
        <label>Algorithm</label>
        <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
          <option value="FCFS">First-Come, First-Served (FCFS)</option>
          <option value="RR">Round Robin (RR)</option>
        </select>
      </div>
      {algo === 'RR' && (
        <div className="form-group">
          <label>Time Quantum</label>
          <input type="number" min="1" value={quantum} onChange={(e) => setQuantum(Number(e.target.value))} />
        </div>
      )}
      <button className="btn" onClick={runSimulation}>Run Simulation</button>
      <button className="btn btn-danger" onClick={resetAll}>Reset All</button>
    </div>
  );
}
