import { ChevronRight, Folder as FolderIcon, Home, FileText } from 'lucide-react';
import type { Folder, Document } from '../types';
import { getFolderPath, getSubfolders } from '../utils/helpers';
import './FolderView.css';

interface FolderViewProps {
  folders: Folder[];
  documents: Document[];
  currentFolderId: string | null;
  onFolderClick: (folderId: string | null) => void;
}

export const FolderView = ({ folders, documents, currentFolderId, onFolderClick }: FolderViewProps) => {
  const folderPath = getFolderPath(currentFolderId, folders);
  const subfolders = getSubfolders(currentFolderId, folders);

  // Count documents in a folder (including subfolders)
  const getDocumentCount = (folderId: string): number => {
    const directDocs = documents.filter(doc => doc.folderId === folderId).length;
    const subfolderIds = folders.filter(f => f.parentId === folderId).map(f => f.id);
    const subfolderDocs = subfolderIds.reduce((total, id) => total + getDocumentCount(id), 0);
    return directDocs + subfolderDocs;
  };

  return (
    <div className="folder-view">
      <div className="breadcrumb">
        <button
          className="breadcrumb-item"
          onClick={() => onFolderClick(null)}
        >
          <Home size={16} />
          <span>Root</span>
        </button>
        {folderPath.map((folder) => (
          <div key={folder.id} className="breadcrumb-segment">
            <ChevronRight size={16} className="breadcrumb-separator" />
            <button
              className="breadcrumb-item"
              onClick={() => onFolderClick(folder.id)}
            >
              <FolderIcon size={16} />
              <span>{folder.name}</span>
            </button>
          </div>
        ))}
      </div>

      {subfolders.length > 0 && (
        <div className="folders-grid">
          {subfolders.map((folder) => {
            const docCount = getDocumentCount(folder.id);
            return (
              <div
                key={folder.id}
                className="folder-card"
                onClick={() => onFolderClick(folder.id)}
              >
                <div
                  className="folder-icon"
                  style={{ backgroundColor: `${folder.color}20` }}
                >
                  <FolderIcon size={32} style={{ color: folder.color }} />
                </div>
                <div className="folder-info">
                  <h3>{folder.name}</h3>
                  <p>{new Date(folder.updatedAt).toLocaleDateString()}</p>
                </div>
                {docCount > 0 && (
                  <div className="folder-badge">
                    <FileText size={14} />
                    <span>{docCount} document{docCount !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {subfolders.length === 0 && currentFolderId && documents.filter(doc => doc.folderId === currentFolderId).length === 0 && (
        <div className="empty-folder">
          <FolderIcon size={48} />
          <p>This folder is empty</p>
        </div>
      )}
    </div>
  );
};
