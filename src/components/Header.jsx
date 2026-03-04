import React from 'react';
import { BookOpen, Moon, Sun, Github } from 'lucide-react';
import './Header.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">
            <BookOpen size={20} />
          </div>
          <div>
            <h1>SAP Bug Fixer</h1>
            <p className="tagline">Enterprise SAP Incident Intelligence</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <a
          href="https://github.com/ashvinkolhe/SAP-Bug-Fixer"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          title="View Source on GitHub"
          aria-label="View source code on GitHub"
        >
          <Github size={17} />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
