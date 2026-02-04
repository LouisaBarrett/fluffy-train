
import React, { useState, useMemo } from 'react';
import { useSettings } from '../store/context';
import { Photo } from '../types';
import { MoreHorizontal, Check, PlusSquare, Share, Trash2, FolderPlus, Calendar, Clock, Heart } from 'lucide-react';
import { handleImageError } from '../constants';

type SortOrder = 'captured' | 'added';

export const LibraryView: React.FC = () => {
  const { settings, setSelectedPhoto, setView, photos, setIslandMessage } = useSettings();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('captured');

  const handlePhotoClick = (photo: Photo) => {
    if (isSelectMode) {
      const newSelected = new Set(selectedIds);
      if (newSelected.has(photo.id)) {
        newSelected.delete(photo.id);
      } else {
        newSelected.add(photo.id);
      }
      setSelectedIds(newSelected);
    } else {
      setSelectedPhoto(photo);
      setView('detail');
    }
  };

  const toggleSelectMode = () => {
    setIsSelectMode(!isSelectMode);
    setSelectedIds(new Set());
    setIsMenuOpen(false);
  };

  const handleCreateAlbum = () => {
    if (selectedIds.size === 0) return;
    
    setIslandMessage(`Added ${selectedIds.size} photos to New Album`);
    setIsSelectMode(false);
    setSelectedIds(new Set());
    
    setTimeout(() => {
      setIslandMessage(null);
    }, 4000);
  };

  const handleAddToAlbum = () => {
    if (selectedIds.size === 0) return;
    
    setIslandMessage(`Added ${selectedIds.size} photos to "Recent Favorites"`);
    setIsSelectMode(false);
    setSelectedIds(new Set());
    
    setTimeout(() => {
      setIslandMessage(null);
    }, 4000);
  };

  // Functional Sorting
  const sortedPhotos = useMemo(() => {
    const list = [...photos];
    if (sortOrder === 'added') {
      // For the mock, we reverse the "Recently Added" to distinguish it from "Date Captured"
      return list.reverse();
    }
    // Default: Captured (Newest First)
    return list;
  }, [photos, sortOrder]);

  const gridCols = settings.highVisibilityMode ? "grid-cols-2" : "grid-cols-3";
  const iconSize = settings.highVisibilityMode ? 26 : 24;
  const labelSize = settings.highVisibilityMode ? 'text-[11px]' : 'text-[10px]';

  return (
    <div className={`min-h-full pb-48 ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
      <header className="px-5 pt-16 pb-4 flex justify-between items-end border-b border-gray-50 bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div>
          <h1 className="text-[34px] font-extrabold tracking-tight text-black">Library</h1>
          <p className="text-gray-500 font-semibold text-[15px]">
            {isSelectMode ? `${selectedIds.size} Selected` : 'All Photos'}
          </p>
        </div>
        <div className="flex gap-2 relative">
          <button 
            onClick={toggleSelectMode}
            className={`px-4 py-1.5 rounded-full font-bold text-[15px] transition-all ${isSelectMode ? 'bg-gray-200 text-black' : 'text-blue-500 hover:bg-blue-50'}`}
          >
            {isSelectMode ? 'Cancel' : 'Select'}
          </button>
          {!isSelectMode && (
            <div className="relative">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-blue-500 transition-colors active:opacity-60 ${isMenuOpen ? 'bg-blue-100' : 'bg-gray-100'}`}
              >
                <MoreHorizontal size={20} strokeWidth={2.5} />
              </button>

              {/* Functional Dropdown Menu */}
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                  <div className={`absolute right-0 mt-2 w-[240px] z-50 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 origin-top-right rounded-2xl border ${
                    settings.highVisibilityMode 
                      ? 'bg-white border-black border-4' 
                      : 'bg-white/95 backdrop-blur-2xl border-gray-100'
                  }`}>
                    <div className="flex flex-col py-1">
                      <button 
                        onClick={() => { setSortOrder('captured'); setIsMenuOpen(false); }}
                        className={`flex items-center justify-between px-4 py-3 text-left transition-colors active:bg-blue-50 ${sortOrder === 'captured' ? 'text-blue-600' : 'text-black'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar size={18} strokeWidth={2.5} />
                          <span className="font-bold text-[15px]">Sort by Date Captured</span>
                        </div>
                        {sortOrder === 'captured' && <Check size={18} strokeWidth={3} />}
                      </button>
                      
                      <div className={`h-[1px] mx-4 ${settings.highVisibilityMode ? 'bg-black' : 'bg-gray-100'}`} />
                      
                      <button 
                        onClick={() => { setSortOrder('added'); setIsMenuOpen(false); }}
                        className={`flex items-center justify-between px-4 py-3 text-left transition-colors active:bg-blue-50 ${sortOrder === 'added' ? 'text-blue-600' : 'text-black'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Clock size={18} strokeWidth={2.5} />
                          <span className="font-bold text-[15px]">Sort by Recently Added</span>
                        </div>
                        {sortOrder === 'added' && <Check size={18} strokeWidth={3} />}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>
      
      <div className={`grid ${gridCols} gap-0.5 mt-0.5 relative`}>
        {sortedPhotos.map((photo) => {
          const isSelected = selectedIds.has(photo.id);
          return (
            <div 
              key={photo.id} 
              className={`aspect-square relative cursor-pointer active:opacity-80 transition-all overflow-hidden bg-gray-100 ${isSelected ? 'p-1.5 bg-blue-500' : ''}`}
              onClick={() => handlePhotoClick(photo)}
            >
              <img 
                src={photo.url} 
                alt="Photo" 
                className="w-full h-full object-cover transition-transform duration-500"
                loading="lazy"
                onError={handleImageError}
              />
              
              {/* Select Mode Overlays */}
              {isSelectMode && (
                <div className="absolute bottom-2 right-2">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-blue-500 border-white shadow-lg scale-110' 
                      : 'bg-black/20 border-white/60'
                  }`}>
                    {isSelected && <Check size={14} strokeWidth={4} className="text-white" />}
                  </div>
                </div>
              )}

              {/* Badges (Hidden in select mode for clarity) */}
              {!isSelectMode && (
                <>
                  {/* Persistent Favorite Indicator */}
                  {photo.isFavorite && (
                    <div className="absolute top-2 left-2">
                      <div className="bg-black/20 backdrop-blur-md p-1 rounded-md border border-white/10">
                        <Heart size={settings.highVisibilityMode ? 14 : 12} fill="white" strokeWidth={0} className="text-white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    {photo.isProRAW && (
                      <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-white/10 uppercase tracking-tighter">
                        RAW
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      <div className="py-10 text-center">
        <p className="text-gray-400 font-semibold text-[13px]">{photos.length} Photos</p>
      </div>

      {/* Floating Selection Action Bar: 421px width, rounded corners restored */}
      {isSelectMode && selectedIds.size > 0 && (
        <div 
          className={`fixed bottom-[100px] left-1/2 -translate-x-1/2 z-[45] w-[421px] transition-all animate-in slide-in-from-bottom-8 duration-300 border shadow-2xl rounded-[32px] ${
            settings.highVisibilityMode 
              ? 'bg-white border-black border-4 h-[80px]' 
              : 'bg-white/90 backdrop-blur-[20px] border-gray-100 h-[72px]'
          }`}
        >
          <div className="flex items-center justify-around h-full px-2">
            <button className="flex flex-col items-center justify-center flex-1 h-full text-[#007AFF] active:opacity-60 transition-opacity">
              <Share size={iconSize} strokeWidth={2.5} />
              <span className={`font-semibold ${labelSize} mt-0.5`}>Share</span>
            </button>
            
            <button 
              onClick={handleAddToAlbum}
              className="flex flex-col items-center justify-center flex-1 h-full text-[#007AFF] active:opacity-60 transition-opacity"
            >
              <FolderPlus size={iconSize} strokeWidth={2.5} />
              <span className={`font-semibold ${labelSize} mt-0.5`}>Add to Album</span>
            </button>

            <button 
              onClick={handleCreateAlbum}
              className="flex flex-col items-center justify-center flex-1 h-full text-[#007AFF] active:opacity-60 transition-opacity"
            >
              <PlusSquare size={iconSize} strokeWidth={2.5} />
              <span className={`font-semibold ${labelSize} mt-0.5`}>New Album</span>
            </button>

            <button className="flex flex-col items-center justify-center flex-1 h-full text-[#FF3B30] active:opacity-60 transition-opacity">
              <Trash2 size={iconSize} strokeWidth={2.5} />
              <span className={`font-semibold ${labelSize} mt-0.5`}>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
