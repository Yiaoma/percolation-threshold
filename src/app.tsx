import PercolationGrid from "./components/PercolationGrid";
import PercolationGraph from "./components/PercolationGraph";
import { PERCOLATION_THRESHOLD } from "./constants/constants";

const App = () => {
  return (
    <main className="pt-16 pb-12 px-4">
      <article className="prose max-w-7xl mx-auto">
        <h1>
          Estimating the value of the Percolation threshold via Monte Carlo
          simulation
        </h1>
        <h2>Percolation</h2>
        <p>
          Given a composite systems comprised of randomly distributed insulating
          and metallic materials: what fraction of the materials need to be
          metallic so that the composite system is an electrical conductor?
          Given a porous landscape with water on the surface (or oil below),
          under what conditions will the water be able to drain through to the
          bottom (or the oil to gush through to the surface)? Scientists have
          defined an abstract process known as percolation to model such
          situations.
        </p>
        <h2>The model</h2>
        <p>
          A percolation system is modeled using an n-by-n grid of sites. Each
          site is either open or blocked. A full site is an open site that can
          be connected to an open site in the top row via a chain of neighboring
          (left, right, up, down) open sites. The system is said to percolate if
          there is a full site in the bottom row. In other words, a system
          percolates if we fill all open sites connected to the top row and that
          process fills some open site on the bottom row. (For the
          insulating/metallic materials example, the open sites correspond to
          metallic materials, so that a system that percolates has a metallic
          path from top to bottom, with full sites conducting. For the porous
          substance example, the open sites correspond to empty space through
          which water might flow, so that a system that percolates lets water
          fill open sites, flowing from top to bottom.)
        </p>
        <h2>The problem</h2>
        <p>
          In a famous scientific problem, researchers are interested in the
          following question: if sites are independently set to be open with
          probability p (and therefore blocked with probability 1 - p), what is
          the probability that the system percolates? When p equals 0, the
          system does not percolate; when p equals 1, the system percolates.
        </p>
        <p>
          When n is sufficiently large, there is a threshold value p* such that
          when p {"<"} p{"*"} a random n-by-n grid almost never percolates, and
          when p {">"} p*, a random n-by-n grid almost always percolates. No
          mathematical solution for determining the percolation threshold p* has
          yet been derived. We shall estimate p* with Monte Carlo simulation.
        </p>
        <h2>Monte Carlo simulation</h2>
        <p>
          To estimate the percolation threshold, consider the following
          computational experiment:
        </p>
        <ul>
          <li>Initialize all sites to be blocked.</li>
          <li>
            <p>Repeat the following until the system percolates:</p>
            <ul>
              <li>
                Choose a site uniformly at random among all blocked sites.
              </li>
              <li>Open the site.</li>
            </ul>
          </li>
          <li>
            The fraction of sites that are opened when the system percolates
            provides an estimate of the percolation threshold.
          </li>
        </ul>
        <figure>
          <PercolationGrid />
        </figure>
        <p>
          By repeating this computation experiment T times and averaging the
          results, we obtain a more accurate estimate of the percolation
          threshold, p = {PERCOLATION_THRESHOLD}.
        </p>
        <figure>
          <PercolationGraph />
        </figure>
      </article>
    </main>
  );
};

export default App;
