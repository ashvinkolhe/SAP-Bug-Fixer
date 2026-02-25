import React from 'react';
import { X, Copy, Check, AlertCircle, BookMarked } from 'lucide-react';
import './BugDetailModal.css';

function BugDetailModal({ bug, onClose, onCopy, copied }) {
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return '#ff6b6b';
      case 'High': return '#ffa500';
      case 'Medium': return '#ffd700';
      case 'Low': return '#2ecc71';
      default: return '#808080';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <div className="header-left">
            <div 
              className="error-code-badge"
              style={{ background: `linear-gradient(135deg, ${getSeverityColor(bug.severity)}, rgba(255, 107, 107, 0.3))` }}
            >
              {bug.errorCode}
            </div>
            <h2>{bug.title}</h2>
          </div>
          <button
            className="copy-code-btn"
            onClick={() => onCopy(bug.errorCode, bug.id)}
            title="Copy error code"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="modal-meta">
          <div className="meta-item">
            <span className="meta-label">Product</span>
            <span className="meta-value">{bug.product || 'N/A'}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Module</span>
            <span className="meta-value">{bug.module}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Severity</span>
            <span 
              className="severity-badge-modal"
              style={{ borderColor: getSeverityColor(bug.severity) }}
            >
              {bug.severity}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">{bug.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Frequency</span>
            <span className="meta-value">{bug.frequency}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Avg. Resolution Time</span>
            <span className="meta-value">{bug.resolutionTime}</span>
          </div>
        </div>

        <div className="modal-section">
          <h3 className="section-title">
            <AlertCircle size={18} />
            Description
          </h3>
          <p className="section-content">{bug.description}</p>
        </div>

        <div className="modal-section">
          <h3 className="section-title">
            <BookMarked size={18} />
            Solution & Steps
          </h3>
          <div className="solution-steps">
            {bug.solution.split('\n').map((step, idx) => (
              <div key={idx} className="solution-step">
                {step}
              </div>
            ))}
          </div>
        </div>

        {bug.relatedErrors && bug.relatedErrors.length > 0 && (
          <div className="modal-section">
            <h3 className="section-title">Related Errors</h3>
            <div className="related-errors">
              {bug.relatedErrors.map((error, idx) => (
                <span key={idx} className="related-error-tag">{error}</span>
              ))}
            </div>
          </div>
        )}

        {bug.sapNotes && bug.sapNotes.length > 0 && (
          <div className="modal-section">
            <h3 className="section-title">SAP Notes</h3>
            <div className="sap-notes">
              {bug.sapNotes.map((note, idx) => (
                <a 
                  key={idx}
                  href={`https://launchpad.support.sap.com/notes/${note}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sap-note-link"
                >
                  Note {note}
                </a>
              ))}
            </div>
          </div>
        )}

        {bug.keywords && bug.keywords.length > 0 && (
          <div className="modal-section">
            <h3 className="section-title">Keywords</h3>
            <div className="keywords">
              {bug.keywords.map((keyword, idx) => (
                <span key={idx} className="keyword-tag">{keyword}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BugDetailModal;
