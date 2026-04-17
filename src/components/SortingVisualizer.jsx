import { useState, useEffect } from "react";
import {generateArray } from "../utils/generateArray";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";
import { getQuickSortAnimations } from "../algorithms/quickSort";

const SortingVisualizer = () => {
  const [array, setArray] =useState([]);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(30);
  const [isSorting, setIsSorting] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubble");

  useEffect(()=> {
    createNewArray();
  },[]);

  useEffect(()=> {
    createNewArray();
  },[size]);

  const createNewArray =() =>{
    const newArray = generateArray(size);
    setArray(newArray);
  };

  const bubbleSort = () => {
    setIsSorting(true);
    const animations = getBubbleSortAnimations(array);
    const newArray = [...array];

    animations.forEach((animation, i) => {
      setTimeout(() => {
        const bars = document.getElementsByClassName("bar");

        const [a, b] = animation.indices;

        if (animation.type === "compare") {
          bars[a].style.backgroundColor = "red";
          bars[b].style.backgroundColor = "red";

          setTimeout(() => {
            bars[a].style.backgroundColor = "teal";
            bars[b].style.backgroundColor = "teal";
          }, 100);
        }

        if (animation.type === "swap") {
          let temp = newArray[a];
          newArray[a] = newArray[b];
          newArray[b] = temp;

          setArray([...newArray]);
        }
      }, i * speed);
    });

    setTimeout(() => {
      setIsSorting(false);
    }, animations.length * speed);
  };

  const mergeSort = () => {
    setIsSorting(true);
    const animations = getMergeSortAnimations(array);
    const newArray = [...array];

    animations.forEach((animation, i) => {
      setTimeout(() => {
        const bars = document.getElementsByClassName("bar");

        if (animation.type === "compare") {
          const [a, b] = animation.indices;
          bars[a].style.backgroundColor = "purple";
          bars[b].style.backgroundColor = "purple";

          setTimeout(() => {
            bars[a].style.backgroundColor = "teal";
            bars[b].style.backgroundColor = "teal";
          }, speed);
        }

        if (animation.type === "overwrite") {
          const { index, value } = animation;
          bars[index].style.height = `${value}px`;
        }
      }, i * speed);
    });

    setTimeout(() => {
      setIsSorting(false);
    }, animations.length * speed);
  };

  const quickSort = () => {
    setIsSorting(true);

    const animations = getQuickSortAnimations(array);
    const newArray = [...array];

    animations.forEach((animation, i) => {
      setTimeout(() => {
        const bars = document.getElementsByClassName("bar");

        const [a, b] = animation.indices;

        if (animation.type === "compare") {
          bars[a].style.backgroundColor = "yellow";
          bars[b].style.backgroundColor = "yellow";

          setTimeout(() => {
            bars[a].style.backgroundColor = "teal";
            bars[b].style.backgroundColor = "teal";
          }, speed);
        }

        if (animation.type === "swap") {
          let temp = newArray[a];
          newArray[a] = newArray[b];
          newArray[b] = temp;

          setArray([...newArray]);
        }

      }, i * speed);
    });

    setTimeout(() => {
      setIsSorting(false);
    }, animations.length * speed);
  };

  const algorithmInfo = {
    bubble: {
      name: "Bubble Sort",
      time: "O(n²)",
      space: "O(1)",
      stable: "Yes",
      description: "Repeatedly compares adjacent elements and swaps them if they are in wrong order.",
    },
    merge: {
      name: "Merge Sort",
      time: "O(n log n)",
      space: "O(n)",
      stable: "Yes",
      description: "Divides the array into halves, sorts them recursively, and merges them.",
    },
    quick: {
      name: "Quick Sort",
      time: "O(n log n)",
      space: "O(log n)",
      stable: "No",
      description: "Selects a pivot and partitions the array around it.",
    },
  };

  const handleSort = () => {
    if (algorithm === "bubble") {
      bubbleSort();
    } else if (algorithm === "merge") {
      mergeSort();
    } else if (algorithm === "quick") {
      quickSort();
    }
  };


  return (
    
    <div className="flex flex-col items-center">
      <div className="flex gap-6 mb-4">

        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          className="px-3 py-2 rounded text-white bg-gray-700"
        >
          <option value="bubble">Bubble Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
        </select>

        <div className="flex flex-col items-center">
          <label>Array Size</label>
          <input
            type="range"
            min="10"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
        
        <div className="flex flex-col items-center">
          <label>Speed</label>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button 
          onClick ={createNewArray}
          disabled={isSorting}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Generate New Array
        </button>

        <button
          onClick={handleSort}
          disabled={isSorting}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Run Algorithm
        </button>


        <button
          onClick={createNewArray}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4 disabled:bg-gray-500"
        >
          Reset Array
        </button>

      </div>

      <div className="bg-gray-800 p-4 rounded mt-4 w-[400px] text-center">
        <h2 className="text-xl font-bold">
          {algorithmInfo[algorithm].name}
        </h2>

        <p className="mt-2">
          Time Complexity: {algorithmInfo[algorithm].time}
        </p>

        <p className="mt-2 text-sm text-gray-300">
          {algorithmInfo[algorithm].description}
        </p>

        <p className="mt-2">
          Space Complexity: {algorithmInfo[algorithm].space}
        </p>

        <p className="mt-2">
          Stable: {algorithmInfo[algorithm].stable}
        </p>
      </div>

      <div className="flex items-end h-[400px] gap-[2px]">
        {array.map((value, index) => (
          <div
            key = {index}
            className=" bar bg-teal-400 w-[10px]"
            style={{height: `${value}px`}}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;