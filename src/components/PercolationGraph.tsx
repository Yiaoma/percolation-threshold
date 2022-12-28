import * as d3 from "d3";
import { timer } from "../utils/timer";
import { Percolation } from "../utils/Percolation";
import { useState } from "preact/hooks";
import { randomIntFromInterval } from "../utils/randomIntFromInterval";
import {
  SIZE,
  STEP,
  TRIALS,
  MARGIN,
  GRID_DIMENSIONS,
  PERCOLATION_THRESHOLD,
} from "../constants/constants";

const PercolationGraph = () => {
  const [data, setData] = useState<number[][]>([]);
  const [running, setRunning] = useState(false);
  const xScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([MARGIN, GRID_DIMENSIONS - MARGIN]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([GRID_DIMENSIONS - MARGIN, MARGIN]);

  const runTrials = async () => {
    setData([]);
    setRunning(true);
    for (let p = 0; p <= 1; p += STEP) {
      let count = 0;

      for (let i = 0; i < TRIALS; i++) {
        const percolation = new Percolation(SIZE);

        while (percolation.numberOfOpenSites() / (SIZE * SIZE) < p) {
          const index = randomIntFromInterval(1, SIZE * SIZE);

          percolation.open(index);
        }

        if (percolation.percolates()) count++;
      }

      setData((prev) => [...prev, [p, count / TRIALS]]);

      await timer(100);
    }

    setRunning(false);
  };

  return (
    <>
      <svg width={GRID_DIMENSIONS} height={GRID_DIMENSIONS}>
        <g transform={`translate(${xScale(PERCOLATION_THRESHOLD)}, 0)`}>
          <line y1={MARGIN} y2={GRID_DIMENSIONS - MARGIN + 5} stroke="gray" />
          <text
            x={0}
            y={GRID_DIMENSIONS - MARGIN + 20}
            style="text-anchor: middle; font-size: .6rem;"
          >
            {PERCOLATION_THRESHOLD}
          </text>
        </g>
        <path
          d={d3
            .line()
            .x((d) => xScale(d[0]))
            .y((d) => yScale(d[1]))
            .curve(d3.curveMonotoneX)(data)}
          stroke="red"
          fill="none"
        />
        <text
          y={GRID_DIMENSIONS - 10}
          x={GRID_DIMENSIONS - MARGIN * 3.5}
          style="font-size: .7rem; font-style: italic"
        >
          site vacancy probability p
        </text>
        <text
          transform={"rotate(-90)"}
          x={-MARGIN * 3.2}
          y={10}
          style="font-size: .7rem; font-style: italic"
        >
          percolation probability
        </text>
        <g>
          <line
            x1={MARGIN}
            y1={GRID_DIMENSIONS - MARGIN}
            x2={MARGIN}
            y2={MARGIN}
            stroke="black"
          ></line>
          {yScale.ticks(2).map((tick) => (
            <g transform={`translate(0, ${yScale(tick)})`}>
              <line x1={MARGIN - 5} x2={MARGIN} stroke="black" />
              <text
                dy=".32em"
                x={MARGIN - 15}
                style="text-anchor: end; font-size: .6rem;"
              >
                {tick}
              </text>
            </g>
          ))}
        </g>
        <g>
          <line
            x1={MARGIN}
            y1={GRID_DIMENSIONS - MARGIN}
            x2={GRID_DIMENSIONS - MARGIN}
            y2={GRID_DIMENSIONS - MARGIN}
            stroke="black"
          />
          {xScale.ticks(2).map((tick) => (
            <g transform={`translate(${xScale(tick)}, 0)`}>
              <line
                y1={GRID_DIMENSIONS - MARGIN}
                y2={GRID_DIMENSIONS - MARGIN + 5}
                stroke="black"
              />
              <text
                y={GRID_DIMENSIONS - MARGIN + 20}
                style="text-anchor: middle; font-size: .6rem;"
              >
                {tick}
              </text>
            </g>
          ))}
        </g>
      </svg>
      <button
        disabled={running}
        onClick={runTrials}
        className="px-6 py-2 my-4 rounded-lg border border-gray-700 disabled:opacity-70 disabled:border-gray-200"
      >
        Run Simulation
      </button>
    </>
  );
};

export default PercolationGraph;
