import { ChevronRight, Folder as FolderIcon, Home } from 'lucide-react';
import type { Folder } from '../types';
import { getFolderPath, getSubfolders } from '../utils/helpers';
import './FolderView.css';

interface FolderViewProps {
  folders: Folder[];
  currentFolderId: string | null;
  onFolderClick: (folderId: string | null) => void;
}

export const FolderView = ({ folders, currentFolderId, onFolderClick }: FolderViewProps) => {
  const folderPath = getFolderPath(currentFolderId, folders);
  const subfolders = getSubfolders(currentFolderId, folders);

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
          {subfolders.map((folder) => (
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
            </div>
          ))}
        </div>
      )}

      {subfolders.length === 0 && currentFolderId && (
        <div className="empty-folder">
          <FolderIcon size={48} />
          <p>This folder is empty</p>
        </div>
      )}
    </div>
  );
};
