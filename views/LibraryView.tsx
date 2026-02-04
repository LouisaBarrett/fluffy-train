
import React from 'react';
import { useSettings } from '../store/context';
import { Photo } from '../types';
import { Calendar, Heart, MoreHorizontal } from 'lucide-react';

export const LibraryView: React.FC = () => {
  const { settings, setSelectedPhoto, setView, photos } = useSettings();

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setView('detail');
  };

  const gridCols = settings.highVisibilityMode ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`min-h-full pb-40 ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
      <header className="px-5 pt-16 pb-4 flex justify-between items-end border-b border-gray-50">
        <div>
          <h1 className="text-[34px] font-extrabold tracking-tight text-black">Library</h1>
          <p className="text-gray-500 font-semibold text-[15px]">All Photos</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-500 active:opacity-60">
          <MoreHorizontal size={20} strokeWidth={2.5} />
        </button>
      </header>
      
      <div className={`grid ${gridCols} gap-0.5 mt-0.5`}>
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="aspect-square relative cursor-pointer active:opacity-80 transition-opacity overflow-hidden bg-gray-100"
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.url} 
              alt="Photo" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
              {photo.isProRAW && (
                <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-white/10 uppercase tracking-tighter">
                  RAW
                </span>
              )}
              {photo.isFavorite && (
                <div className="bg-white/90 backdrop-blur-md p-1 rounded-full shadow-sm">
                  <Heart size={10} fill="#FF3B30" className="text-[#FF3B30]" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="py-10 text-center">
        <p className="text-gray-400 font-semibold text-[13px]">{photos.length} Photos</p>
      </div>
    </div>
  );
};
