import { useState } from 'react';
import { X, Upload, FolderOpen, FileText, Tag as TagIcon } from 'lucide-react';
import type { Folder, Tag } from '../types';
import './UploadModal.css';

interface UploadModalProps {
  folders: Folder[];
  tags: Tag[];
  onClose: () => void;
  onUpload: (file: File, folderId: string | null, description: string, tagIds: string[]) => void;
  initialFolderId?: string | null;
}

export const UploadModal = ({ folders, tags, onClose, onUpload, initialFolderId }: UploadModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [folderId, setFolderId] = useState<string | null>(initialFolderId || null);
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file, folderId, description, selectedTags);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Upload Document</h2>
            <p className="subtitle">Add files to your document library</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div
            className={`upload-area ${dragActive ? 'drag-active' : ''} ${file ? 'has-file' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="file-selected">
                <FileText size={48} />
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                <button
                  className="btn-secondary"
                  onClick={() => setFile(null)}
                >
                  Remove File
                </button>
              </div>
            ) : (
              <>
                <Upload size={48} />
                <p className="upload-text">Drag and drop your file here</p>
                <p className="upload-hint">or</p>
                <label className="file-input-label">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  Browse Files
                </label>
              </>
            )}
          </div>

          <div className="form-section">
            <label>
              <FolderOpen size={16} /> Folder (Optional)
            </label>
            <select
              value={folderId || ''}
              onChange={(e) => setFolderId(e.target.value || null)}
              className="form-select"
            >
              <option value="">Root / No Folder</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-section">
            <label>
              <FileText size={16} /> Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="Add a description for this document..."
              rows={3}
            />
          </div>

          <div className="form-section">
            <label>
              <TagIcon size={16} /> Tags (Optional)
            </label>
            <div className="tags-selector">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  className={`tag-chip ${selectedTags.includes(tag.id) ? 'selected' : ''}`}
                  onClick={() => toggleTag(tag.id)}
                  style={{
                    borderColor: selectedTags.includes(tag.id) ? tag.color : undefined,
                    backgroundColor: selectedTags.includes(tag.id) ? `${tag.color}20` : undefined,
                    color: selectedTags.includes(tag.id) ? tag.color : undefined,
                  }}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={!file}
          >
            <Upload size={18} /> Upload Document
          </button>
        </div>
      </div>
    </div>
  );
};
