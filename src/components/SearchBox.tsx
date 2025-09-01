import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface SearchBoxProps {
  onSearch: (query: string) => void;
  onVideoSelect?: (video: Video) => void;
  videos?: Video[];
}

export const SearchBox = ({ onSearch, onVideoSelect, videos = [] }: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestions based on query (title only)
  const suggestions = query.trim().length > 0 
    ? videos.filter(video =>
        video.title.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5) // Limit to 5 suggestions
    : [];

  console.log('Query:', query, 'Suggestions found:', suggestions.length);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.trim().length > 0);
    setSelectedIndex(-1);
  };

  const handleSuggestionClick = (suggestion: Video) => {
    console.log('Suggestion clicked:', suggestion.title);
    console.log('onVideoSelect available:', !!onVideoSelect);
    
    setQuery(suggestion.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    if (onVideoSelect) {
      console.log('Calling onVideoSelect');
      onVideoSelect(suggestion);
    } else {
      console.log('Calling onSearch');
      onSearch(suggestion.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Hide suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        // Don't hide if clicking on a suggestion
        const target = event.target as Element;
        if (target.closest('[data-suggestion]')) {
          return;
        }
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto relative">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Ask a question about your issue..."
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            className="pl-12 pr-20 py-6 text-lg bg-input border-border rounded-2xl shadow-[var(--isdb-search-shadow)] transition-[var(--transition-smooth)] focus:shadow-[var(--isdb-hover-shadow)] focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary hover:bg-primary-glow rounded-xl transition-[var(--transition-smooth)] text-primary-foreground font-medium"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              data-suggestion="true"
              onMouseDown={(e) => {
                e.preventDefault();
                handleSuggestionClick(suggestion);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0 ${
                index === selectedIndex ? 'bg-accent' : ''
              }`}
            >
              <div className="font-medium text-card-foreground">
                {suggestion.title}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};