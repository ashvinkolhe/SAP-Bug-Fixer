import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  BookMarked,
  ExternalLink,
} from "lucide-react";
import "./BugDetailModal.css";

function BugDetailModal({ bug, onClose, onCopy, copied }) {
  const [activeTab, setActiveTab] = useState("overview");

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "#ff4757",
      High: "#ffa502",
      Medium: "#ffc107",
      Low: "#2ed573",
    };
    return colors[severity] || "#808080";
  };

  const getSeverityBg = (severity) => {
    const bg = {
      Critical: "rgba(255, 71, 87, 0.15)",
      High: "rgba(255, 165, 2, 0.15)",
      Medium: "rgba(255, 193, 7, 0.15)",
      Low: "rgba(46, 213, 115, 0.15)",
    };
    return bg[severity] || "rgba(128, 128, 128, 0.1)";
  };

  const openSapNote = (note) => {
    try {
      const clean = String(note).trim();
      const url = `https://me.sap.com/notes/${clean}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error opening SAP note:", error);
    }
  };

  if (!bug) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} type="button">
          <X size={24} />
        </button>

        {/* Main Content */}
        <div className="modal-main">
          {/* Header Section */}
          <div className="modal-header-section">
            {/* Error Code Badge */}
            <div
              className="error-code-badge"
              style={{
                borderColor: getSeverityColor(bug.severity),
                backgroundColor: getSeverityBg(bug.severity),
              }}
            >
              {bug.errorCode}
            </div>

            {/* Title and Severity */}
            <div className="header-title-area">
              <h2 className="modal-error-title">{bug.title}</h2>
              <div
                className="severity-badge"
                style={{
                  color: getSeverityColor(bug.severity),
                  borderColor: getSeverityColor(bug.severity),
                  backgroundColor: getSeverityBg(bug.severity),
                }}
              >
                {bug.severity}
              </div>
            </div>

            {/* Copy Button */}
            <button
              className="copy-code-button"
              onClick={() => onCopy(bug.errorCode, bug.id)}
              type="button"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={18} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="metadata-section">
            <div className="metadata-item">
              <span className="metadata-label">MODULE</span>
              <span className="metadata-value">{bug.module}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">CATEGORY</span>
              <span className="metadata-value">{bug.category}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">FREQUENCY</span>
              <span className="metadata-value">{bug.frequency}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">RESOLUTION TIME</span>
              <span className="metadata-value">{bug.resolutionTime}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section">
            <button
              className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
              type="button"
            >
              Overview
            </button>
            <button
              className={`tab-button ${activeTab === "solution" ? "active" : ""}`}
              onClick={() => setActiveTab("solution")}
              type="button"
            >
              Solution
            </button>
            <button
              className={`tab-button ${activeTab === "resources" ? "active" : ""}`}
              onClick={() => setActiveTab("resources")}
              type="button"
            >
              Resources
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content-area">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="tab-pane">
                {bug.description && (
                  <div className="content-block">
                    <h3 className="block-title">Description</h3>
                    <p className="block-text">{bug.description}</p>
                  </div>
                )}

                {bug.relatedErrors && bug.relatedErrors.length > 0 && (
                  <div className="content-block">
                    <h3 className="block-title">Related Errors</h3>
                    <div className="tags-container">
                      {bug.relatedErrors.map((err, idx) => (
                        <span key={idx} className="tag-item">
                          {err}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {bug.keywords && bug.keywords.length > 0 && (
                  <div className="content-block">
                    <h3 className="block-title">Keywords</h3>
                    <div className="keywords-container">
                      {bug.keywords.map((kw, idx) => (
                        <span key={idx} className="keyword-item">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Solution Tab */}
            {activeTab === "solution" && (
              <div className="tab-pane">
                {bug.solution && (
                  <div className="content-block">
                    <h3 className="block-title">Step-by-Step Solution</h3>
                    <div className="steps-container">
                      {bug.solution.split("\n").map((step, idx) => (
                        <div key={idx} className="step-item">
                          <span className="step-number">{idx + 1}</span>
                          <span className="step-text">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="tab-pane">
                {bug.sapNotes && bug.sapNotes.length > 0 && (
                  <div className="content-block">
                    <div className="resources-header">
                      <BookMarked size={20} />
                      <h3 className="block-title">SAP Knowledge Base Notes</h3>
                    </div>
                    <p className="resources-hint">
                      Click any note to open it on me.sap.com
                    </p>
                    <div className="notes-grid">
                      {bug.sapNotes.map((note, idx) => (
                        <button
                          key={idx}
                          className="note-card"
                          onClick={() => openSapNote(note)}
                          type="button"
                        >
                          <div className="note-card-header">
                            <BookMarked size={18} />
                            <ExternalLink size={14} />
                          </div>
                          <div className="note-card-body">
                            <span className="note-label">SAP NOTE</span>
                            <span className="note-number">{note}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {(!bug.sapNotes || bug.sapNotes.length === 0) && (
                  <div className="empty-state">
                    <BookMarked size={48} />
                    <p>No SAP notes available</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <span className="footer-text">
            Error ID: <code>{bug.id}</code>
          </span>
          <button
            className="close-modal-btn"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BugDetailModal;