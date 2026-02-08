
import React from 'react';
import { useSettings } from '../store/context';

interface AccessibleButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  onClick,
  onMouseDown,
  onMouseUp,
  label,
  icon,
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const { settings } = useSettings();
  
  // DR-3.1: 12pt radius (approx 26-28px in this scale), 8pt internal padding.
  const baseClasses = "flex items-center justify-center gap-2 rounded-[26px] font-bold transition-all active:scale-[0.98] active:opacity-90 focus:outline-none focus:ring-4 focus:ring-blue-500/50 select-none cursor-pointer overflow-hidden";
  
  // FR-1.2: Minimum 44x44pt touch targets. 
  // Optimization: Reduced horizontal padding from px-6 to px-4 to prevent truncation in multi-button layouts.
  const sizeClasses = settings.highVisibilityMode 
    ? "h-[72px] px-3 text-lg" 
    : "h-[56px] px-4 text-[15px]";

  const variantClasses = {
    // DR-1.3: Primary action color iOS system blue (#007AFF)
    primary: "bg-[#007AFF] text-white shadow-lg border border-blue-600/20",
    
    // Updated to match 'Info' button inactive state: translucent white background with gray text.
    secondary: settings.highVisibilityMode 
      ? "bg-white text-black border-[3px] border-black" 
      : "bg-white/10 text-gray-300 backdrop-blur-xl border border-white/5",
    
    destructive: settings.highVisibilityMode
      ? "bg-[#FF3B30] text-white shadow-lg border-[3px] border-black"
      : "bg-white/10 text-[#FF3B30] backdrop-blur-xl border border-white/5",
    
    outline: "bg-transparent text-[#007AFF] border-2 border-[#007AFF]",
    
    ghost: "bg-transparent text-gray-400 hover:bg-white/10"
  };

  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
      aria-label={label}
    >
      {icon && <span className={`${settings.highVisibilityMode ? "scale-110" : ""} shrink-0 flex items-center justify-center`}>{icon}</span>}
      <span className="whitespace-nowrap font-black tracking-tight">{label}</span>
    </button>
  );
};
