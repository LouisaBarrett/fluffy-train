
import React, { useState } from 'react';
import { ChevronLeft, Info, Trash2, CheckCircle, Scale, Sparkles, Database } from 'lucide-react';
import { useSettings } from '../store/context';
import { AccessibleButton } from '../components/AccessibleButton';
import { MOCK_PHOTOS } from '../constants';

export const DuplicatesView: React.FC = () => {
  const { setView, settings, showUndoToast } = useSettings();
  const duplicateGroup = MOCK_PHOTOS.filter(p => p.duplicateGroup === 'group1');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const handleKeepBest = () => {
    showUndoToast("Cleaned 4.1 MB in Storage");
    setView('albums');
  };

  return (
    <div className={`absolute inset-0 z-[60] flex flex-col ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
      {/* Header - Standard iOS Back Interaction */}
      <div className={`flex items-center justify-between px-2 pt-14 pb-4 border-b ${settings.highVisibilityMode ? 'border-gray-100 bg-white' : 'border-gray-50 bg-white'}`}>
        <button 
          onClick={() => setView('albums')} 
          className="h-11 px-3 text-[#007AFF] flex items-center gap-1 font-semibold active:opacity-60 transition-opacity"
        >
          <ChevronLeft size={28} strokeWidth={3} />
          <span className="text-[17px]">Albums</span>
        </button>
        <h2 className="font-bold text-[17px] tracking-tight text-black">Duplicates</h2>
        <div className="w-11 px-3"></div>
      </div>

      {/* Storage Reclaim Banner - Bob Need #7 */}
      <div className="px-5 pt-6">
        <div className={`p-6 rounded-3xl relative overflow-hidden bg-gray-50 border border-gray-100`}>
          <div className="absolute top-0 left-0 w-full h-full ai-shimmer opacity-10 pointer-events-none" />
          <div className="flex gap-4 items-center relative z-10">
            <div className="w-12 h-12 bg-[#007AFF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Database size={24} />
            </div>
            <div>
              <h3 className="font-extrabold text-2xl text-black">4.1 MB</h3>
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mt-0.5">Storage Savings Found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-6">
        <div className="rounded-[40px] bg-gray-50 border border-gray-100 overflow-hidden shadow-sm">
          {/* Match Badge */}
          <div className="p-5 pb-2 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-blue-600" />
                <span className="font-bold text-[11px] uppercase text-blue-600 tracking-widest">Pixel-Perfect Match</span>
             </div>
             <div className="px-3 py-1 bg-[#34C759] text-white rounded-full text-[10px] font-bold uppercase">Safe to Merge</div>
          </div>

          <div className="grid grid-cols-2 gap-2 p-2 h-[260px]">
            {duplicateGroup.map((photo, i) => (
              <div 
                key={photo.id} 
                className={`relative cursor-pointer transition-all rounded-[28px] overflow-hidden ${selectedIdx === i ? 'ring-4 ring-[#007AFF] ring-inset z-10 shadow-lg' : 'opacity-50 scale-95'}`}
                onClick={() => setSelectedIdx(i)}
              >
                <img src={photo.url} className="w-full h-full object-cover" alt="Duplicate" />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                   {photo.fileSize}
                </div>
                {selectedIdx === i && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#007AFF] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg">
                    Keep This
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="p-6 space-y-5">
             <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <Scale size={16} className="text-blue-500" />
                <span>On-Device Analysis</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Resolution</p>
                  <p className="font-bold text-sm text-black">{duplicateGroup[0].resolution}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Camera Roll</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Resolution</p>
                  <p className="font-bold text-sm text-black">{duplicateGroup[1].resolution}</p>
                  <p className="text-[10px] text-gray-400 font-medium">Messages Sync</p>
                </div>
             </div>

             <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <p className="text-[12px] font-medium leading-snug text-blue-900">
                  Merging will keep the highest quality metadata while removing the redundant data.
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions - FR-1.1 & DR-1.3 Opaque & Solid */}
      <div className="px-6 py-6 border-t border-gray-100 flex flex-col gap-3 bg-white pb-12 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <AccessibleButton 
          label="Auto-Clean Best" 
          variant="primary" 
          icon={<CheckCircle size={24} strokeWidth={2.5} />}
          onClick={handleKeepBest} 
        />
        <AccessibleButton 
          label="Keep Both Versions" 
          variant="secondary" 
          onClick={() => setView('albums')} 
        />
      </div>
    </div>
  );
};
