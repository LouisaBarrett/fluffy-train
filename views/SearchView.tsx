
import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Mic, Clock, Sparkles, X, LayoutGrid } from 'lucide-react';
import { useSettings } from '../store/context';
import { GoogleGenAI, Type } from '@google/genai';
import { Photo } from '../types';

export const SearchView: React.FC = () => {
  const { settings, photos, setSelectedPhoto, setView } = useSettings();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiTip, setAiTip] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Photo[] | null>(null);

  const performSearch = async (searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults(null);
      setAiTip(null);
      return;
    }

    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare metadata summary for the AI to "search" through
      const photoMetadata = photos.map(p => ({
        id: p.id,
        location: p.location || 'Unknown',
        time: p.timestamp,
        isProRAW: p.isProRAW,
        camera: p.exif.camera
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              matchingIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of photo IDs that match the query"
              },
              explanation: {
                type: Type.STRING,
                description: "Brief explanation of the search logic (max 12 words)"
              }
            },
            required: ["matchingIds", "explanation"]
          }
        },
        contents: `User is searching for: "${searchTerm}" in their iPhone library.
        Photo Library Metadata: ${JSON.stringify(photoMetadata)}.
        Return the IDs of photos that match the context of the search.`
      });

      const data = JSON.parse(response.text);
      setAiTip(data.explanation);
      
      const filtered = photos.filter(p => data.matchingIds.includes(p.id));
      setSearchResults(filtered);
    } catch (e) {
      console.error("Search failed:", e);
      // Basic fallback filtering
      const fallback = photos.filter(p => 
        p.location?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(fallback);
      setAiTip("Local indexing used to find matching metadata.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    performSearch(text);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults(null);
    setAiTip(null);
  };

  const gridCols = settings.highVisibilityMode ? "grid-cols-2" : "grid-cols-3";

  return (
    <div className={`min-h-full pb-40 ${settings.highVisibilityMode ? 'bg-white' : 'bg-white'}`}>
      <header className="px-5 pt-16 pb-4">
        <h1 className="text-[34px] font-extrabold tracking-tight text-black">Search</h1>
      </header>

      <div className="px-5 space-y-8">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className={`relative transition-all duration-300 ${isSearching ? 'ring-4 ring-blue-500/20' : ''}`}>
            <input 
              type="text"
              placeholder="Describe a moment..."
              className={`w-full h-[52px] pl-11 pr-11 rounded-xl font-medium text-[17px] outline-none transition-all ${settings.highVisibilityMode ? 'bg-white border-4 border-black text-black' : 'bg-gray-100 border-none text-black'} placeholder:text-gray-400`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            {query ? (
              <button 
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 p-1"
              >
                <X size={20} />
              </button>
            ) : (
              <Mic className={`absolute right-4 top-1/2 -translate-y-1/2 ${isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} size={20} />
            )}
          </div>
        </form>

        {aiTip && (
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-lg animate-in fade-in slide-in-from-bottom duration-500">
             <div className="flex gap-2 items-center mb-1.5">
                <Sparkles size={16} className="text-blue-100" />
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-100">Apple Intelligence</span>
             </div>
             <p className="font-semibold text-[15px] leading-snug">{aiTip}</p>
          </div>
        )}

        {/* Results Area */}
        {searchResults !== null ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center">
              <h2 className="text-[22px] font-bold text-black">
                {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'}
              </h2>
              <button onClick={clearSearch} className="text-blue-500 font-bold text-[15px]">Cancel</button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className={`grid ${gridCols} gap-0.5 -mx-5`}>
                {searchResults.map((photo) => (
                  <div 
                    key={photo.id} 
                    className="aspect-square relative cursor-pointer active:opacity-80 transition-opacity overflow-hidden bg-gray-100"
                    onClick={() => {
                      setSelectedPhoto(photo);
                      setView('detail');
                    }}
                  >
                    <img 
                      src={photo.url} 
                      alt="Search Result" 
                      className="w-full h-full object-cover"
                    />
                    {photo.isProRAW && (
                      <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm border border-white/10 uppercase tracking-tighter">
                        RAW
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <LayoutGrid size={32} />
                </div>
                <p className="text-gray-400 font-bold">No photos found for "{query}"</p>
              </div>
            )}
          </div>
        ) : (
          /* Empty State: Suggestions & Recents */
          <div className="space-y-10 animate-in fade-in duration-300">
            <div className="space-y-4">
              <h2 className="text-[22px] font-bold text-black">Curated Collections</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Pets', query: 'Dogs and cats' },
                  { label: 'Nature', query: 'Nature and landscapes' },
                  { label: 'Travel', query: 'Photos from my trips' },
                  { label: 'ProRAW', query: 'Professional RAW shots' }
                ].map(s => (
                  <button 
                    key={s.label} 
                    onClick={() => handleSuggestionClick(s.query)}
                    className={`p-5 rounded-2xl border flex flex-col items-start gap-4 active:bg-gray-100 transition-colors text-left ${settings.highVisibilityMode ? 'bg-white border-4 border-black shadow-none' : 'bg-gray-50 border-gray-100'}`}
                  >
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.highVisibilityMode ? 'bg-black text-white' : 'bg-blue-500/10 text-blue-500'}`}>
                        <Sparkles size={20} />
                     </div>
                     <span className={`font-bold text-[17px] ${settings.highVisibilityMode ? 'text-black' : 'text-black'}`}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h2 className="text-[22px] font-bold text-black">Recent Searches</h2>
              <div className={`rounded-2xl divide-y overflow-hidden ${settings.highVisibilityMode ? 'border-4 border-black bg-white divide-black' : 'bg-gray-50 border border-gray-100 divide-gray-200/50'}`}>
                 {['New York', 'Last week', 'Sunset'].map(item => (
                   <button 
                    key={item} 
                    onClick={() => handleSuggestionClick(item)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-100 transition-colors text-left"
                   >
                     <Clock size={18} className="text-gray-400" />
                     <span className="text-[17px] font-medium text-black">{item}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
