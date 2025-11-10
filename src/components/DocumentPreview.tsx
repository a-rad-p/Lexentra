import { X, Download, Share2, Star, Edit, Trash2, File, Calendar, User, Tag as TagIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { Document } from '../types';
import { formatFileSize, getFileIcon } from '../utils/helpers';
import './DocumentPreview.css';

interface DocumentPreviewProps {
  document: Document;
  onClose: () => void;
  onFavorite: (id: string) => void;
  onShare: (doc: Document) => void;
  onDelete: (id: string) => void;
}

export const DocumentPreview = ({
  document,
  onClose,
  onFavorite,
  onShare,
  onDelete,
}: DocumentPreviewProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-header">
          <div className="header-info">
            <span className="file-icon-large">{getFileIcon(document.type)}</span>
            <div>
              <h2>{document.name}</h2>
              <p className="file-meta">
                {formatFileSize(document.size)} • {document.type.toUpperCase()} • v{document.version}
              </p>
            </div>
          </div>
          <div className="header-actions">
            <button
              className={`action-btn ${document.isFavorite ? 'active' : ''}`}
              onClick={() => onFavorite(document.id)}
              title="Favorite"
            >
              <Star size={20} fill={document.isFavorite ? '#f59e0b' : 'none'} />
            </button>
            <button className="action-btn" onClick={() => onShare(document)} title="Share">
              <Share2 size={20} />
            </button>
            <button className="action-btn" title="Download">
              <Download size={20} />
            </button>
            <button className="action-btn" title="Edit">
              <Edit size={20} />
            </button>
            <button className="action-btn delete" onClick={() => { onDelete(document.id); onClose(); }} title="Delete">
              <Trash2 size={20} />
            </button>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="preview-body">
          <div className="preview-content">
            <div className="preview-area">
              {document.type === 'md' && document.content ? (
                <div className="markdown-preview">
                  <pre>{document.content}</pre>
                </div>
              ) : document.type.match(/jpg|jpeg|png|gif/) ? (
                <div className="image-preview">
                  <div className="placeholder-image">
                    <span style={{ fontSize: '5rem' }}>{getFileIcon(document.type)}</span>
                    <p>Image Preview</p>
                  </div>
                </div>
              ) : (
                <div className="file-preview-placeholder">
                  <span style={{ fontSize: '6rem' }}>{getFileIcon(document.type)}</span>
                  <h3>Preview not available</h3>
                  <p>This file type doesn't support preview. Please download to view.</p>
                  <button className="btn-primary">
                    <Download size={18} /> Download File
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="preview-sidebar">
            <div className="sidebar-section">
              <h3>Details</h3>
              <div className="detail-item">
                <File size={16} />
                <div>
                  <span className="label">Type</span>
                  <span className="value">{document.type.toUpperCase()} Document</span>
                </div>
              </div>
              <div className="detail-item">
                <File size={16} />
                <div>
                  <span className="label">Size</span>
                  <span className="value">{formatFileSize(document.size)}</span>
                </div>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <div>
                  <span className="label">Created</span>
                  <span className="value">{format(new Date(document.createdAt), 'PPP')}</span>
                </div>
              </div>
              <div className="detail-item">
                <Calendar size={16} />
                <div>
                  <span className="label">Modified</span>
                  <span className="value">{format(new Date(document.updatedAt), 'PPP')}</span>
                </div>
              </div>
              <div className="detail-item">
                <User size={16} />
                <div>
                  <span className="label">Owner</span>
                  <span className="value">{document.createdBy.name}</span>
                </div>
              </div>
            </div>

            {document.description && (
              <div className="sidebar-section">
                <h3>Description</h3>
                <p className="description">{document.description}</p>
              </div>
            )}

            <div className="sidebar-section">
              <h3>
                <TagIcon size={16} /> Tags
              </h3>
              <div className="tags-list">
                {document.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="tag"
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
                {document.tags.length === 0 && (
                  <p className="empty-state">No tags</p>
                )}
              </div>
            </div>

            {document.sharedWith.length > 0 && (
              <div className="sidebar-section">
                <h3>Shared With</h3>
                <div className="shared-list">
                  {document.sharedWith.map(({ user, accessLevel }) => (
                    <div key={user.id} className="shared-item">
                      {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="avatar" />
                      )}
                      <div className="shared-info">
                        <p className="name">{user.name}</p>
                        <p className="access">{accessLevel}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
