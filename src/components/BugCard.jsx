import React from 'react';
import { Copy, Check, AlertTriangle, Zap } from 'lucide-react';
import './BugCard.css';

function BugCard({ bug, onSelect, onCopy, copied }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return '#FF3B30';
      case 'High':     return '#FF9500';
      case 'Medium':   return '#FFCC00';
      case 'Low':      return '#34C759';
      default:         return '#8e8e93';
    }
  };

  return (
    <div
      className="bug-card"
      onClick={() => onSelect(bug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(bug)}
      aria-label={`Bug: ${bug.title}`}
    >
      <div className="bug-header">
        <div className="bug-code-badge">{bug.errorCode}</div>
        <span
          className="severity-badge"
          style={{
            borderColor: getSeverityColor(bug.severity),
            color: getSeverityColor(bug.severity),
          }}
        >
          {bug.severity}
        </span>
      </div>

      <h3 className="bug-title">{bug.title}</h3>

      <div className="bug-meta">
        <span className="module-tag">{bug.product}</span>
        <span className="module-tag">{bug.module}</span>
        <span className="category-tag">{bug.category}</span>
      </div>

      <p className="bug-description">{bug.description}</p>

      <div className="bug-info">
        <div className="info-item">
          <Zap size={13} />
          <span>{bug.frequency}</span>
        </div>
        <div className="info-item">
          <AlertTriangle size={13} />
          <span>{bug.resolutionTime}</span>
        </div>
      </div>

      <div className="bug-footer">
        <button
          type="button"
          className="btn-view"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(bug);
          }}
        >
          View Details
        </button>
        <button
          type="button"
          className="btn-copy"
          onClick={(e) => {
            e.stopPropagation();
            onCopy(bug.errorCode, bug.id);
          }}
          title="Copy error code"
          aria-label="Copy error code"
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
        </button>
      </div>
    </div>
  );
}

export default BugCard;
