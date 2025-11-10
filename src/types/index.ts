export type DocumentType = 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'ppt' | 'pptx' | 'txt' | 'md' | 'jpg' | 'jpeg' | 'png' | 'gif' | 'zip' | 'other';

export type AccessLevel = 'owner' | 'editor' | 'viewer' | 'restricted';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  department?: string;
  title?: string;
  status?: 'online' | 'offline' | 'away';
  lastActive?: Date;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  folderId: string | null;
  tags: Tag[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  sharedWith: { user: User; accessLevel: AccessLevel }[];
  description?: string;
  content?: string; // For preview purposes
  url?: string; // For actual file storage
  isFavorite: boolean;
  version: number;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  createdBy: User;
  color?: string;
  icon?: string;
}

export interface SearchFilters {
  query: string;
  type?: DocumentType[];
  tags?: string[];
  folderId?: string | null;
  dateRange?: { start: Date; end: Date };
  createdBy?: string[];
  sortBy?: 'name' | 'date' | 'size' | 'relevance';
  sortOrder?: 'asc' | 'desc';
}

export interface ActivityLog {
  id: string;
  type: 'upload' | 'edit' | 'delete' | 'share' | 'move' | 'rename' | 'tag';
  documentId?: string;
  folderId?: string;
  user: User;
  timestamp: Date;
  description: string;
}
