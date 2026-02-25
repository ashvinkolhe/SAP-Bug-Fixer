// src/pages/SearchPage.js
import React, { useMemo } from 'react';

const SearchPage = ({ query, bugs, onNavigate, favorites, onToggleFavorite }) => {
  const results = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    return bugs.filter(bug =>
      bug.errorCode.toLowerCase().includes(searchTerm) ||
      bug.title.toLowerCase().includes(searchTerm) ||
      bug.description.toLowerCase().includes(searchTerm) ||
      bug.category.toLowerCase().includes(searchTerm) ||
      bug.module.toLowerCase().includes(searchTerm) ||
      bug.solution.toLowerCase().includes(searchTerm) ||
      bug.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [query, bugs]);

  const getSeverityColor = (severity) => {
    const colors = {
      CRITICAL: '#d0342e',
      HIGH: '#ffb81c',
      MEDIUM: '#0070ba',
      LOW: '#107c10',
    };
    return colors[severity] || '#666';
  };

  const getSeverityBgColor = (severity) => {
    const colors = {
      CRITICAL: '#fde0e0',
      HIGH: '#fff4e1',
      MEDIUM: '#e8f0f7',
      LOW: '#e7f5e3',
    };
    return colors[severity] || '#f0f0f0';
  };

  return (
    <div className="search-results-container">
      <div className="search-info">
        <h2>🔍 Search Results</h2>
        <p>
          Found <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''} for 
          <strong>" {query} "</strong>
        </p>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">❌</div>
          <h2>No results found</h2>
          <p>
            We couldn't find any bugs matching "{query}". 
            <br />
            Try a different search term or browse by category.
          </p>
          <div style={{ marginTop: '20px' }}>
            <button className="btn btn-primary" onClick={() => onNavigate('all-bugs')}>
              Browse All Bugs
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {results.map((bug) => (
            <div
              key={bug.id}
              className="bug-card"
              onClick={() => onNavigate('bug-detail', bug.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="bug-card-header">
                <div style={{ flex: 1 }}>
                  <div className="bug-code">{bug.errorCode}</div>
                  <div className="bug-title">{bug.title}</div>
                  <div className="bug-module">📂 {bug.module}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div
                    className="severity-badge"
                    style={{
                      background: getSeverityBgColor(bug.severity),
                      color: getSeverityColor(bug.severity),
                    }}
                  >
                    {bug.severity}
                  </div>
                  <button
                    className={`favorite-btn ${favorites.includes(bug.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(bug.id);
                    }}
                  >
                    {favorites.includes(bug.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>

              <div className="bug-description">{bug.description}</div>

              <div className="bug-tags">
                {bug.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bug-card-footer">
                <span className="bug-type">{bug.type}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>
                  {bug.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
