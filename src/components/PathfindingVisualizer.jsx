import { useState, useEffect } from "react";
import {bfs} from "../algorithms/bfs";

const NUM_ROWS = 20;
const NUM_COLS = 40;

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [mode, setMode] = useState("wall"); 


  useEffect(() => {
    createGrid();
  }, []);

  const createGrid = () => {
    const newGrid = [];

    for (let row = 0; row < NUM_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < NUM_COLS; col++) {
        currentRow.push({
          row,
          col,
          isWall: false,
          isStart: row === 10 && col === 5,
          isEnd: row === 10 && col === 30,
          isVisited: false,
          distance: Infinity,
          previousNode: null,
          isPath: false,
        });
      }
      newGrid.push(currentRow);
    }

    setGrid(newGrid);
  };

  const handleClick = (row, col) => {
    const newGrid = grid.slice();

    if (mode === "wall") {
      newGrid[row][col].isWall = !newGrid[row][col].isWall;
    }

    if (mode === "start") {
      newGrid.forEach(r => r.forEach(n => n.isStart = false));
      newGrid[row][col].isStart = true;
    }

    if (mode === "end") {
      newGrid.forEach(r => r.forEach(n => n.isEnd = false));
      newGrid[row][col].isEnd = true;
    }

    setGrid(newGrid);
  };

  const visualizeBFS = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        previousNode: null,
        isPath: false,
      }))
    );

    let startNode, endNode;

    newGrid.forEach(row => {
      row.forEach(node => {
        if (node.isStart) startNode = node;
        if (node.isEnd) endNode = node;
      });
    });

    const visitedNodes = bfs(newGrid, startNode, endNode);
    const pathNodes = getShortestPath(endNode);

    animate(newGrid, visitedNodes, pathNodes);
  };

  const getShortestPath = (endNode) => {
    const path = [];
    let current = endNode;

    while (current !== null) {
      path.unshift(current);
      current = current.previousNode;
    }

    return path;
  };

  const animate = (newGrid, visitedNodes, pathNodes) => {
    visitedNodes.forEach((node, i) => {
      setTimeout(() => {
        setGrid(prevGrid => {
          const updatedGrid = prevGrid.map(row =>
            row.map(n => ({ ...n }))
          );

          const current = updatedGrid[node.row][node.col];

          if (!current.isStart && !current.isEnd) {
            current.isVisited = true;
          }

          return updatedGrid;
        });
      }, i * 20); 
    });

    setTimeout(() => {
      animatePath(newGrid, pathNodes);
    }, visitedNodes.length * 20);
  };

  const animatePath = (newGrid, pathNodes) => {
    pathNodes.forEach((node, i) => {
      setTimeout(() => {
        setGrid(prevGrid => {
          const updatedGrid = prevGrid.map(row =>
            row.map(n => ({ ...n }))
          );

          const current = updatedGrid[node.row][node.col];

          if (!current.isStart && !current.isEnd) {
            current.isVisited = false;
            current.isPath = true;
          }

          return updatedGrid;
        });
      }, i * 50);
    });
  };

  const resetGrid = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        previousNode: null,
        isWall: false,
        isPath: false,
      }))
    );
    setGrid(newGrid);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <button
        onClick={visualizeBFS}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Visualize BFS
      </button>

      <button
        onClick={resetGrid}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Reset Grid
      </button>

      <div className="flex gap-4 mb-4">
        <button onClick={() => setMode("wall")} className="bg-gray-500 px-3 py-2 rounded">
          Wall Mode
        </button>
        <button onClick={() => setMode("start")} className="bg-green-500 px-3 py-2 rounded">
          Set Start
        </button>
        <button onClick={() => setMode("end")} className="bg-red-500 px-3 py-2 rounded">
          Set End
        </button>
      </div>
      
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((node, nodeIdx) => (
            <div
              id={`node-${node.row}-${node.col}`}
              key={nodeIdx}
              onClick={() => handleClick(node.row, node.col)}
              className={`w-6 h-6 border border-gray-700
                ${node.isStart ? "bg-green-500" : ""}
                ${node.isEnd ? "bg-red-500" : ""}
                ${node.isWall ? "bg-black" : ""}
                ${node.isPath ? "bg-yellow-400" : ""}
                ${node.isVisited ? "bg-blue-400" : ""}
              `}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PathfindingVisualizer;