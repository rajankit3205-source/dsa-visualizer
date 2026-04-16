import { useState, useEffect } from "react";
import {generateArray } from "../utils/generateArray";
import { getBubbleSortAnimations } from "../algorithms/bubbleSort";
import { getMergeSortAnimations } from "../algorithms/mergeSort";

const SortingVisualizer = () => {
  const [array, setArray] =useState([]);
  const [speed, setSpeed] = useState(100);
  const [size, setSize] = useState(30);
  const [isSorting, setIsSorting] = useState(false);

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

  return (
    
    <div className="flex flex-col items-center">
      <div className="flex gap-6 mb-4">


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
          onClick={bubbleSort}
          disabled={isSorting}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          Bubble Sort
        </button>

        <button
          onClick={mergeSort}
          disabled={isSorting}
          className="bg-purple-500 text-white px-4 py-2 rounded mb-4"
        >
          Merge Sort
        </button>

        <button
          onClick={createNewArray}
          className="bg-red-500 text-white px-4 py-2 rounded mb-4 disabled:bg-gray-500"
        >
          Reset Array
        </button>

      </div>

      <div className="text-center mt-4">
        <p>Bubble Sort: O(n²)</p>
        <p>Merge Sort: O(n log n)</p>
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