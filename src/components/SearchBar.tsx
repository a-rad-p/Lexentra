import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import type { SearchFilters, Tag, DocumentType } from '../types';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  tags: Tag[];
}

export const SearchBar = ({ onSearch, tags }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<DocumentType[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'relevance'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const documentTypes: DocumentType[] = ['pdf', 'docx', 'xlsx', 'pptx', 'txt', 'md', 'png', 'jpg'];

  const handleSearch = () => {
    onSearch({
      query,
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      type: selectedTypes.length > 0 ? selectedTypes : undefined,
      sortBy,
      sortOrder,
    });
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const toggleType = (type: DocumentType) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedTypes([]);
    setSortBy('date');
    setSortOrder('desc');
    setQuery('');
    onSearch({ query: '', sortBy: 'date', sortOrder: 'desc' });
  };

  const hasActiveFilters = selectedTags.length > 0 || selectedTypes.length > 0;

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Search documents... (AI-powered)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
        <div className="search-actions">
          {hasActiveFilters && (
            <button className="clear-btn" onClick={clearFilters} title="Clear filters">
              <X size={18} />
            </button>
          )}
          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
            title="Advanced filters"
          >
            <SlidersHorizontal size={18} />
            {hasActiveFilters && <span className="filter-badge">{selectedTags.length + selectedTypes.length}</span>}
          </button>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-section">
            <h4>
              <Filter size={16} /> Sort By
            </h4>
            <div className="sort-controls">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
                <option value="relevance">Relevance</option>
                <option value="date">Date Modified</option>
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)}>
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          <div className="filter-section">
            <h4>File Types</h4>
            <div className="filter-chips">
              {documentTypes.map((type) => (
                <button
                  key={type}
                  className={`chip ${selectedTypes.includes(type) ? 'active' : ''}`}
                  onClick={() => toggleType(type)}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4>Tags</h4>
            <div className="filter-chips">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`chip ${selectedTags.includes(tag.id) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  style={{
                    borderColor: selectedTags.includes(tag.id) ? tag.color : undefined,
                    backgroundColor: selectedTags.includes(tag.id) ? `${tag.color}20` : undefined,
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
