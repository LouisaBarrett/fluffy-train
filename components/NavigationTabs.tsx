
import React from 'react';
import { LayoutGrid, Heart, FolderHeart, Search, Settings } from 'lucide-react';
import { useSettings } from '../store/context';
import { ViewMode } from '../types';

export const NavigationTabs: React.FC = () => {
  const { view, setView, settings } = useSettings();

  const tabs: { id: ViewMode; icon: any; label: string }[] = [
    { id: 'library', icon: LayoutGrid, label: 'Library' },
    { id: 'for-you', icon: Heart, label: 'For You' },
    { id: 'albums', icon: FolderHeart, label: 'Albums' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  // Standard iOS colors
  const activeColor = "text-[#007AFF]";
  const inactiveColor = "text-[#8E8E93]";

  // iOS 18 Style: Labels are always visible, icons are approx 24-26px
  const iconSize = settings.highVisibilityMode ? 26 : 24;
  const labelSize = settings.highVisibilityMode ? 'text-[11px]' : 'text-[10px]';

  return (
    <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-[20px] border-t border-gray-200 z-50 shadow-[0_-0.5px_0_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-[84px] max-w-md mx-auto px-2 pb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = view === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive ? `${activeColor}` : inactiveColor}`}
            >
              <div className="relative mb-0.5">
                <Icon size={iconSize} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`font-medium ${labelSize}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
