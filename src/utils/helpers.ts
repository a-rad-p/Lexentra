import type { Document, Folder, SearchFilters } from '../types';

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFileIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📊',
    pptx: '📊',
    txt: '📃',
    md: '📋',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    zip: '📦',
  };
  return iconMap[type.toLowerCase()] || '📄';
};

export const getFileTypeColor = (type: string): string => {
  const colorMap: Record<string, string> = {
    pdf: '#ef4444',
    doc: '#3b82f6',
    docx: '#3b82f6',
    xls: '#10b981',
    xlsx: '#10b981',
    ppt: '#f97316',
    pptx: '#f97316',
    txt: '#64748b',
    md: '#8b5cf6',
    jpg: '#ec4899',
    jpeg: '#ec4899',
    png: '#ec4899',
    gif: '#ec4899',
    zip: '#f59e0b',
  };
  return colorMap[type.toLowerCase()] || '#64748b';
};

export const searchDocuments = (
  documents: Document[],
  filters: SearchFilters
): Document[] => {
  let filtered = [...documents];

  // Text search with AI-like scoring
  if (filters.query) {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(doc => {
      const searchableText = `${doc.name} ${doc.description || ''} ${doc.tags.map(t => t.name).join(' ')}`.toLowerCase();
      return searchableText.includes(query);
    });
  }

  // Filter by type
  if (filters.type && filters.type.length > 0) {
    filtered = filtered.filter(doc => filters.type!.includes(doc.type));
  }

  // Filter by tags
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(doc =>
      doc.tags.some(tag => filters.tags!.includes(tag.id))
    );
  }

  // Filter by folder
  if (filters.folderId !== undefined) {
    filtered = filtered.filter(doc => doc.folderId === filters.folderId);
  }

  // Filter by date range
  if (filters.dateRange) {
    filtered = filtered.filter(doc => {
      const docDate = new Date(doc.createdAt);
      return docDate >= filters.dateRange!.start && docDate <= filters.dateRange!.end;
    });
  }

  // Filter by creator
  if (filters.createdBy && filters.createdBy.length > 0) {
    filtered = filtered.filter(doc =>
      filters.createdBy!.includes(doc.createdBy.id)
    );
  }

  // Sort
  const sortBy = filters.sortBy || 'date';
  const sortOrder = filters.sortOrder || 'desc';

  filtered.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'date':
        comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        break;
      case 'size':
        comparison = a.size - b.size;
        break;
      case 'relevance':
        // Simple relevance based on query match in name vs description
        if (filters.query) {
          const queryLower = filters.query.toLowerCase();
          const aNameMatch = a.name.toLowerCase().includes(queryLower);
          const bNameMatch = b.name.toLowerCase().includes(queryLower);
          if (aNameMatch && !bNameMatch) comparison = -1;
          else if (!aNameMatch && bNameMatch) comparison = 1;
        }
        break;
    }

    return sortOrder === 'asc' ? comparison : -comparison;
  });

  return filtered;
};

export const getFolderPath = (
  folderId: string | null,
  folders: Folder[]
): Folder[] => {
  if (!folderId) return [];
  
  const path: Folder[] = [];
  let currentId: string | null = folderId;
  
  while (currentId) {
    const folder = folders.find(f => f.id === currentId);
    if (!folder) break;
    path.unshift(folder);
    currentId = folder.parentId;
  }
  
  return path;
};

export const getSubfolders = (
  parentId: string | null,
  folders: Folder[]
): Folder[] => {
  return folders.filter(folder => folder.parentId === parentId);
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};
