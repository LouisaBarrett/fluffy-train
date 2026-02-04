
import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Monitor, SlidersHorizontal, Camera, Sparkles, Zap, Crop, Maximize, Check, ShieldCheck } from 'lucide-react';
import { useSettings } from '../store/context';
import { AccessibleButton } from '../components/AccessibleButton';
import { handleImageError } from '../constants';

export const EditView: React.FC = () => {
  const { selectedPhoto, setView, settings, updateSettings, setIslandMessage } = useSettings();
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [activeParam, setActiveParam] = useState<'exp' | 'con' | 'sat' | 'zoom'>('exp');
  const [showCompare, setShowCompare] = useState(false);
  const [isCropMode, setIsCropMode] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<'original' | '1:1' | '4:3' | '16:9'>('original');

  if (!selectedPhoto) return null;

  const handleRevert = () => {
    setExposure(0);
    setContrast(0);
    setSaturation(0);
    setZoom(1);
    setIsCropMode(false);
    setAspectRatio('original');
  };

  const handleSave = () => {
    setView('detail');
  };

  // Maya Need #1: Zero auto-enhancements if Pro Mode is active or it's a RAW file.
  const isBitPerfectActive = settings.proMode || selectedPhoto.isProRAW;

  const toggleBitPerfect = () => {
    if (selectedPhoto.isProRAW) {
      setIslandMessage("ProRAW is always Bit-Perfect");
      setTimeout(() => setIslandMessage(null), 3000);
      return;
    }
    const newMode = !settings.proMode;
    updateSettings({ proMode: newMode });
    setIslandMessage(newMode ? "Pro Pipeline Enabled (No AI)" : "Standard Pipeline (Smart HDR)");
    setTimeout(() => setIslandMessage(null), 3000);
  };

  // Calculate CSS filters and transforms
  const getFilterStyle = () => {
    // If not bit-perfect, simulate a "Smart HDR" baseline (AI auto-enhancement)
    const aiBaseline = !isBitPerfectActive ? 'brightness(1.05) saturate(1.1) contrast(1.05)' : '';
    
    return {
      filter: `${aiBaseline} brightness(${100 + exposure * 20}%) contrast(${100 + contrast * 20}%) saturate(${100 + saturation * 20}%)`,
      transform: `scale(${zoom})`,
      transition: 'transform 0.3s cubic-bezier(0.2, 0, 0, 1), filter 0.2s linear'
    };
  };

  const getCropFrameClass = () => {
    if (!isCropMode) return "";
    switch (aspectRatio) {
      case '1:1': return "aspect-square w-full max-w-[320px]";
      case '4:3': return "aspect-[4/3] w-full max-w-[360px]";
      case '16:9': return "aspect-[16/9] w-full max-w-[400px]";
      default: return "w-full h-full";
    }
  };

  return (
    <div className="absolute inset-0 bg-black z-[70] flex flex-col text-white">
      {/* Header - HIG compliant with 44pt touch targets */}
      <div className="flex items-center justify-between p-4 pt-14 z-10 bg-black/40 backdrop-blur-md">
        <button 
          onClick={() => setView('detail')} 
          className="w-11 h-11 flex items-center justify-center bg-white/10 rounded-full active:bg-white/20 transition-colors"
          aria-label="Cancel"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center">
           <h2 className="font-black text-[13px] tracking-tight text-gray-400 uppercase">
            {isCropMode ? 'Crop & Geometry' : (isBitPerfectActive ? 'Pro Pipeline' : 'Standard Edit')}
          </h2>
          {selectedPhoto.isProRAW && <span className="text-[10px] font-black text-blue-500 tracking-[0.2em]">14-BIT RAW</span>}
        </div>
        <button 
          onClick={handleSave} 
          className="h-10 px-5 bg-blue-600 rounded-full text-white font-black text-sm active:scale-95 transition-all shadow-lg"
        >
          Done
        </button>
      </div>

      {/* Workspace */}
      <div className="flex-1 relative flex items-center justify-center p-4 overflow-hidden">
        {showCompare ? (
           <div className="w-full h-full flex gap-1 animate-in zoom-in-95 duration-200">
              <div className="flex-1 relative overflow-hidden rounded-[32px] border-2 border-white/20">
                <img src={selectedPhoto.url} className="w-full h-full object-contain" style={{ transform: `scale(${zoom})` }} alt="Original" onError={handleImageError} />
                <span className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 text-[10px] rounded-full font-black uppercase tracking-widest">Original</span>
              </div>
              <div className="flex-1 relative overflow-hidden rounded-[32px] border-2 border-blue-500">
                <img src={selectedPhoto.url} className="w-full h-full object-contain" style={getFilterStyle()} alt="Edited" onError={handleImageError} />
                <span className="absolute bottom-4 left-4 bg-blue-600 px-3 py-1 text-[10px] rounded-full font-black uppercase tracking-widest">Modified</span>
              </div>
           </div>
        ) : (
          <div className={`relative flex items-center justify-center transition-all duration-500 ${isCropMode ? 'scale-90' : 'scale-100'}`}>
            <div className={`relative overflow-hidden transition-all duration-500 rounded-[32px] ${isCropMode ? 'border-2 border-blue-500 shadow-[0_0_40px_rgba(59,130,246,0.3)]' : 'shadow-2xl'} ${getCropFrameClass()}`}>
              <img 
                src={selectedPhoto.url} 
                className="max-w-full max-h-full object-contain"
                style={getFilterStyle()}
                alt="Edit target"
                onError={handleImageError}
              />
              
              {/* Crop Grid Overlay */}
              {isCropMode && (
                <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 animate-in fade-in duration-500">
                   <div className="border border-white/30 border-t-0 border-l-0" />
                   <div className="border border-white/30 border-t-0 border-l-0" />
                   <div className="border border-white/30 border-t-0 border-r-0" />
                   <div className="border border-white/30 border-l-0" />
                   <div className="border border-white/30 border-l-0" />
                   <div className="border border-white/30 border-r-0" />
                   <div className="border border-white/30 border-b-0 border-l-0" />
                   <div className="border border-white/30 border-b-0 border-l-0" />
                   <div className="border border-white/30 border-b-0 border-r-0" />
                </div>
              )}
            </div>
            
            {/* Corner Handles for Crop */}
            {isCropMode && (
              <>
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-lg z-20" />
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-lg z-20" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-lg z-20" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-lg z-20" />
              </>
            )}
          </div>
        )}
      </div>

      {/* Controls Overlay - Thick Liquid Glass */}
      <div className={`bg-[#050505]/95 backdrop-blur-3xl p-8 pb-16 rounded-t-[54px] border-t-2 border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}>
        <div className="flex justify-between items-center mb-10">
          <AccessibleButton 
            label="Reset" 
            variant="secondary" 
            icon={<RotateCcw size={18} />} 
            onClick={handleRevert} 
            className="!h-10 !px-4 !rounded-full !bg-white/10 !text-white !border-none"
          />
          
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsCropMode(!isCropMode)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all ${isCropMode ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/10 text-gray-400'}`}
                aria-label="Crop Tool"
             >
                <Crop size={22} strokeWidth={3} />
             </button>
             <div className="h-6 w-[1px] bg-white/10 mx-1" />
             
             {/* Functional Bit-Perfect Toggle */}
             <button 
                onClick={toggleBitPerfect}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all group ${isBitPerfectActive ? 'bg-blue-600/20 border-blue-500/30' : 'bg-white/5 border-transparent'} border`}
             >
                <div className="relative">
                  <Sparkles size={16} className={`transition-colors ${isBitPerfectActive ? 'text-blue-400' : 'text-gray-500'}`} />
                  {isBitPerfectActive && <div className="absolute inset-0 blur-sm bg-blue-400/50 animate-pulse rounded-full" />}
                </div>
                <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isBitPerfectActive ? 'text-blue-400' : 'text-gray-500'}`}>
                  Bit-Perfect
                </span>
             </button>
          </div>

          <AccessibleButton 
            label="" 
            variant="secondary" 
            icon={<Monitor size={22} strokeWidth={3} />} 
            onMouseDown={() => setShowCompare(true)} 
            onMouseUp={() => setShowCompare(false)}
            onClick={() => {}}
            className={`!w-12 !h-12 !p-0 !rounded-full !bg-white/10 !text-blue-400 !border-none transition-transform ${showCompare ? 'scale-90 bg-white/20' : ''}`}
          />
        </div>

        {/* Conditional Controls: Crop Presets or Adjustments */}
        {isCropMode ? (
          <div className="flex flex-col gap-6 animate-in slide-in-from-bottom-4 duration-300">
             <div className="flex justify-around items-center">
                {[
                  { id: 'original', label: 'Original' },
                  { id: '1:1', label: '1:1' },
                  { id: '4:3', label: '4:3' },
                  { id: '16:9', label: '16:9' }
                ].map(ratio => (
                  <button 
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${aspectRatio === ratio.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-white/5 text-gray-500'}`}
                  >
                    {ratio.label}
                  </button>
                ))}
             </div>
             
             {/* Simple Zoom Slider in Crop Mode */}
             <div className="flex items-center gap-4 px-2">
                <Maximize size={18} className="text-gray-500" />
                <input 
                  type="range" min="1" max="3" step="0.01"
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="flex-1 appearance-none bg-white/10 h-1 rounded-full accent-blue-600"
                />
                <span className="text-xs font-black text-blue-500 w-10">{zoom.toFixed(1)}x</span>
             </div>
          </div>
        ) : (
          /* Dynamic Parameter Sliders - Interactive List */
          <div className="flex flex-col gap-8">
              {[
                { id: 'exp', label: 'Exposure Stop', val: exposure, setter: setExposure, color: 'text-blue-500', bg: 'bg-blue-500', min: -5, max: 5 },
                { id: 'con', label: 'Tone Contrast', val: contrast, setter: setContrast, color: 'text-purple-500', bg: 'bg-purple-500', min: -5, max: 5 },
                { id: 'sat', label: 'Vibrancy', val: saturation, setter: setSaturation, color: 'text-orange-500', bg: 'bg-orange-500', min: -5, max: 5 },
                { id: 'zoom', label: 'Lens Zoom', val: zoom, setter: setZoom, color: 'text-white', bg: 'bg-white', min: 1, max: 3 }
              ].map(p => (
                <div 
                  key={p.id} 
                  className={`flex items-center justify-between transition-all cursor-pointer ${activeParam === p.id ? 'opacity-100' : 'opacity-40'}`}
                  onClick={() => setActiveParam(p.id as any)}
                >
                  <div className="flex flex-col w-32">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{p.label}</span>
                    <span className={`text-2xl font-black ${p.color}`}>{p.id === 'zoom' ? '' : (p.val > 0 ? '+' : '')}{p.val.toFixed(2)}{p.id === 'zoom' ? 'x' : ''}</span>
                  </div>
                  
                  <div className="flex-1 h-12 flex items-center relative px-2">
                    <div className="absolute inset-x-2 h-1 bg-white/10 rounded-full" />
                    <input 
                      type="range" min={p.min} max={p.max} step="0.01"
                      value={p.val}
                      onChange={(e) => {
                        e.stopPropagation();
                        p.setter(parseFloat(e.target.value));
                      }}
                      className={`w-full relative z-10 appearance-none bg-transparent cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4
                        ${p.id === 'exp' ? '[&::-webkit-slider-thumb]:border-blue-600' : p.id === 'con' ? '[&::-webkit-slider-thumb]:border-purple-600' : p.id === 'sat' ? '[&::-webkit-slider-thumb]:border-orange-600' : '[&::-webkit-slider-thumb]:border-gray-900'}
                        shadow-xl`}
                    />
                    {/* Visual fill indicator */}
                    <div 
                      className={`absolute h-1 rounded-full ${p.bg} transition-all pointer-events-none`}
                      style={{ 
                        width: p.id === 'zoom' ? `${((p.val - 1) / 2) * 100}%` : `${Math.abs(p.val) * 10}%`, 
                        left: p.id === 'zoom' ? '0' : (p.val >= 0 ? '50%' : 'auto'),
                        right: p.id === 'zoom' ? 'auto' : (p.val < 0 ? '50%' : 'auto'),
                        transformOrigin: p.id === 'zoom' || p.val >= 0 ? 'left' : 'right'
                      }} 
                    />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Fixed: Corrected syntax error by adding parentheses and && for conditional rendering */}
        {isBitPerfectActive && !isCropMode && (
          <div className="mt-10 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center gap-3">
             <ShieldCheck size={16} className="text-blue-400" />
             <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">
               Native Signal Processing Only
             </p>
          </div>
        )}
      </div>
    </div>
  );
};
