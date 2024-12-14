import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SettingsToggleProps {
  icon: LucideIcon;
  label: string;
  value: string;
  onClick: () => void;
}

export function SettingsToggle({ icon: Icon, label, value, onClick }: SettingsToggleProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-900 dark:text-white">{label}</span>
      </div>
      <span className="text-sm text-gray-500">{value}</span>
    </button>
  );
}