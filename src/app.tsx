import { Percolation } from "./utils/Percolation";
import { useState, useRef, useEffect } from "preact/hooks";
import { randomIntFromInterval } from "./utils/randomIntFromInterval";
import { timer } from "./utils/timer";

const N = 50;
const CANVAS_DIMENSION = 900;
const SITE_DIMENSION = CANVAS_DIMENSION / N;

const App = () => {
  const [percolation, setPercolation] = useState(new Percolation(N));
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    canvasRef.current!.width = CANVAS_DIMENSION;
    canvasRef.current!.height = CANVAS_DIMENSION;

    const context = canvasRef.current!.getContext("2d");

    draw(context!, percolation);
  }, []);

  const draw = (
    context: CanvasRenderingContext2D,
    percolation: Percolation
  ) => {
    for (let i = 1, x = 0, y = 0; i < N * N + 1; i++, x += SITE_DIMENSION) {
      if (x >= CANVAS_DIMENSION) {
        x = 0;
        y += SITE_DIMENSION;
      }
      if (percolation.isFull(i)) {
        context.fillStyle = "#00FFFF";
      } else if (percolation.isOpen(i)) {
        context.fillStyle = "white";
      } else {
        context.fillStyle = "black";
      }
      context.fillRect(x, y, SITE_DIMENSION, SITE_DIMENSION);
    }
  };

  const percolate = async () => {
    setPercolation(new Percolation(N));

    const context = canvasRef.current!.getContext("2d");

    while (!percolation.percolates()) {
      const index = randomIntFromInterval(1, N * N);

      if (percolation.isOpen(index)) continue;

      percolation.open(index);

      draw(context!, percolation);

      await timer(10);
    }

    console.log(percolation.numberOfOpenSites() / (N * N));
  };

  return (
    <section>
      <canvas className="border border-gray-700" ref={canvasRef}></canvas>
      <button onClick={percolate} className="px-6 py-2 border rounded-lg">
        Percolate
      </button>
    </section>
  );
};

export default App;
