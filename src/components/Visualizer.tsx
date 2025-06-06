
import React from 'react';
import { ArrayBar } from './SortingVisualizer';

interface VisualizerProps {
  array: ArrayBar[];
}

const Visualizer: React.FC<VisualizerProps> = ({ array }) => {
  const getBarColor = (status: ArrayBar['status']) => {
    switch (status) {
      case 'comparing':
        return 'bg-yellow-500 shadow-yellow-500/50';
      case 'swapping':
        return 'bg-red-500 shadow-red-500/50';
      case 'sorted':
        return 'bg-green-500 shadow-green-500/50';
      case 'pivot':
        return 'bg-purple-500 shadow-purple-500/50';
      default:
        return 'bg-blue-500 shadow-blue-500/30';
    }
  };

  const maxValue = Math.max(...array.map(bar => bar.value));
  const containerHeight = 400;

  return (
    <div className="w-full h-[400px] bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 shadow-2xl">
      <div className="w-full h-full flex items-end justify-center gap-1 overflow-hidden">
        {array.map((bar, index) => {
          const height = (bar.value / maxValue) * (containerHeight - 32);
          const width = Math.max(2, Math.min(20, (100 - array.length) / 2 + 8));
          
          return (
            <div
              key={`${bar.id}-${index}`}
              className={`transition-all duration-200 ease-in-out rounded-t-sm shadow-lg ${getBarColor(bar.status)}`}
              style={{
                height: `${height}px`,
                width: `${width}px`,
                minWidth: '2px'
              }}
              title={`Value: ${bar.value}`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;
