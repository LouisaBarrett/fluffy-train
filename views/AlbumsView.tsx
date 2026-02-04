
import React, { useState } from 'react';
import { useSettings } from '../store/context';
import { ChevronRight, Copy, EyeOff, Trash2, Heart, Layers, Video, ChevronLeft, Plus } from 'lucide-react';
import { handleImageError } from '../constants';

export const AlbumsView: React.FC = () => {
  const { settings, setView, photos } = useSettings();
  const [isShowingAll, setIsShowingAll] = useState(false);

  const favoriteCount = photos.filter(p => p.isFavorite).length;

  const allAlbums = [
    { title: 'Recents', count: photos.length, img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=600' },
    { title: 'Favorites', count: favoriteCount, img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=600' },
    { title: 'Nature', count: 18, img: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=600' },
    { title: 'Family', count: 89, img: 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&q=80&w=600' },
    { title: 'Travel', count: 42, img: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&q=80&w=600' },
    { title: 'Pets', count: 156, img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600' },
    { title: 'Sunsets', count: 24, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600' },
    { title: 'Food', count: 31, img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600' }
  ];

  // Featured albums are just the first 4
  const featuredAlbums = allAlbums.slice(0, 4);

  const mediaTypes = [
    { title: 'Videos', icon: Video, count: 12, color: 'text-blue-500' },
    { title: 'Bursts', icon: Layers, count: 3, color: 'text-blue-500' }
  ];

  const utilities = [
    { title: 'Duplicates', count: 2, icon: Copy, color: 'text-blue-500', id: 'duplicates' },
    { title: 'Hidden', count: 0, icon: EyeOff, color: 'text-gray-400', id: 'hidden' },
    { title: 'Recently Deleted', count: 12, icon: Trash2, color: 'text-red-500', id: 'recently-deleted' }
  ];

  const ListRow = ({ icon: Icon, color, title, count, onClick }: any) => (
    <div 
      className="flex items-center justify-between py-3 px-4 active:bg-gray-100 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} className={color} strokeWidth={2} />
        <span className="text-[17px] font-medium text-black">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[17px] text-gray-500">{count}</span>
        <ChevronRight size={16} className="text-gray-300" />
      </div>
    </div>
  );

  // Fix: Explicitly type AlbumCard as React.FC to allow 'key' prop when used within map iterations.
  const AlbumCard: React.FC<{ album: any }> = ({ album }) => (
    <div className="space-y-2 cursor-pointer active:opacity-70 group" onClick={() => {}}>
      <div className={`aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm border ${settings.highVisibilityMode ? 'border-black border-2' : 'border-gray-100'}`}>
        <img src={album.img} className="w-full h-full object-cover" alt={album.title} onError={handleImageError} />
      </div>
      <div className="px-0.5">
        <p className={`font-black text-[15px] text-black leading-tight ${settings.highVisibilityMode ? 'text-lg' : ''}`}>{album.title}</p>
        <p className="text-gray-500 font-bold text-[13px]">{album.count}</p>
      </div>
    </div>
  );

  // Full view of all albums
  if (isShowingAll) {
    return (
      <div className={`min-h-full pb-40 animate-in slide-in-from-right duration-300 ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
        <header className="px-2 pt-14 pb-4 border-b flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-xl z-20">
          <button 
            onClick={() => setIsShowingAll(false)}
            className="h-11 px-3 text-[#007AFF] flex items-center gap-1 font-black active:opacity-60 transition-opacity"
          >
            <ChevronLeft size={28} strokeWidth={3} />
            <span className="text-[17px]">Back</span>
          </button>
          <h1 className="text-[17px] font-black text-black">My Albums</h1>
          <button className="h-11 px-4 text-[#007AFF] font-black active:opacity-60">
            <Plus size={24} strokeWidth={3} />
          </button>
        </header>

        <div className="px-5 py-6">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {allAlbums.map((album) => (
              <AlbumCard key={album.title} album={album} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-full pb-40 animate-in fade-in duration-300 ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
      <header className="px-5 pt-16 pb-6 border-b border-gray-50">
        <h1 className="text-[34px] font-extrabold tracking-tight text-black">Albums</h1>
      </header>

      <div className="px-5 py-6 space-y-10">
        {/* My Albums Grid */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <h2 className="text-[22px] font-bold text-black">My Albums</h2>
            <button 
              onClick={() => setIsShowingAll(true)}
              className="text-[17px] font-black text-blue-500 active:opacity-60"
            >
              See All
            </button>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.title} album={album} />
            ))}
          </div>
        </section>

        {/* Media Types */}
        <section className="space-y-3">
          <h2 className="text-[22px] font-bold text-black">Media Types</h2>
          <div className={`bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200/50 ${settings.highVisibilityMode ? 'border-4 border-black bg-white divide-black' : ''}`}>
            {mediaTypes.map((item) => (
              <ListRow key={item.title} {...item} />
            ))}
          </div>
        </section>

        {/* Utilities List */}
        <section className="space-y-3">
          <h2 className="text-[22px] font-bold text-black">Utilities</h2>
          <div className={`bg-gray-50 rounded-xl overflow-hidden divide-y divide-gray-200/50 ${settings.highVisibilityMode ? 'border-4 border-black bg-white divide-black' : ''}`}>
            {utilities.map((item) => (
              <ListRow 
                key={item.title} 
                {...item} 
                onClick={() => item.id && setView(item.id as any)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
