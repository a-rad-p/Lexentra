import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { DocumentCard } from './components/DocumentCard';
import { DocumentPreview } from './components/DocumentPreview';
import { ShareModal } from './components/ShareModal';
import { UploadModal } from './components/UploadModal';
import { FolderView } from './components/FolderView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { searchDocuments, fileToBase64 } from './utils/helpers';
import type { Document, SearchFilters, AccessLevel } from './types';
import './App.css';

function App() {
  const {
    documents,
    folders,
    tags,
    activityLog,
    addDocument,
    updateDocument,
    deleteDocument,
    addFolder,
  } = useLocalStorage();

  const [activeView, setActiveView] = useState('home');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({ query: '', sortBy: 'date', sortOrder: 'desc' });
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  const [shareDocument, setShareDocument] = useState<Document | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  const filteredDocuments = searchDocuments(documents, {
    ...searchFilters,
    folderId: activeView === 'folders' ? currentFolderId : undefined,
  });

  const displayDocuments = () => {
    switch (activeView) {
      case 'favorites':
        return filteredDocuments.filter(doc => doc.isFavorite);
      case 'shared':
        return filteredDocuments.filter(doc => doc.sharedWith.length > 0);
      case 'folders':
        return filteredDocuments;
      default:
        return filteredDocuments;
    }
  };

  const handleFavoriteToggle = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc) {
      updateDocument(id, { isFavorite: !doc.isFavorite });
    }
  };

  const handleShare = (userId: string, accessLevel: AccessLevel) => {
    if (shareDocument) {
      const user = { id: userId, name: 'User', email: 'user@example.com', role: 'user' as const };
      const newSharedWith = [...shareDocument.sharedWith, { user, accessLevel }];
      updateDocument(shareDocument.id, { sharedWith: newSharedWith });
    }
  };

  const handleUpload = async (file: File, folderId: string | null, description: string, tagIds: string[]) => {
    const selectedTags = tags.filter(tag => tagIds.includes(tag.id));
    const fileType = file.name.split('.').pop() || 'other';
    
    // Convert file to base64 for storage
    let fileContent: string | undefined;
    try {
      fileContent = await fileToBase64(file);
    } catch (error) {
      console.error('Error converting file to base64:', error);
    }
    
    addDocument({
      name: file.name,
      type: fileType as any,
      size: file.size,
      folderId,
      tags: selectedTags,
      description,
      sharedWith: [],
      isFavorite: false,
      content: fileContent, // Store the base64 content
      url: fileContent, // Also use as URL for preview
    });
    
    setShowUploadModal(false);
  };

  const handleNewFolder = () => {
    const folderName = prompt('Enter folder name:');
    if (folderName) {
      addFolder({
        name: folderName,
        parentId: currentFolderId,
        color: '#3b82f6',
        icon: 'folder',
      });
    }
  };

  return (
    <div className="app">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        onNewFolder={handleNewFolder}
        onUpload={() => setShowUploadModal(true)}
      />
      
      <main className="main-content">
        <div className="content-header">
          <h1>{activeView === 'home' ? 'All Documents' : activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
          <p className="subtitle">
            {displayDocuments().length} document{displayDocuments().length !== 1 ? 's' : ''} found
          </p>
        </div>

        <SearchBar onSearch={setSearchFilters} tags={tags} />

        {activeView === 'folders' && (
          <FolderView
            folders={folders}
            currentFolderId={currentFolderId}
            onFolderClick={setCurrentFolderId}
          />
        )}

        {activeView === 'activity' ? (
          <div className="activity-log">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {activityLog.slice(0, 20).map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.type === 'upload' ? '📤' : activity.type === 'edit' ? '✏️' : activity.type === 'share' ? '🔗' : '📋'}</div>
                  <div className="activity-content">
                    <p className="activity-description">{activity.description}</p>
                    <p className="activity-meta">
                      {activity.user.name} • {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : activeView === 'tags' ? (
          <div className="tags-view">
            <h2>All Tags</h2>
            <div className="tags-grid">
              {tags.map((tag) => {
                const tagDocs = documents.filter(doc => doc.tags.some(t => t.id === tag.id));
                return (
                  <div
                    key={tag.id}
                    className="tag-card"
                    style={{ borderLeft: `4px solid ${tag.color}` }}
                    onClick={() => {
                      setSearchFilters({ ...searchFilters, tags: [tag.id] });
                      setActiveView('home');
                    }}
                  >
                    <h3 style={{ color: tag.color }}>{tag.name}</h3>
                    <p>{tagDocs.length} document{tagDocs.length !== 1 ? 's' : ''}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="documents-grid">
            {displayDocuments().map((doc) => (
              <DocumentCard
                key={doc.id}
                document={doc}
                onFavorite={handleFavoriteToggle}
                onDelete={deleteDocument}
                onPreview={setPreviewDocument}
                onShare={setShareDocument}
              />
            ))}
            {displayDocuments().length === 0 && (
              <div className="empty-state">
                <p>No documents found</p>
                <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
                  Upload Document
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {previewDocument && (
        <DocumentPreview
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
          onFavorite={handleFavoriteToggle}
          onShare={setShareDocument}
          onDelete={deleteDocument}
        />
      )}

      {shareDocument && (
        <ShareModal
          document={shareDocument}
          onClose={() => setShareDocument(null)}
          onShare={handleShare}
        />
      )}

      {showUploadModal && (
        <UploadModal
          folders={folders}
          tags={tags}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}

export default App;
