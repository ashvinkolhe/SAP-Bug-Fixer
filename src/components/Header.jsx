import React from 'react';
import { BookOpen, Moon, Sun, Github } from 'lucide-react';
import './Header.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <BookOpen size={32} />
          <div>
            <h1>SAP Bug Fixer</h1>
            <p className="tagline">Complete SAP Error Reference & Learning Platform</p>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          title="View Source Code"
        >
          <Github size={20} />
          <span>Open Source</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
