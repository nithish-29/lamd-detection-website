import React from 'react';
import { Mine } from '../types';

interface DetectionViewProps {
  imageSrc: string | null;
  mines: Mine[];
  isAnalyzing: boolean;
  onMineClick: (mine: Mine) => void;
}

export const DetectionView: React.FC<DetectionViewProps> = ({ imageSrc, mines, isAnalyzing, onMineClick }) => {
  return (
    <div className="relative w-full bg-gray-900 border-4 border-orange-500/50 rounded-lg shadow-[0_0_20px_rgba(255,127,80,0.3)] overflow-hidden min-h-[300px] sm:min-h-[400px] flex items-center justify-center group">
      
      {/* Grid Overlay Effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 z-10"></div>
      
      {imageSrc ? (
        <div className="relative w-full h-auto">
          <img 
            src={imageSrc} 
            alt="UAV Scan" 
            className={`w-full h-auto block transition-opacity duration-500 ${isAnalyzing ? 'opacity-50 blur-sm' : 'opacity-100'}`}
          />
          
          {/* Mine Markers */}
          {!isAnalyzing && mines.map((mine) => (
            <div
              key={mine.id}
              onClick={() => onMineClick(mine)}
              style={{ left: `${mine.xPct}%`, top: `${mine.yPct}%` }}
              className="absolute w-6 h-6 -ml-3 -mt-3 cursor-pointer z-20 group/marker"
            >
              <div className="absolute inset-0 rounded-full border-2 border-yellow-400 bg-red-600/60 animate-pulse shadow-[0_0_10px_#fde047]"></div>
              <div className="absolute -inset-4 rounded-full border border-yellow-400/30 animate-pulse-ring"></div>
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/marker:block bg-black/90 text-yellow-400 text-[10px] font-mono whitespace-nowrap px-2 py-1 rounded border border-yellow-600 z-30">
                TYPE: {mine.type}<br/>
                CONF: {(mine.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <h3 className="text-xl font-mono text-gray-500 font-bold tracking-widest">NO SIGNAL SOURCE</h3>
          <p className="text-gray-600 text-sm mt-2 font-mono">Upload aerial imagery to initiate threat scan.</p>
        </div>
      )}

      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/80 z-30 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-t-orange-500 border-gray-700 rounded-full animate-spin"></div>
          <div className="mt-4 font-mono text-orange-500 animate-pulse tracking-widest font-bold">ANALYZING TARGET AREA...</div>
          <div className="text-xs text-gray-400 mt-2 font-mono">YOLOv8 Inference Simulation</div>
        </div>
      )}
    </div>
  );
};