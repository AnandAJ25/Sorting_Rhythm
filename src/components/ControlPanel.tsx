
import React from 'react';
import { Card } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Shuffle, BarChart3, Clock, HardDrive } from 'lucide-react';

interface ControlPanelProps {
  arraySize: number;
  setArraySize: (size: number) => void;
  selectedAlgorithm: string;
  setSelectedAlgorithm: (algorithm: string) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  algorithms: Record<string, { name: string; timeComplexity: string; spaceComplexity: string }>;
  onGenerateArray: () => void;
  isAnimating: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  arraySize,
  setArraySize,
  selectedAlgorithm,
  setSelectedAlgorithm,
  animationSpeed,
  setAnimationSpeed,
  algorithms,
  onGenerateArray,
  isAnimating
}) => {
  const currentAlgorithm = algorithms[selectedAlgorithm];

  return (
    <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Controls</h2>
          <div className="h-1 w-16 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Algorithm Selection */}
        <div className="space-y-3">
          <Label className="text-white font-semibold flex items-center gap-2">
            <BarChart3 size={18} className="text-purple-400" />
            Sorting Algorithm
          </Label>
          <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm} disabled={isAnimating}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {Object.entries(algorithms).map(([key, algorithm]) => (
                <SelectItem key={key} value={key} className="text-white hover:bg-gray-700">
                  {algorithm.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Array Size Control */}
        <div className="space-y-3">
          <Label className="text-white font-semibold flex items-center gap-2">
            <Shuffle size={18} className="text-blue-400" />
            Array Size: {arraySize}
          </Label>
          <Slider
            value={[arraySize]}
            onValueChange={(value) => setArraySize(value[0])}
            min={10}
            max={100}
            step={5}
            disabled={isAnimating}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>10</span>
            <span>100</span>
          </div>
        </div>

        {/* Animation Speed Control */}
        <div className="space-y-3">
          <Label className="text-white font-semibold flex items-center gap-2">
            <Clock size={18} className="text-green-400" />
            Speed: {animationSpeed}%
          </Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => setAnimationSpeed(value[0])}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-400">
            <span>Slow</span>
            <span>Fast</span>
          </div>
        </div>

        {/* Algorithm Info */}
        {currentAlgorithm && (
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-center">{currentAlgorithm.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-2">
                  <Clock size={14} className="text-orange-400" />
                  Time:
                </span>
                <span className="text-orange-400 font-mono">{currentAlgorithm.timeComplexity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300 flex items-center gap-2">
                  <HardDrive size={14} className="text-cyan-400" />
                  Space:
                </span>
                <span className="text-cyan-400 font-mono">{currentAlgorithm.spaceComplexity}</span>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <h3 className="text-white font-semibold mb-3 text-center">Legend</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-slate-300">Default</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-slate-300">Comparing</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-slate-300">Swapping</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-slate-300">Sorted</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded"></div>
              <span className="text-slate-300">Pivot</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
