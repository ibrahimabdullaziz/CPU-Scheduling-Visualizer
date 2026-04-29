import { useState } from 'react';
import './index.css';
import Header from './components/Header';
import Settings from './components/Settings';
import AddProcess from './components/AddProcess';
import ProcessTable from './components/ProcessTable';
import SimulationResults from './components/SimulationResults';
import { simulateFCFS, simulateRR } from './utils/scheduler';

function App() {
  const [processes, setProcesses] = useState([]);
  const [processCounter, setProcessCounter] = useState(1);
  const [algo, setAlgo] = useState('FCFS');
  const [quantum, setQuantum] = useState(2);
  const [pid, setPid] = useState('P1');
  const [at, setAt] = useState(0);
  const [bt, setBt] = useState(1);
  const [simulationData, setSimulationData] = useState(null);

  const handleAddProcess = () => {
    const trimmedPid = pid.trim();
    if (!trimmedPid) {
      alert("Please enter a Process ID.");
      return;
    }
    if (isNaN(at) || at < 0) {
      alert("Arrival Time must be a non-negative number.");
      return;
    }
    if (isNaN(bt) || bt <= 0) {
      alert("Burst Time must be a positive number.");
      return;
    }
    if (processes.some(p => p.pid === trimmedPid)) {
      alert("Process ID already exists. Please use a unique ID.");
      return;
    }

    setProcesses([...processes, {
      id: processCounter,
      pid: trimmedPid,
      at: Number(at),
      bt: Number(bt)
    }]);
    
    setProcessCounter(prev => prev + 1);

    const match = trimmedPid.match(/^P(\d+)$/i);
    if (match) {
      setPid('P' + (parseInt(match[1]) + 1));
    } else {
      setPid('');
    }
    setAt(Math.max(at, 0));
  };

  const removeProcess = (idToRemove) => {
    setProcesses(processes.filter(p => p.pid !== idToRemove));
    if (processes.length === 1) {
      setSimulationData(null);
    }
  };

  const resetAll = () => {
    setProcesses([]);
    setProcessCounter(1);
    setPid('P1');
    setAt(0);
    setBt(1);
    setSimulationData(null);
  };

  const runSimulation = () => {
    if (processes.length === 0) {
      alert("Please add at least one process to run the simulation.");
      return;
    }

    const procs = processes.map(p => ({...p}));
    let data;

    if (algo === 'FCFS') {
      data = simulateFCFS(procs);
    } else if (algo === 'RR') {
      if (isNaN(quantum) || quantum <= 0) {
        alert("Please enter a valid positive Time Quantum.");
        return;
      }
      data = simulateRR(procs, quantum);
    }

    setSimulationData(data);
  };

  return (
    <div className="container">
      <Header />

      <div className="grid">
        <div className="controls">
          <Settings 
            algo={algo} setAlgo={setAlgo}
            quantum={quantum} setQuantum={setQuantum}
            runSimulation={runSimulation}
            resetAll={resetAll}
          />

          <AddProcess 
            pid={pid} setPid={setPid}
            at={at} setAt={setAt}
            bt={bt} setBt={setBt}
            handleAddProcess={handleAddProcess}
          />
        </div>

        <div className="results">
          <ProcessTable 
            processes={processes}
            removeProcess={removeProcess}
          />

          <SimulationResults 
            simulationData={simulationData}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
