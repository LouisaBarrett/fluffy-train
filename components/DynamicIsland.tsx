
import React from 'react';
import { useSettings } from '../store/context';
import { RotateCcw, Sparkles } from 'lucide-react';

export const DynamicIsland: React.FC = () => {
  const { islandMessage } = useSettings();
  const isExpanded = !!islandMessage;

  return (
    <div className="absolute top-0 left-0 right-0 flex justify-center pt-3 z-[1000] pointer-events-none">
      <div 
        className={`dynamic-island bg-black flex items-center justify-center transition-all duration-500 overflow-hidden pointer-events-auto
          ${isExpanded ? 'w-[90%] h-[72px] rounded-[30px] px-6 shadow-2xl' : 'w-[120px] h-[36px] rounded-full px-2'}`}
      >
        {!isExpanded ? (
          <div className="flex gap-1.5 items-center">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-8 h-1 bg-white/10 rounded-full" />
          </div>
        ) : (
          <div className="w-full flex items-center justify-between text-white animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Photos Intelligence</span>
                <span className="font-bold text-sm leading-tight">{islandMessage}</span>
              </div>
            </div>
            {islandMessage?.includes("Deleted") && (
              <button className="bg-white/10 hover:bg-white/20 p-2 rounded-xl flex items-center gap-2 transition-colors">
                <RotateCcw size={18} />
                <span className="font-black text-xs">UNDO</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
