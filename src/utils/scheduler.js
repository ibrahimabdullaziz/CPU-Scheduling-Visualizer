export const simulateFCFS = (procs) => {
  procs.sort((a, b) => a.at - b.at);
  let currentTime = 0;
  let ganttData = [];
  let results = [];

  procs.forEach(p => {
    if (currentTime < p.at) {
      ganttData.push({ pid: 'IDLE', start: currentTime, end: p.at, id: -1 });
      currentTime = p.at;
    }
    const start = currentTime;
    const end = start + p.bt;
    ganttData.push({ pid: p.pid, start: start, end: end, id: p.id });
    currentTime = end;
    
    const ct = end;
    const tat = ct - p.at;
    const wt = tat - p.bt;
    results.push({ ...p, ct, tat, wt });
  });

  return { ganttData, results };
};

export const simulateRR = (procs, q) => {
  procs.sort((a, b) => a.at - b.at);
  let currentTime = 0;
  let ganttData = [];
  let resultsMap = new Map();
  let readyQueue = [];
  let remainingProcs = procs.map(p => ({...p, rt: p.bt}));
  let completed = 0;
  let n = procs.length;
  let idx = 0;

  while (idx < n && remainingProcs[idx].at <= currentTime) {
    readyQueue.push(remainingProcs[idx]);
    idx++;
  }

  while (completed < n) {
    if (readyQueue.length === 0) {
      let nextArrival = remainingProcs[idx].at;
      ganttData.push({ pid: 'IDLE', start: currentTime, end: nextArrival, id: -1 });
      currentTime = nextArrival;
      while (idx < n && remainingProcs[idx].at <= currentTime) {
        readyQueue.push(remainingProcs[idx]);
        idx++;
      }
    } else {
      let currentProc = readyQueue.shift();
      let execTime = Math.min(q, currentProc.rt);
      const start = currentTime;
      currentTime += execTime;
      currentProc.rt -= execTime;
      
      ganttData.push({ pid: currentProc.pid, start: start, end: currentTime, id: currentProc.id });

      while (idx < n && remainingProcs[idx].at <= currentTime) {
        readyQueue.push(remainingProcs[idx]);
        idx++;
      }

      if (currentProc.rt > 0) {
        readyQueue.push(currentProc);
      } else {
        completed++;
        const ct = currentTime;
        const tat = ct - currentProc.at;
        const wt = tat - currentProc.bt;
        resultsMap.set(currentProc.pid, { ...currentProc, ct, tat, wt });
      }
    }
  }

  let results = procs.map(p => resultsMap.get(p.pid));
  return { ganttData, results };
};
