import { Search, Users, Briefcase, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import type { User } from '../types';
import './PersonSelector.css';

interface PersonSelectorProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const PersonSelector = ({ users, selectedUser, onSelectUser }: PersonSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online': return '#10b981';
      case 'away': return '#f59e0b';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'away': return 'Away';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="person-selector">
      <div className="selector-header">
        <div className="header-title">
          <Users size={28} />
          <div>
            <h1>Select a Customer</h1>
            <p>Choose a customer to view their documents</p>
          </div>
        </div>
        
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search customers by name, email, or account..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="people-grid">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?.id === user.id;
          
          return (
            <div
              key={user.id}
              className={`person-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelectUser(user)}
            >
              <div className="person-visual">
                <div className="person-avatar">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <div className="avatar-placeholder">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(user.status) }}
                    title={getStatusText(user.status)}
                  />
                </div>
              </div>

              <div className="person-details">
                <h3>{user.name}</h3>
                {user.title && <p className="person-title">{user.title}</p>}
                
                <div className="person-meta">
                  {user.department && (
                    <div className="meta-item">
                      <Briefcase size={14} />
                      <span>{user.department}</span>
                    </div>
                  )}
                  <div className="meta-item">
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                  {user.lastActive && (
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>Active {format(user.lastActive, 'MMM d, h:mm a')}</span>
                    </div>
                  )}
                </div>

                <div className="person-status">
                  <div 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(user.status)}20`,
                      color: getStatusColor(user.status)
                    }}
                  >
                    {getStatusText(user.status)}
                  </div>
                  <div className="role-badge">{user.role}</div>
                </div>
              </div>

              {isSelected && (
                <div className="selected-indicator">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#667eea"/>
                    <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-results">
          <Users size={48} />
          <h3>No customers found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};
