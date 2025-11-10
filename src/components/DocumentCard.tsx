import { useState } from 'react';
import { 
  File, MoreVertical, Star, Share2, Download, Trash2, 
  Eye, Edit, Tag as TagIcon, Clock, User, FileText, Image as ImageIcon
} from 'lucide-react';
import { format } from 'date-fns';
import type { Document } from '../types';
import { formatFileSize, getFileIcon, getFileTypeColor } from '../utils/helpers';
import './DocumentCard.css';

interface DocumentCardProps {
  document: Document;
  onFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onPreview: (document: Document) => void;
  onShare: (document: Document) => void;
}

export const DocumentCard = ({
  document,
  onFavorite,
  onDelete,
  onPreview,
  onShare,
}: DocumentCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  // Render thumbnail preview for supported file types
  const renderThumbnail = () => {
    if (!document.url && !document.content) {
      return null;
    }

    const fileUrl = document.url || document.content;
    const fileType = document.type.toLowerCase();

    // Image preview
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(fileType)) {
      return (
        <div className="card-thumbnail">
          <img src={fileUrl} alt={document.name} />
        </div>
      );
    }

    // PDF preview icon
    if (fileType === 'pdf') {
      return (
        <div className="card-thumbnail pdf-thumb">
          <FileText size={48} />
          <span>PDF</span>
        </div>
      );
    }

    // Text file preview
    if (['txt', 'md', 'json', 'csv', 'xml', 'html', 'css', 'js', 'ts'].includes(fileType)) {
      return (
        <div className="card-thumbnail text-thumb">
          <FileText size={48} />
          <span>{fileType.toUpperCase()}</span>
        </div>
      );
    }

    // Video preview
    if (['mp4', 'webm', 'ogg', 'mov'].includes(fileType)) {
      return (
        <div className="card-thumbnail video-thumb">
          <video src={fileUrl} />
          <div className="video-overlay">▶</div>
        </div>
      );
    }

    // Audio preview
    if (['mp3', 'wav', 'ogg', 'm4a'].includes(fileType)) {
      return (
        <div className="card-thumbnail audio-thumb">
          <ImageIcon size={48} />
          <span>AUDIO</span>
        </div>
      );
    }

    return null;
  };

  const hasThumbnail = document.url || document.content;

  return (
    <div className="document-card" onClick={() => onPreview(document)}>
      <div className="card-header">
        {hasThumbnail ? (
          renderThumbnail()
        ) : (
          <div className="file-icon" style={{ backgroundColor: `${getFileTypeColor(document.type)}20` }}>
            <span style={{ fontSize: '2rem' }}>{getFileIcon(document.type)}</span>
          </div>
        )}
        <div className="card-actions">
          <button
            className={`favorite-btn ${document.isFavorite ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(document.id);
            }}
            title={document.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star size={18} fill={document.isFavorite ? '#f59e0b' : 'none'} />
          </button>
          <div className="menu-wrapper">
            <button className="menu-btn" onClick={handleMenuClick}>
              <MoreVertical size={18} />
            </button>
            {showMenu && (
              <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => { onPreview(document); setShowMenu(false); }}>
                  <Eye size={16} /> Preview
                </button>
                <button onClick={() => { onShare(document); setShowMenu(false); }}>
                  <Share2 size={16} /> Share
                </button>
                <button>
                  <Download size={16} /> Download
                </button>
                <button>
                  <Edit size={16} /> Rename
                </button>
                <button>
                  <TagIcon size={16} /> Manage Tags
                </button>
                <button className="delete-btn" onClick={() => { onDelete(document.id); setShowMenu(false); }}>
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card-body">
        <h3 className="document-name" title={document.name}>{document.name}</h3>
        <p className="document-description">{document.description || 'No description'}</p>
        
        <div className="document-tags">
          {document.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="tag"
              style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
            >
              {tag.name}
            </span>
          ))}
          {document.tags.length > 3 && (
            <span className="tag more">+{document.tags.length - 3}</span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="meta-item">
          <File size={14} />
          <span>{formatFileSize(document.size)}</span>
        </div>
        <div className="meta-item">
          <Clock size={14} />
          <span>{format(new Date(document.updatedAt), 'MMM d, yyyy')}</span>
        </div>
        <div className="meta-item" title={`Created by ${document.createdBy.name}`}>
          <User size={14} />
          <span>{document.createdBy.name.split(' ')[0]}</span>
        </div>
      </div>

      {document.sharedWith.length > 0 && (
        <div className="shared-indicator">
          <Share2 size={12} />
          <span>{document.sharedWith.length}</span>
        </div>
      )}

      {document.version > 1 && (
        <div className="version-badge">v{document.version}</div>
      )}
    </div>
  );
};
