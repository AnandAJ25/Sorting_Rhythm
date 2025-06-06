
import { ArrayBar, SortingStep } from '../components/SortingVisualizer';

const createStep = (
  array: ArrayBar[],
  comparingIndices?: number[],
  swappingIndices?: number[],
  sortedIndices?: number[],
  pivotIndex?: number
): SortingStep => {
  const newArray = array.map((bar, index) => {
    let status: ArrayBar['status'] = 'default';
    
    if (sortedIndices?.includes(index)) {
      status = 'sorted';
    } else if (pivotIndex === index) {
      status = 'pivot';
    } else if (swappingIndices?.includes(index)) {
      status = 'swapping';
    } else if (comparingIndices?.includes(index)) {
      status = 'comparing';
    }
    
    return { ...bar, status };
  });

  return {
    array: newArray,
    comparingIndices,
    swappingIndices,
    sortedIndices,
    pivotIndex
  };
};

export const bubbleSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push(createStep(arr, [j, j + 1], undefined, sortedIndices));
      
      if (arr[j].value > arr[j + 1].value) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push(createStep(arr, undefined, [j, j + 1], sortedIndices));
      }
    }
    sortedIndices.push(n - 1 - i);
  }
  
  sortedIndices.push(0);
  steps.push(createStep(arr, undefined, undefined, sortedIndices));
  
  return steps;
};

export const selectionSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sortedIndices: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      steps.push(createStep(arr, [minIndex, j], undefined, sortedIndices));
      
      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push(createStep(arr, undefined, [i, minIndex], sortedIndices));
    }
    
    sortedIndices.push(i);
  }
  
  sortedIndices.push(n - 1);
  steps.push(createStep(arr, undefined, undefined, sortedIndices));
  
  return steps;
};

export const insertionSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];
  const n = arr.length;
  const sortedIndices: number[] = [0];

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    steps.push(createStep(arr, [i], undefined, sortedIndices));
    
    while (j >= 0 && arr[j].value > key.value) {
      steps.push(createStep(arr, [j, j + 1], undefined, sortedIndices));
      arr[j + 1] = arr[j];
      steps.push(createStep(arr, undefined, [j, j + 1], sortedIndices));
      j--;
    }
    
    arr[j + 1] = key;
    sortedIndices.push(i);
  }
  
  steps.push(createStep(arr, undefined, undefined, Array.from({ length: n }, (_, i) => i)));
  
  return steps;
};

export const mergeSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];

  const merge = (left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      steps.push(createStep(arr, [left + i, mid + 1 + j]));
      
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      steps.push(createStep(arr, undefined, [k]));
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      steps.push(createStep(arr, undefined, [k]));
      i++;
      k++;
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      steps.push(createStep(arr, undefined, [k]));
      j++;
      k++;
    }
  };

  const mergeSortHelper = (left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      mergeSortHelper(left, mid);
      mergeSortHelper(mid + 1, right);
      merge(left, mid, right);
    }
  };

  mergeSortHelper(0, arr.length - 1);
  steps.push(createStep(arr, undefined, undefined, Array.from({ length: arr.length }, (_, i) => i)));
  
  return steps;
};

export const quickSort = (array: ArrayBar[]): SortingStep[] => {
  const steps: SortingStep[] = [];
  const arr = [...array];

  const partition = (low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    steps.push(createStep(arr, undefined, undefined, undefined, high));
    
    for (let j = low; j < high; j++) {
      steps.push(createStep(arr, [j], undefined, undefined, high));
      
      if (arr[j].value < pivot.value) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push(createStep(arr, undefined, [i, j], undefined, high));
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push(createStep(arr, undefined, [i + 1, high]));
    
    return i + 1;
  };

  const quickSortHelper = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  };

  quickSortHelper(0, arr.length - 1);
  steps.push(createStep(arr, undefined, undefined, Array.from({ length: arr.length }, (_, i) => i)));
  
  return steps;
};
