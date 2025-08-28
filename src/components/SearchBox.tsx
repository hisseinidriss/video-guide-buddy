import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative">
          <Input
            type="text"
            placeholder="Ask a question about your issue..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-20 py-6 text-lg bg-input border-border rounded-2xl shadow-[var(--kb-search-shadow)] transition-[var(--transition-smooth)] focus:shadow-[var(--kb-hover-shadow)] focus:ring-2 focus:ring-primary/20 focus:border-primary/30"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Button
            type="submit"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary hover:bg-primary-glow rounded-xl transition-[var(--transition-smooth)]"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};