
import React from 'react';
import { AppProvider, useSettings } from './store/context';
import { NavigationTabs } from './components/NavigationTabs';
import { LibraryView } from './views/LibraryView';
import { AlbumsView } from './views/AlbumsView';
import { SettingsView } from './views/SettingsView';
import { PhotoDetailView } from './views/PhotoDetailView';
import { EditView } from './views/EditView';
import { DuplicatesView } from './views/DuplicatesView';
import { SearchView } from './views/SearchView';
import { DynamicIsland } from './components/DynamicIsland';
import { ChevronLeft, ShieldCheck, Trash2 } from 'lucide-react';
import { AccessibleButton } from './components/AccessibleButton';

const UtilityPlaceholder: React.FC<{ title: string; icon: React.ReactNode; description: string; color: string }> = ({ title, icon, description, color }) => {
  const { setView, settings } = useSettings();
  return (
    <div className={`absolute inset-0 z-40 flex flex-col ${settings.highVisibilityMode ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <div className={`flex items-center p-4 pt-14 border-b ${settings.highVisibilityMode ? 'bg-white/85 border-gray-100' : 'bg-black/85 border-white/10'} backdrop-blur-2xl`}>
        <button onClick={() => setView('albums')} className="text-blue-600 flex items-center gap-1 font-black p-2">
          <ChevronLeft size={32} strokeWidth={3} />
          <span>Albums</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className={`p-8 rounded-[44px] shadow-2xl ${color} bg-opacity-20`}>
          {icon}
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black tracking-tight">{title}</h2>
          <p className="text-gray-500 font-bold leading-relaxed">{description}</p>
        </div>
        <div className="w-full pt-8 px-4">
          <AccessibleButton label="View Documentation" variant="secondary" className="w-full" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const MainLayout: React.FC = () => {
  const { view, settings } = useSettings();

  const renderView = () => {
    switch (view) {
      case 'library': return <LibraryView />;
      case 'albums': return <AlbumsView />;
      case 'settings': return <SettingsView />;
      case 'search': return <SearchView />;
      case 'duplicates': return <DuplicatesView />;
      case 'hidden': return (
        <UtilityPlaceholder 
          title="Hidden" 
          icon={<ShieldCheck size={64} className="text-gray-400" />} 
          description="These photos are locked with Face ID. They won't appear in your Library or other albums."
          color="bg-gray-500"
        />
      );
      case 'recently-deleted': return (
        <UtilityPlaceholder 
          title="Recently Deleted" 
          icon={<Trash2 size={64} className="text-red-500" />} 
          description="Photos and videos show the days remaining before deletion. After that, they will be permanently deleted. (iOS 26 retains for 40 days)."
          color="bg-red-500"
        />
      );
      case 'for-you': return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 font-bold px-8 text-center animate-pulse">
          <p className="text-3xl mb-4 font-black text-white">Curating Memories</p>
          <p className="text-sm">Apple Intelligence is processing your library on-device.</p>
        </div>
      );
      default: return <LibraryView />;
    }
  };

  return (
    <div className={`iphone-frame ${settings.highVisibilityMode ? 'bg-white' : 'bg-[#000]'}`}>
      <DynamicIsland />
      
      <main className="h-full overflow-y-auto relative">
        {renderView()}
        <PhotoDetailView />
        {view === 'edit' && <EditView />}
      </main>
      
      <NavigationTabs />

      {/* Home Indicator */}
      <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full z-[100] ${settings.highVisibilityMode ? 'bg-black/20' : 'bg-white/20'}`} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
