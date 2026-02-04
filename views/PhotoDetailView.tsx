
import React, { useState } from 'react';
import { ChevronLeft, Share, Edit3, Trash2, Info, X, Heart } from 'lucide-react';
import { useSettings } from '../store/context';
import { AccessibleButton } from '../components/AccessibleButton';
import { handleImageError } from '../constants';

export const PhotoDetailView: React.FC = () => {
  const { selectedPhoto, setSelectedPhoto, setView, settings, showUndoToast, toggleFavorite } = useSettings();
  const [showInfo, setShowInfo] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!selectedPhoto) return null;

  const handleDeleteInitiate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
  };

  const handleConfirmDelete = () => {
    showUndoToast("Moved to Recently Deleted (40 days)");
    setSelectedPhoto(null);
    setView('library');
  };

  const handleKeep = () => {
    setIsDeleting(false);
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(selectedPhoto.id);
  };

  const handleBack = () => {
    setSelectedPhoto(null);
    setView('library');
  };

  return (
    <div className={`absolute inset-0 z-[60] flex flex-col ${settings.highVisibilityMode ? 'bg-white' : 'bg-black'}`}>
      {/* Top Header - Opaque for iOS 26 Redesign */}
      <div className={`flex items-center justify-between p-4 pt-14 border-b-2 z-10 ${settings.highVisibilityMode ? 'bg-white border-gray-100' : 'bg-[#121212] border-white/5'}`}>
        <button 
          onClick={handleBack}
          className="p-3 -ml-2 text-blue-500 flex items-center gap-1 font-black active:opacity-60 transition-opacity"
        >
          <ChevronLeft size={32} strokeWidth={3} />
          <span className="text-[17px]">Library</span>
        </button>
        <div className="text-center">
          <p className={`font-black text-[13px] tracking-tight ${settings.highVisibilityMode ? 'text-black' : 'text-white'}`}>{selectedPhoto.timestamp}</p>
          <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{selectedPhoto.location || 'No Location'}</p>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={handleFavoriteToggle}
            className={`p-3 rounded-2xl transition-all ${selectedPhoto.isFavorite ? 'bg-red-50 text-red-500' : 'bg-white/10 text-gray-400'}`}
            aria-label={selectedPhoto.isFavorite ? "Unfavorite" : "Favorite"}
          >
            <Heart size={24} strokeWidth={2.5} fill={selectedPhoto.isFavorite ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className={`p-3 rounded-2xl transition-all ${showInfo ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/10 text-gray-400'}`}
          >
            <Info size={24} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Main Photo Area */}
      <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
        <img 
          src={selectedPhoto.url} 
          alt="Preview" 
          className="max-w-full max-h-full object-contain"
          onError={handleImageError}
        />
        
        {/* Info Panel - Opaque Detail View (Need #9) */}
        {showInfo && (
          <div className={`absolute inset-x-0 bottom-0 p-8 rounded-t-[54px] shadow-2xl animate-in slide-in-from-bottom duration-500 z-20 border-t-2 ${settings.highVisibilityMode ? 'bg-white border-gray-200' : 'bg-[#1c1c1e] border-white/10'}`}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className={`text-2xl font-black ${settings.highVisibilityMode ? 'text-black' : 'text-white'}`}>Technical Specs</h2>
                <div className="flex items-center gap-2 mt-1">
                   <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                   <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest">Verified Original</p>
                </div>
              </div>
              <button onClick={() => setShowInfo(false)} className={`p-3 rounded-full active:scale-90 transition-all ${settings.highVisibilityMode ? 'bg-gray-100 text-gray-400' : 'bg-white/10 text-gray-500'}`}><X size={24}/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: 'Device', val: selectedPhoto.exif.camera },
                { label: 'Format', val: selectedPhoto.isProRAW ? `${selectedPhoto.bitDepth}-bit ProRAW` : 'Standard JPEG' },
                { label: 'Exposure', val: `${selectedPhoto.exif.aperture} • ${selectedPhoto.exif.shutterSpeed}` },
                { label: 'Size', val: selectedPhoto.fileSize }
              ].map(item => (
                <div key={item.label} className={`p-4 rounded-3xl border ${settings.highVisibilityMode ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'}`}>
                  <p className="text-[10px] text-gray-400 uppercase font-black mb-1">{item.label}</p>
                  <p className={`font-black text-sm ${settings.highVisibilityMode ? 'text-black' : 'text-white'}`}>{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Bar - Solid Opaque Foundation (FR-1.7) */}
      <div className={`${settings.highVisibilityMode ? 'px-3 gap-2 bg-white border-gray-100' : 'px-6 gap-4 bg-[#121212] border-white/5'} pt-6 pb-14 border-t-2 flex transition-all`}>
        <AccessibleButton 
          label="Share" 
          variant="secondary" 
          className="flex-1"
          icon={<Share size={24} strokeWidth={3} />}
          onClick={() => {}} 
        />
        <AccessibleButton 
          label="Edit" 
          variant="secondary" 
          className="flex-1"
          icon={<Edit3 size={24} strokeWidth={3} />}
          onClick={() => setView('edit')} 
        />
        <AccessibleButton 
          label="Delete" 
          variant="destructive" 
          className="flex-1"
          icon={<Trash2 size={24} strokeWidth={3} />}
          onClick={handleDeleteInitiate} 
        />
      </div>

      {/* Confirmation Dialog - Solid Opaque Barrier */}
      {isDeleting && (
        <div className="absolute inset-0 z-[100] bg-black/90 flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-sm rounded-[54px] overflow-hidden p-10 shadow-2xl">
            <div className="mb-10 text-center">
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Trash2 size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black mb-4 text-black tracking-tight">Delete Photo?</h2>
              <p className="text-gray-500 font-bold px-4 leading-relaxed">This photo will be moved to <span className="text-red-600 font-black">Recently Deleted</span> for 40 days.</p>
            </div>
            <div className="flex flex-col gap-4">
              <AccessibleButton 
                label="Delete Photo" 
                variant="destructive" 
                onClick={handleConfirmDelete} 
              />
              <AccessibleButton 
                label="Keep in Library" 
                variant="secondary" 
                onClick={handleKeep} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
