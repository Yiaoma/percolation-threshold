import { useState } from "preact/hooks";

const N = 50;

const App = () => {
  return (
    <section>
      <div
        style={{
          gridTemplateColumns: `repeat(${N}, 1fr)`,
          gridTemplateRows: `repeat(${N}, 1fr)`,
        }}
        className="w-[500px] h-[500px] grid border border-gray-700"
      ></div>
    </section>
  );
};

export default App;
