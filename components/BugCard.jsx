import React from 'react';
import { Copy, Check, AlertTriangle, Zap } from 'lucide-react';
import './BugCard.css';

function BugCard({ bug, onSelect, onCopy, copied }) {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical':
        return '#ff6b6b';
      case 'High':
        return '#ffa500';
      case 'Medium':
        return '#ffd700';
      case 'Low':
        return '#2ecc71';
      default:
        return '#808080';
    }
  };

  return (
    <div className="bug-card" onClick={() => onSelect(bug)}>
      <div className="bug-header">
        <div className="bug-code-badge">{bug.errorCode}</div>
        <span
          className="severity-badge"
          style={{ borderColor: getSeverityColor(bug.severity) }}
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
          <Zap size={14} />
          <span>{bug.frequency}</span>
        </div>
        <div className="info-item">
          <AlertTriangle size={14} />
          <span>{bug.resolutionTime}</span>
        </div>
      </div>

      <div className="bug-footer">
        <button
          className="btn-view"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(bug);
          }}
        >
          View Details
        </button>
        <button
          className="btn-copy"
          onClick={(e) => {
            e.stopPropagation();
            onCopy(bug.errorCode, bug.id);
          }}
          title="Copy error code"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );
}

export default BugCard;
