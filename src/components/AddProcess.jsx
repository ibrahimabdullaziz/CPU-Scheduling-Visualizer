export default function AddProcess({ pid, setPid, at, setAt, bt, setBt, handleAddProcess }) {
  return (
    <div className="card">
      <h2>Add Process</h2>
      <div className="form-group">
        <label>Process ID</label>
        <input type="text" placeholder="e.g. P1" value={pid} onChange={(e) => setPid(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Arrival Time</label>
        <input type="number" min="0" value={at} onChange={(e) => setAt(Number(e.target.value))} />
      </div>
      <div className="form-group">
        <label>Burst Time</label>
        <input type="number" min="1" value={bt} onChange={(e) => setBt(Number(e.target.value))} />
      </div>
      <button className="btn" onClick={handleAddProcess} style={{ background: "var(--success-color)" }}>Add Process</button>
    </div>
  );
}
