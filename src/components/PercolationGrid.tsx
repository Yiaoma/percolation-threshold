import { timer } from "../utils/timer";
import { Percolation } from "../utils/Percolation";
import { useRef, useEffect, useState } from "preact/hooks";
import { randomIntFromInterval } from "../utils/randomIntFromInterval";
import { SIZE, SITE_DIMENSIONS, GRID_DIMENSIONS } from "../constants/constants";

const PercolationGrid = () => {
  const [running, setRunning] = useState(false);
  const [numberOfOpenSites, setNumberOfOpenSites] = useState(0);
  const [percolationThreshold, setPercolationThreshold] = useState(0);
  const [percolation, setPercolation] = useState(new Percolation(SIZE));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasRef.current!.width = GRID_DIMENSIONS;
    canvasRef.current!.height = GRID_DIMENSIONS;

    draw();
  }, []);

  const draw = () => {
    const context = canvasRef.current!.getContext("2d")!;

    for (let i = 1, x = 0, y = 0; i <= SIZE * SIZE; i++, x += SITE_DIMENSIONS) {
      if (x >= GRID_DIMENSIONS) {
        x = 0;
        y += SITE_DIMENSIONS;
      }
      if (percolation.isFull(i)) {
        context.fillStyle = "#00FFFF";
      } else if (percolation.isOpen(i)) {
        context.fillStyle = "#FFFFFF";
      } else {
        context.fillStyle = "#000000";
      }
      context.fillRect(x, y, SITE_DIMENSIONS, SITE_DIMENSIONS);
    }
  };

  const runSimulation = async () => {
    setPercolation(new Percolation(SIZE));
    setRunning(true);

    while (!percolation.percolates()) {
      const index = randomIntFromInterval(1, SIZE * SIZE);

      percolation.open(index);

      await timer(50);

      draw();

      setPercolationThreshold(percolation.numberOfOpenSites() / (SIZE * SIZE));
      setNumberOfOpenSites(percolation.numberOfOpenSites());
    }

    setRunning(false);
  };

  return (
    <>
      <p>
        For example, if sites are opened in a {SIZE}-by-{SIZE} lattice according
        to the snapshots below, then our estimate of the percolation threshold
        is {numberOfOpenSites}/{SIZE * SIZE} = {percolationThreshold}
      </p>
      <canvas ref={canvasRef} className="border border-gray-700"></canvas>
      <button
        disabled={running}
        onClick={runSimulation}
        className="px-6 py-2 my-4 rounded-lg border border-gray-700 disabled:opacity-70 disabled:border-gray-200"
      >
        Run Simulation
      </button>
    </>
  );
};

export default PercolationGrid;
