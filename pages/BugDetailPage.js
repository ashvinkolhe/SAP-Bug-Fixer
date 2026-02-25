// src/pages/BugDetailPage.js
import React, { useState } from 'react';

const BugDetailPage = ({ bug, onNavigate, isFavorite, onToggleFavorite }) => {
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(-1), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    const content = `
SAP BUG REPORT
===============================
Error Code: ${bug.errorCode}
Title: ${bug.title}
Category: ${bug.category}
Module: ${bug.module}
Severity: ${bug.severity}
Type: ${bug.type}
Difficulty: ${bug.difficulty}

DESCRIPTION:
${bug.description}

SOLUTION:
${bug.solution}

CODE SNIPPET:
${bug.codeSnippet}

WORKAROUND:
${bug.workaround}

RELATED SAP NOTES:
${bug.relatedNotes.join(', ')}

TAGS:
${bug.tags.join(', ')}

Generated: ${new Date().toLocaleString()}
Platform: SAP Bug Fixer (Open Source)
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `${bug.errorCode}-${bug.title.replace(/\s+/g, '_')}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bug-detail-container">
      {/* Header */}
      <div className="bug-detail-header">
        <div className="bug-detail-title">
          <h1>{bug.title}</h1>
          <p className="bug-code">{bug.errorCode}</p>
        </div>
        <button
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(bug.id)}
          style={{ fontSize: '40px', marginRight: '20px' }}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      {/* Meta Information */}
      <div style={{ padding: '30px 40px', background: '#f5f5f5', borderBottom: '1px solid #ddd' }}>
        <div className="bug-meta">
          <div className="meta-item">
            <div className="meta-label">Category</div>
            <div className="meta-value">{bug.category}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Module</div>
            <div className="meta-value">{bug.module}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Severity</div>
            <div className="meta-value" style={{ color: bug.severity === 'CRITICAL' ? '#d0342e' : bug.severity === 'HIGH' ? '#ffb81c' : bug.severity === 'MEDIUM' ? '#0070ba' : '#107c10' }}>
              {bug.severity}
            </div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Type</div>
            <div className="meta-value">{bug.type}</div>
          </div>
          <div className="meta-item">
            <div className="meta-label">Difficulty</div>
            <div className="meta-value">{bug.difficulty}</div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="bug-detail-body">
        {/* Description */}
        <div className="detail-section">
          <h2>📝 Description</h2>
          <div className="description-text">{bug.description}</div>
        </div>

        {/* Solution */}
        <div className="detail-section">
          <h2>✅ Solution</h2>
          <div className="solution-text">{bug.solution}</div>
        </div>

        {/* Code Snippet */}
        <div className="detail-section">
          <h2>💻 Code Snippet</h2>
          <p style={{ color: '#666', marginBottom: '15px' }}>
            Production-ready code example. Click to copy or use as reference.
          </p>
          <div className="code-block">
            {bug.codeSnippet}
            <button
              className={`copy-code-btn ${copiedIndex === 0 ? 'copied' : ''}`}
              onClick={() => copyToClipboard(bug.codeSnippet, 0)}
            >
              {copiedIndex === 0 ? '✓ Copied' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Workaround */}
        <div className="detail-section">
          <h2>🔄 Workaround</h2>
          <div className="workaround-text">{bug.workaround}</div>
        </div>

        {/* Related Notes */}
        {bug.relatedNotes && bug.relatedNotes.length > 0 && (
          <div className="detail-section">
            <h2>📚 Related SAP Notes</h2>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              Official SAP documentation and related issues:
            </p>
            <div className="related-links">
              {bug.relatedNotes.map((note, i) => (
                <a
                  key={i}
                  href={`https://support.sap.com/en/my-support/knowledge-base/sap-notes/${note}.html`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sap-note-link"
                >
                  SAP Note #{note}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {bug.tags && bug.tags.length > 0 && (
          <div className="detail-section">
            <h2>🏷️ Tags</h2>
            <div className="bug-tags">
              {bug.tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="detail-actions">
          <button
            className="btn btn-primary"
            onClick={() => onNavigate('all-bugs')}
          >
            ← Back to Bugs
          </button>
          <button
            className="btn btn-primary"
            onClick={handlePrint}
          >
            🖨️ Print
          </button>
          <button
            className="btn btn-success"
            onClick={handleExport}
          >
            📥 Export as Text
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '20px 40px', background: '#f5f5f5', textAlign: 'center', fontSize: '12px', color: '#666', borderTop: '1px solid #ddd' }}>
        <p>
          💡 <strong>Tip:</strong> Copy code snippets and customize them for your environment. 
          Always test in a non-production system first.
          <br />
          Found an issue or have a suggestion? This is an open-source project - contributions welcome!
        </p>
      </div>
    </div>
  );
};

export default BugDetailPage;
