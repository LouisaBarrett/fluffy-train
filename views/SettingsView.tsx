
import React from 'react';
import { useSettings } from '../store/context';
import { Eye, Zap, ShieldCheck, Globe, FileText, ChevronRight } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useSettings();

  const toggleHighVis = () => updateSettings({ highVisibilityMode: !settings.highVisibilityMode });
  const togglePro = () => updateSettings({ proMode: !settings.proMode });

  const ListRow = ({ icon: Icon, color, title, subtitle, action, isSwitch = false, isActive = false, onClick }: any) => (
    <div 
      className={`flex items-center justify-between py-3 px-4 active:bg-gray-100 transition-colors cursor-pointer group ${onClick ? '' : 'pointer-events-none'}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center text-white`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-[17px] font-semibold text-black leading-tight">{title}</p>
          {subtitle && <p className="text-[13px] text-gray-500 font-medium mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {isSwitch ? (
        <button 
          onClick={(e) => { e.stopPropagation(); action(); }}
          className={`w-[51px] h-[31px] rounded-full transition-all relative ${isActive ? 'bg-[#34C759]' : 'bg-gray-200'}`}
        >
          <div className={`absolute top-[2px] left-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-md transition-transform duration-200 ${isActive ? 'translate-x-[20px]' : ''}`} />
        </button>
      ) : (
        <ChevronRight size={18} className="text-gray-300" />
      )}
    </div>
  );

  return (
    <div className={`min-h-full pb-32 ${settings.highVisibilityMode ? 'bg-white' : 'bg-[#F2F2F7]'}`}>
      <header className="px-5 pt-16 pb-6">
        <h1 className="text-[34px] font-extrabold tracking-tight text-black">Settings</h1>
      </header>

      <div className="space-y-9 px-4">
        {/* Accessibility Section */}
        <section className="space-y-2">
          <h2 className="px-4 text-[13px] font-medium uppercase text-gray-500 tracking-wider">Accessibility</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100 border border-gray-100">
            <ListRow 
              icon={Eye} 
              color="bg-blue-500" 
              title="High Visibility" 
              subtitle="Boost contrast to 10:1 (WCAG AAA)" 
              action={toggleHighVis} 
              isSwitch 
              isActive={settings.highVisibilityMode}
              onClick={toggleHighVis}
            />
          </div>
          <p className="px-4 text-[13px] text-gray-500 leading-relaxed">
            High Visibility mode increases button size and boosts contrast to meet strict Level AAA standards.
          </p>
        </section>

        {/* Professional Workflow Section */}
        <section className="space-y-2">
          <h2 className="px-4 text-[13px] font-medium uppercase text-gray-500 tracking-wider">Professional Workflow</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100 border border-gray-100">
            <ListRow 
              icon={Zap} 
              color="bg-orange-500" 
              title="ProRAW Pure" 
              subtitle="Disable all automatic AI enhancements" 
              action={togglePro} 
              isSwitch 
              isActive={settings.proMode}
              onClick={togglePro}
            />
            <ListRow 
              icon={Globe} 
              color="bg-indigo-500" 
              title="Color Management" 
              subtitle="Default: Display P3" 
              onClick={() => {}}
            />
            <ListRow 
              icon={FileText} 
              color="bg-gray-500" 
              title="Export Presets" 
              subtitle="Lossless TIFF / 100% JPG" 
              onClick={() => {}}
            />
          </div>
        </section>

        {/* Intelligence Privacy Section */}
        <section className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shrink-0">
             <ShieldCheck size={28} className="text-white" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-black">Privacy First</h3>
            <p className="text-[14px] text-gray-600 font-medium leading-snug">
              On-device intelligence manages duplicates and professional pipelines. No data ever leaves your secure enclave.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
