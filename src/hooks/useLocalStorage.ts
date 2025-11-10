import { useState, useEffect } from 'react';
import type { Document, Folder, Tag, ActivityLog } from '../types';
import { mockDocuments, mockFolders, mockTags, mockActivityLog, currentUser } from '../data/mockData';

const STORAGE_KEYS = {
  DOCUMENTS: 'lexentra_documents',
  FOLDERS: 'lexentra_folders',
  TAGS: 'lexentra_tags',
  ACTIVITY: 'lexentra_activity',
};

export const useLocalStorage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [activityLog, setActivityLog] = useState<ActivityLog[]>([]);

  // Initialize from localStorage or use mock data
  useEffect(() => {
    const loadData = () => {
      try {
        const storedDocs = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
        const storedFolders = localStorage.getItem(STORAGE_KEYS.FOLDERS);
        const storedTags = localStorage.getItem(STORAGE_KEYS.TAGS);
        const storedActivity = localStorage.getItem(STORAGE_KEYS.ACTIVITY);

        setDocuments(storedDocs ? JSON.parse(storedDocs, dateReviver) : mockDocuments);
        setFolders(storedFolders ? JSON.parse(storedFolders, dateReviver) : mockFolders);
        setTags(storedTags ? JSON.parse(storedTags) : mockTags);
        setActivityLog(storedActivity ? JSON.parse(storedActivity, dateReviver) : mockActivityLog);
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        // Fallback to mock data
        setDocuments(mockDocuments);
        setFolders(mockFolders);
        setTags(mockTags);
        setActivityLog(mockActivityLog);
      }
    };

    loadData();
  }, []);

  // Helper to revive dates when parsing JSON
  const dateReviver = (_key: string, value: any) => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
      return new Date(value);
    }
    return value;
  };

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
    }
  }, [documents]);

  useEffect(() => {
    if (folders.length > 0) {
      localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
    }
  }, [folders]);

  useEffect(() => {
    if (tags.length > 0) {
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
    }
  }, [tags]);

  useEffect(() => {
    if (activityLog.length > 0) {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY, JSON.stringify(activityLog));
    }
  }, [activityLog]);

  const addDocument = (doc: Omit<Document, 'id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'version'>) => {
    const newDoc: Document = {
      ...doc,
      id: `doc-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentUser,
      version: 1,
    };
    setDocuments(prev => [...prev, newDoc]);
    
    // Add activity log
    addActivity({
      type: 'upload',
      documentId: newDoc.id,
      description: `Uploaded ${newDoc.name}`,
    });
    
    return newDoc;
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id
          ? { ...doc, ...updates, updatedAt: new Date(), version: doc.version + 1 }
          : doc
      )
    );
    
    addActivity({
      type: 'edit',
      documentId: id,
      description: `Updated ${documents.find(d => d.id === id)?.name}`,
    });
  };

  const deleteDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    
    if (doc) {
      addActivity({
        type: 'delete',
        documentId: id,
        description: `Deleted ${doc.name}`,
      });
    }
  };

  const addFolder = (folder: Omit<Folder, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    const newFolder: Folder = {
      ...folder,
      id: `folder-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: currentUser,
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  };

  const updateFolder = (id: string, updates: Partial<Folder>) => {
    setFolders(prev =>
      prev.map(folder =>
        folder.id === id
          ? { ...folder, ...updates, updatedAt: new Date() }
          : folder
      )
    );
  };

  const deleteFolder = (id: string) => {
    // Also delete all documents in this folder and subfolders
    const getAllSubfolderIds = (folderId: string): string[] => {
      const subfolders = folders.filter(f => f.parentId === folderId);
      return [folderId, ...subfolders.flatMap(sf => getAllSubfolderIds(sf.id))];
    };

    const folderIds = getAllSubfolderIds(id);
    setDocuments(prev => prev.filter(doc => !folderIds.includes(doc.folderId || '')));
    setFolders(prev => prev.filter(folder => !folderIds.includes(folder.id)));
  };

  const addTag = (tag: Omit<Tag, 'id'>) => {
    const newTag: Tag = {
      ...tag,
      id: `tag-${Date.now()}`,
    };
    setTags(prev => [...prev, newTag]);
    return newTag;
  };

  const deleteTag = (id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
    // Remove tag from all documents
    setDocuments(prev =>
      prev.map(doc => ({
        ...doc,
        tags: doc.tags.filter(tag => tag.id !== id),
      }))
    );
  };

  const addActivity = (activity: Omit<ActivityLog, 'id' | 'user' | 'timestamp'>) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: `log-${Date.now()}`,
      user: currentUser,
      timestamp: new Date(),
    };
    setActivityLog(prev => [newActivity, ...prev].slice(0, 100)); // Keep last 100 activities
  };

  const resetData = () => {
    setDocuments(mockDocuments);
    setFolders(mockFolders);
    setTags(mockTags);
    setActivityLog(mockActivityLog);
  };

  return {
    documents,
    folders,
    tags,
    activityLog,
    addDocument,
    updateDocument,
    deleteDocument,
    addFolder,
    updateFolder,
    deleteFolder,
    addTag,
    deleteTag,
    resetData,
  };
};
