import { useState } from "react";
import SortingVisualizer from "./components/SortingVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">

      {view === "home" && (
        <div className="text-center">

          <h1 className="text-6xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            DSA Visualizer
          </h1>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => setView("sorting")}
              className="bg-blue-500 px-6 py-3 rounded text-xl"
            >
              Sorting
            </button>

            <button
              onClick={() => setView("pathfinding")}
              className="bg-purple-500 px-6 py-3 rounded text-xl"
            >
              Pathfinding
            </button>
          </div>

        </div>
      )}

      {view === "sorting" && (
        <div className="w-full">

          <button
            onClick={() => setView("home")}
            className="bg-gray-700 px-4 py-2 m-4 rounded"
          >
            ← Back
          </button>

          <SortingVisualizer />
        </div>
      )}

      {view === "pathfinding" && (
        <div className="w-full">

          <button
            onClick={() => setView("home")}
            className="bg-gray-700 px-4 py-2 m-4 rounded"
          >
            ← Back
          </button>

          <PathfindingVisualizer />
        </div>
      )}

    </div>
  );
}

export default App;