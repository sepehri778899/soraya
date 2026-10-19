import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (newTags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  colorTheme?: 'workforce' | 'services' | 'coach' | 'training';
}

export const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  onChange,
  placeholder = 'تایپ کنید و اینتر یا دکمه افزودن را بزنید...',
  suggestions = [],
  colorTheme = 'workforce'
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleAddSuggestion = (item: string) => {
    if (!tags.includes(item)) {
      onChange([...tags, item]);
    }
  };

  const getTagStyle = () => {
    switch (colorTheme) {
      case 'workforce':
        return 'bg-emerald-50 text-emerald-900 border-emerald-200';
      case 'services':
        return 'bg-amber-50 text-amber-900 border-amber-200';
      case 'coach':
        return 'bg-blue-50 text-blue-900 border-blue-200';
      case 'training':
        return 'bg-purple-50 text-purple-900 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-stone-700">{label}</label>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-400 text-stone-800 transition-all"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          افزودن
        </button>
      </div>

      {/* Suggestions if any */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-stone-600">پیشنهادها:</span>
          {suggestions
            .filter(s => !tags.includes(s))
            .slice(0, 5)
            .map(s => (
              <button
                key={s}
                type="button"
                onClick={() => handleAddSuggestion(s)}
                className="text-[11px] px-2 py-0.5 rounded-md bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 hover:text-stone-900 transition-colors"
              >
                + {s}
              </button>
            ))}
        </div>
      )}

      {/* Render current tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1.5">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border font-normal ${getTagStyle()}`}
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="hover:opacity-75 transition-opacity"
                aria-label={`حذف ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
