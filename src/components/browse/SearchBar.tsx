import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = '용어 검색 (한글, 영어, 초성)', className }: SearchBarProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <Search size={18} className="absolute left-3 text-gray-400 pointer-events-none" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors"
        style={{ fontSize: '16px' }}
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-3 text-gray-400 touch-manipulation">
          <X size={16} />
        </button>
      )}
    </div>
  );
}
