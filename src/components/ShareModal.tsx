import { useState } from 'react';
import { X, Users, Lock, Eye, Edit2, Copy, CheckCircle } from 'lucide-react';
import type { Document, AccessLevel } from '../types';
import { mockUsers } from '../data/mockData';
import './ShareModal.css';

interface ShareModalProps {
  document: Document;
  onClose: () => void;
  onShare: (userId: string, accessLevel: AccessLevel) => void;
}

export const ShareModal = ({ document, onClose, onShare }: ShareModalProps) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('viewer');
  const [linkCopied, setLinkCopied] = useState(false);

  const availableUsers = mockUsers.filter(
    (user) => !document.sharedWith.some((shared) => shared.user.id === user.id)
  );

  const handleShare = () => {
    if (selectedUser) {
      onShare(selectedUser, accessLevel);
      setSelectedUser('');
      setAccessLevel('viewer');
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(`https://lexentra.app/share/${document.id}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const getAccessIcon = (level: AccessLevel) => {
    switch (level) {
      case 'owner':
        return <Lock size={14} />;
      case 'editor':
        return <Edit2 size={14} />;
      case 'viewer':
        return <Eye size={14} />;
      default:
        return <Lock size={14} />;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Share Document</h2>
            <p className="document-title">{document.name}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="share-section">
            <h3>
              <Users size={16} /> Add People
            </h3>
            <div className="share-input-group">
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="user-select"
              >
                <option value="">Select a user...</option>
                {availableUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as AccessLevel)}
                className="access-select"
              >
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </select>
              <button
                className="btn-primary"
                onClick={handleShare}
                disabled={!selectedUser}
              >
                Share
              </button>
            </div>
          </div>

          {document.sharedWith.length > 0 && (
            <div className="share-section">
              <h3>Shared With</h3>
              <div className="shared-users-list">
                {document.sharedWith.map(({ user, accessLevel }) => (
                  <div key={user.id} className="shared-user-item">
                    <div className="user-info">
                      {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="user-avatar" />
                      )}
                      <div>
                        <p className="user-name">{user.name}</p>
                        <p className="user-email">{user.email}</p>
                      </div>
                    </div>
                    <div className="access-badge">
                      {getAccessIcon(accessLevel)}
                      <span>{accessLevel}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="share-section">
            <h3>Share Link</h3>
            <div className="share-link-group">
              <input
                type="text"
                value={`https://lexentra.app/share/${document.id}`}
                readOnly
                className="link-input"
              />
              <button className="btn-secondary" onClick={copyShareLink}>
                {linkCopied ? (
                  <>
                    <CheckCircle size={16} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copy
                  </>
                )}
              </button>
            </div>
            <p className="link-hint">Anyone with this link can view this document</p>
          </div>
        </div>
      </div>
    </div>
  );
};
