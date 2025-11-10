import { useState } from 'react';
import { Home, FolderOpen, Star, Users, Settings, Activity, Tag, Search, Plus } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onNewFolder: () => void;
  onUpload: () => void;
}

export const Sidebar = ({ activeView, onViewChange, onNewFolder, onUpload }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'All Documents' },
    { id: 'folders', icon: FolderOpen, label: 'Folders' },
    { id: 'favorites', icon: Star, label: 'Favorites' },
    { id: 'shared', icon: Users, label: 'Shared with me' },
    { id: 'tags', icon: Tag, label: 'Tags' },
    { id: 'activity', icon: Activity, label: 'Recent Activity' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Search size={24} />
          {!isCollapsed && <span>Lexentra</span>}
        </div>
      </div>

      <div className="sidebar-actions">
        <button className="btn-primary" onClick={onUpload} title="Upload Document">
          <Plus size={20} />
          {!isCollapsed && <span>Upload</span>}
        </button>
        <button className="btn-secondary" onClick={onNewFolder} title="New Folder">
          <FolderOpen size={20} />
          {!isCollapsed && <span>New Folder</span>}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
            title={item.label}
          >
            <item.icon size={20} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button
          className="nav-item"
          onClick={() => onViewChange('settings')}
          title="Settings"
        >
          <Settings size={20} />
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
    </aside>
  );
};
