
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Settings, ViewMode, Photo } from '../types';
import { MOCK_PHOTOS } from '../constants';

interface AppContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  photos: Photo[];
  toggleFavorite: (id: string) => void;
  selectedPhoto: Photo | null;
  setSelectedPhoto: (p: Photo | null) => void;
  undoToast: string | null;
  showUndoToast: (msg: string) => void;
  islandMessage: string | null;
  setIslandMessage: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    highVisibilityMode: false,
    proMode: false,
    dynamicTypeScale: 1,
    autoEnhanceProRAW: false,
    exportColorSpace: 'P3'
  });
  
  const [photos, setPhotos] = useState<Photo[]>(MOCK_PHOTOS);
  const [view, setView] = useState<ViewMode>('library');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [undoToast, setUndoToast] = useState<string | null>(null);
  const [islandMessage, setIslandMessage] = useState<string | null>(null);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleFavorite = (id: string) => {
    setPhotos(prev => prev.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
    // If the toggled photo is the selected one, update it too
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null);
    }
  };

  const showUndoToast = (msg: string) => {
    setUndoToast(msg);
    setIslandMessage(msg); 
    setTimeout(() => {
      setUndoToast(null);
      setIslandMessage(null);
    }, 10000);
  };

  return (
    <AppContext.Provider value={{ 
      settings, 
      updateSettings, 
      view, 
      setView, 
      photos,
      toggleFavorite,
      selectedPhoto, 
      setSelectedPhoto, 
      undoToast, 
      showUndoToast,
      islandMessage,
      setIslandMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useSettings must be used within AppProvider');
  return context;
};
