import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, BarChart3, Filter, SearchCheck, ShieldCheck, Sparkles, X } from 'lucide-react';
import './App.css';
import { sapBugDatabase } from './data/bugDatabase';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BugCard from './components/BugCard';
import FilterPanel from './components/FilterPanel';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import BugDetailModal from './components/BugDetailModal';

const INITIAL_VISIBLE_BUGS = 120;
const LOAD_MORE_STEP = 200;

const severityPriority = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1
};

const normalize = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[_/\\-]+/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const scoreBugByQuery = (bug, query) => {
  if (!query) {
    return 0;
  }

  const rawQuery = String(query || '').trim().toLowerCase();
  const normalizedQuery = normalize(query);
  const queryTokens = normalizedQuery.split(' ').filter((token) => token.length > 1);
  const normalizedCode = normalize(bug.errorCode);
  const normalizedTitle = normalize(bug.title);
  const normalizedDescription = normalize(bug.description);
  const normalizedSolution = normalize(bug.solution);
  const normalizedModule = normalize(bug.module);
  const normalizedCategory = normalize(bug.category);
  const normalizedProduct = normalize(bug.product);
  const normalizedNotes = normalize((bug.sapNotes || []).join(' '));
  const keywordText = normalize((bug.keywords || []).join(' '));
  const relatedText = normalize((bug.relatedErrors || []).join(' '));
  const fullText = [
    normalizedCode,
    normalizedTitle,
    normalizedDescription,
    normalizedSolution,
    normalizedModule,
    normalizedCategory,
    normalizedProduct,
    normalizedNotes,
    keywordText,
    relatedText
  ].join(' ');

  let score = 0;

  if (normalizedCode === normalizedQuery) {
    score += 120;
  }
  if (normalizedTitle === normalizedQuery) {
    score += 90;
  }
  if (keywordText.includes(normalizedQuery)) {
    score += 65;
  }
  if ((bug.sapNotes || []).some((note) => String(note).toLowerCase() === rawQuery)) {
    score += 130;
  }
  if (normalizedNotes.includes(normalizedQuery)) {
    score += 70;
  }
  if (relatedText.includes(normalizedQuery)) {
    score += 45;
  }
  if (normalizedCode.includes(normalizedQuery)) {
    score += 55;
  }
  if (normalizedTitle.includes(normalizedQuery)) {
    score += 42;
  }
  if (normalizedDescription.includes(normalizedQuery) || normalizedSolution.includes(normalizedQuery)) {
    score += 30;
  }
  if (normalizedModule.includes(normalizedQuery) || normalizedCategory.includes(normalizedQuery) || normalizedProduct.includes(normalizedQuery)) {
    score += 24;
  }

  queryTokens.forEach((token) => {
    if (normalizedCode.includes(token)) {
      score += 14;
    }
    if (normalizedTitle.includes(token)) {
      score += 10;
    }
    if (keywordText.includes(token)) {
      score += 9;
    }
    if (normalizedNotes.includes(token)) {
      score += 12;
    }
    if (relatedText.includes(token)) {
      score += 8;
    }
    if (fullText.includes(token)) {
      score += 4;
    }
  });

  return score;
};

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [view, setView] = useState('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('All');
  const [selectedModule, setSelectedModule] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_BUGS);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const explorerStats = useMemo(() => {
    const moduleCount = new Set(sapBugDatabase.map((bug) => bug.module)).size;
    const categoryCount = new Set(sapBugDatabase.map((bug) => bug.category)).size;
    const productCount = new Set(sapBugDatabase.map((bug) => bug.product)).size;

    return {
      total: sapBugDatabase.length,
      moduleCount,
      categoryCount,
      productCount
    };
  }, []);

  const filteredBugs = useMemo(() => {
    const byFilters = sapBugDatabase.filter((bug) => {
      const matchesProduct = selectedProduct === 'All' || bug.product === selectedProduct;
      const matchesModule = selectedModule === 'All' || bug.module === selectedModule;
      const matchesSeverity = selectedSeverity === 'All' || bug.severity === selectedSeverity;
      const matchesCategory = selectedCategory === 'All' || bug.category === selectedCategory;
      return matchesProduct && matchesModule && matchesSeverity && matchesCategory;
    });

    const query = searchQuery.trim();
    if (!query) {
      return byFilters;
    }

    return byFilters
      .map((bug) => ({ bug, score: scoreBugByQuery(bug, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        return (severityPriority[b.bug.severity] || 0) - (severityPriority[a.bug.severity] || 0);
      })
      .map((item) => item.bug);
  }, [searchQuery, selectedProduct, selectedModule, selectedSeverity, selectedCategory]);

  const visibleBugs = useMemo(() => {
    return filteredBugs.slice(0, visibleCount);
  }, [filteredBugs, visibleCount]);

  const hasMoreResults = visibleCount < filteredBugs.length;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_BUGS);
  }, [searchQuery, selectedProduct, selectedModule, selectedSeverity, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedProduct('All');
    setSelectedModule('All');
    setSelectedSeverity('All');
    setSelectedCategory('All');
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {view === 'landing' ? (
        <div className="main-container landing-page">
          <section className="hero-section">
            <div className="hero-chip">Enterprise SAP Incident Intelligence</div>
            <h2>Find SAP bugs faster, resolve them smarter.</h2>
            <p>
              SAP Bug Fixer gives teams a centralized library of SAP/Fiori/ABAP/BASIS issues with actionable
              fixes, related errors, and searchable diagnostics designed for real support workflows.
            </p>
            <div className="hero-cta-row">
              <button className="btn hero-cta" onClick={() => setView('explorer')}>
                Explore Bugs
                <ArrowRight size={16} />
              </button>
              <button
                className="btn btn-secondary hero-cta-secondary"
                onClick={() => {
                  setShowAnalytics(true);
                  setView('explorer');
                }}
              >
                Open Analytics
              </button>
            </div>
            <div className="hero-stats-grid">
              <div className="hero-stat-card">
                <span className="hero-stat-value">{explorerStats.total.toLocaleString()}+</span>
                <span className="hero-stat-label">Indexed Errors</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-value">{explorerStats.productCount}</span>
                <span className="hero-stat-label">SAP Products</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-value">{explorerStats.moduleCount}</span>
                <span className="hero-stat-label">Technical Modules</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-value">{explorerStats.categoryCount}</span>
                <span className="hero-stat-label">Issue Categories</span>
              </div>
            </div>
          </section>

          <section className="landing-details">
            <div className="feature-card">
              <SearchCheck size={18} />
              <h3>Smart Similar Search</h3>
              <p>Paste console logs, short dump text, or exact SAP error codes to surface the closest matching issues.</p>
            </div>
            <div className="feature-card">
              <Filter size={18} />
              <h3>Deep Filtering</h3>
              <p>Slice by product, module, severity, and category to quickly narrow thousands of incidents to the right fix.</p>
            </div>
            <div className="feature-card">
              <ShieldCheck size={18} />
              <h3>Operational Playbooks</h3>
              <p>Every bug includes practical resolution steps, related errors, and SAP Notes for faster triage.</p>
            </div>
            <div className="feature-card">
              <Sparkles size={18} />
              <h3>Team-Ready UI</h3>
              <p>Clean, responsive interface tuned for incident rooms, support teams, and production operations.</p>
            </div>
          </section>
        </div>
      ) : (
        <div className="main-container explorer-page">
          <div className="top-bar">
            <div className="explorer-nav-row">
              <button className="btn btn-secondary btn-back" onClick={() => setView('landing')}>
                Back To Landing
              </button>
            </div>

            <div className="search-section">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className="action-buttons">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAnalytics(!showAnalytics)}
                title="View Analytics"
              >
                <BarChart3 size={18} />
                <span>Analytics</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowFilters(!showFilters)}
                title="Toggle Filters"
              >
                <Filter size={18} />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <FilterPanel
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              selectedModule={selectedModule}
              setSelectedModule={setSelectedModule}
              selectedSeverity={selectedSeverity}
              setSelectedSeverity={setSelectedSeverity}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onReset={resetFilters}
            />
          )}

          {showAnalytics && <AnalyticsDashboard bugs={filteredBugs} allBugs={sapBugDatabase} />}

          <div className="results-header">
            <div className="result-count">
              <AlertCircle size={18} />
              <span>
                Found <strong>{filteredBugs.length.toLocaleString()}</strong> matching bugs
                {filteredBugs.length > visibleBugs.length && (
                  <>
                    {' '}
                    | Showing <strong>{visibleBugs.length.toLocaleString()}</strong>
                  </>
                )}
              </span>
            </div>

            {(selectedProduct !== 'All' ||
              selectedModule !== 'All' ||
              selectedSeverity !== 'All' ||
              selectedCategory !== 'All' ||
              searchQuery) && (
              <button className="btn-clear-filters" onClick={resetFilters}>
                <X size={16} /> Clear All
              </button>
            )}
          </div>

          <div className="bugs-container">
            {filteredBugs.length > 0 ? (
              visibleBugs.map((bug) => (
                <BugCard
                  key={bug.id}
                  bug={bug}
                  onSelect={setSelectedBug}
                  onCopy={handleCopy}
                  copied={copiedId === bug.id}
                />
              ))
            ) : (
              <div className="no-results">
                <SearchCheck size={48} />
                <h3>No similar SAP bugs found</h3>
                <p>Try exact error code, transaction output, or part of a console/short dump message.</p>
              </div>
            )}
          </div>

          {hasMoreResults && (
            <div className="load-more-wrap">
              <button
                className="btn btn-load-more"
                onClick={() => setVisibleCount((count) => count + LOAD_MORE_STEP)}
              >
                Load {Math.min(LOAD_MORE_STEP, filteredBugs.length - visibleBugs.length)} More
              </button>
            </div>
          )}
        </div>
      )}

      {selectedBug && (
        <BugDetailModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
          onCopy={handleCopy}
          copied={copiedId === selectedBug.id}
        />
      )}
    </div>
  );
}

export default App;
