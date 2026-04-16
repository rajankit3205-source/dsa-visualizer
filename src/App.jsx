import SortingVisualizer from "./components/SortingVisualizer";
function App() {
  return(
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">
        DSA Visualizer
      </h1>
      <SortingVisualizer />
    </div>
  );
}

export default App;