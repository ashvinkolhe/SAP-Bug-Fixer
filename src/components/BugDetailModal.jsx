import React, { useEffect, useState } from "react";
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

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: "#FF3B30",
      High:     "#FF9500",
      Medium:   "#FFCC00",
      Low:      "#34C759",
    };
    return colors[severity] || "#8e8e93";
  };

  const getSeverityBg = (severity) => {
    const bg = {
      Critical: "rgba(255, 59, 48, 0.12)",
      High:     "rgba(255, 149, 0, 0.12)",
      Medium:   "rgba(255, 204, 0, 0.12)",
      Low:      "rgba(52, 199, 89, 0.12)",
    };
    return bg[severity] || "rgba(142, 142, 147, 0.1)";
  };

  const openSapNote = (note) => {
    const clean = String(note).trim();
    const url = `https://me.sap.com/notes/${clean}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!bug) return null;

  // Filter empty solution lines
  const solutionSteps = bug.solution
    ? bug.solution.split("\n").filter((s) => s.trim())
    : [];

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={bug.title}>
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} type="button" aria-label="Close">
          <X size={16} />
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
              aria-label={copied ? "Copied!" : "Copy error code"}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="metadata-section">
            <div className="metadata-item">
              <span className="metadata-label">Module</span>
              <span className="metadata-value">{bug.module}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Category</span>
              <span className="metadata-value">{bug.category}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Frequency</span>
              <span className="metadata-value">{bug.frequency}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-label">Resolution</span>
              <span className="metadata-value">{bug.resolutionTime}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-section" role="tablist">
            {["overview", "solution", "resources"].map((tab) => (
              <button
                key={tab}
                className={`tab-button ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
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
                {solutionSteps.length > 0 ? (
                  <div className="content-block">
                    <h3 className="block-title">Step-by-Step Solution</h3>
                    <div className="steps-container">
                      {solutionSteps.map((step, idx) => (
                        <div key={idx} className="step-item">
                          <span className="step-number">{idx + 1}</span>
                          <span className="step-text">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No solution steps available for this bug.</p>
                  </div>
                )}
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === "resources" && (
              <div className="tab-pane">
                {bug.sapNotes && bug.sapNotes.length > 0 ? (
                  <div className="content-block">
                    <div className="resources-header">
                      <BookMarked size={18} />
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
                          aria-label={`Open SAP Note ${note}`}
                        >
                          <div className="note-card-header">
                            <BookMarked size={18} />
                            <ExternalLink size={14} />
                          </div>
                          <div className="note-card-body">
                            <span className="note-label">SAP Note</span>
                            <span className="note-number">{note}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <BookMarked size={48} />
                    <p>No SAP notes available for this bug.</p>
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
