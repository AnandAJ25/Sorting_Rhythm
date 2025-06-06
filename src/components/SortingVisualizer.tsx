import React, { useState, useEffect, useCallback, useRef } from 'react';
import ControlPanel from './ControlPanel';
import Visualizer from './Visualizer';
import { 
  bubbleSort, 
  selectionSort, 
  insertionSort, 
  mergeSort, 
  quickSort 
} from '../utils/sortingAlgorithms';
import { PlayCircle, PauseCircle, RotateCcw } from 'lucide-react';

export interface ArrayBar {
  value: number;
  id: number;
  status: 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot';
}

export interface SortingStep {
  array: ArrayBar[];
  comparingIndices?: number[];
  swappingIndices?: number[];
  sortedIndices?: number[];
  pivotIndex?: number;
}

const SortingVisualizer = () => {
  const [array, setArray] = useState<ArrayBar[]>([]);
  const [arraySize, setArraySize] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [sortingSteps, setSortingSteps] = useState<SortingStep[]>([]);
  const animationRef = useRef<boolean>(false);

  const algorithms = {
    bubbleSort: { name: 'Bubble Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
    selectionSort: { name: 'Selection Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
    insertionSort: { name: 'Insertion Sort', timeComplexity: 'O(n²)', spaceComplexity: 'O(1)' },
    mergeSort: { name: 'Merge Sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(n)' },
    quickSort: { name: 'Quick Sort', timeComplexity: 'O(n log n)', spaceComplexity: 'O(log n)' }
  };

  const generateNewArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, (_, index) => ({
      value: Math.floor(Math.random() * 400) + 10,
      id: index,
      status: 'default' as const
    }));
    setArray(newArray);
    setCurrentStep(0);
    setSortingSteps([]);
  }, [arraySize]);

  useEffect(() => {
    generateNewArray();
  }, [generateNewArray]);

  const startSorting = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    animationRef.current = true;
    let steps: SortingStep[] = [];

    switch (selectedAlgorithm) {
      case 'bubbleSort':
        steps = bubbleSort([...array]);
        break;
      case 'selectionSort':
        steps = selectionSort([...array]);
        break;
      case 'insertionSort':
        steps = insertionSort([...array]);
        break;
      case 'mergeSort':
        steps = mergeSort([...array]);
        break;
      case 'quickSort':
        steps = quickSort([...array]);
        break;
    }

    setSortingSteps(steps);
    
    for (let i = 0; i < steps.length; i++) {
      if (!animationRef.current) break;
      
      setArray(steps[i].array);
      setCurrentStep(i);
      
      await new Promise(resolve => setTimeout(resolve, 101 - animationSpeed));
    }
    
    setIsAnimating(false);
    animationRef.current = false;
  };

  const resetArray = () => {
    setIsAnimating(false);
    animationRef.current = false;
    generateNewArray();
  };

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        {/* <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4">
          Sorting Visualizer
        </h1> */}
        <h1 className="text-4xl custom-lg-text-6xl font-bold text-cyan-400 ...  ">Sorting Visualizer</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Watch sorting algorithms come to life with beautiful visualizations
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Control Panel */}
        <div className="xl:col-span-1">
          <ControlPanel
            arraySize={arraySize}
            setArraySize={setArraySize}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            animationSpeed={animationSpeed}
            setAnimationSpeed={setAnimationSpeed}
            algorithms={algorithms}
            onGenerateArray={generateNewArray}
            isAnimating={isAnimating}
          />
          
          {/* Control Buttons */}
          <div className="mt-6 space-y-4">
            <button
              onClick={startSorting}
              disabled={isAnimating}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isAnimating ? <PauseCircle size={20} /> : <PlayCircle size={20} />}
              {isAnimating ? 'Sorting...' : 'Start Sorting'}
            </button>
            
            <button
              onClick={resetArray}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              <RotateCcw size={20} />
              Reset Array
            </button>
          </div>
        </div>

        {/* Visualizer */}
        <div className="xl:col-span-3">
          <Visualizer array={array} />
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
