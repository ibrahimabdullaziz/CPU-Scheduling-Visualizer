# CPU Scheduling Visualizer

---

### Overview

A high-performance, interactive web application built with **React** and **Vite** to simulate and visualize various CPU scheduling algorithms. This tool is designed to help students and developers understand how operating systems manage process execution through real-time Gantt charts and performance metrics.

---

## Key Features

- **Interactive Simulations**: Visualize algorithms like **First-Come, First-Served (FCFS)** and **Round Robin (RR)**.
- **Real-time Gantt Chart**: A dynamic, color-coded timeline showing exactly how processes are interleaved.
- **Detailed Metrics**: Automatic calculation of:
  - Completion Time (CT)
  - Turnaround Time (TAT)
  - Waiting Time (WT)
  - Average TAT and Average WT
- **Dynamic Input**: Add, remove, and configure processes with unique IDs, arrival times, and burst times.
- **Modular Architecture**: Built with a clean, component-based structure for scalability and readability.
- **Premium UI**: Sleek, modern design with custom CSS, dark mode support, and responsive layouts.

---

## Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ibrahimabdullaziz/CPU-Scheduling-Visualizer.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd CPU-Scheduling-Visualizer
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

---

## Project Structure

```text
src/
├── components/       # Reusable UI components
│   ├── Header.jsx
│   ├── Settings.jsx
│   ├── AddProcess.jsx
│   ├── ProcessTable.jsx
│   └── SimulationResults.jsx
├── utils/            # Core scheduling logic
│   └── scheduler.js
├── App.jsx           # Main application entry point
└── index.css         # Global styles & design system
```

---

## License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/ibrahimabdullaziz">Ibrahim Abdullaziz</a></sub>
</div>
