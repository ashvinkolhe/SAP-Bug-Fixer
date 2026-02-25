import React from 'react';
import { sapProducts, sapModules, bugSeverity, bugCategories } from '../data/bugDatabase';
import './FilterPanel.css';

function FilterPanel({
  selectedProduct,
  setSelectedProduct,
  selectedModule,
  setSelectedModule,
  selectedSeverity,
  setSelectedSeverity,
  selectedCategory,
  setSelectedCategory,
  onReset
}) {
  return (
    <div className="filter-panel">
      <div className="filter-group">
        <label className="filter-label">Product</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="filter-select"
        >
          {sapProducts.map((product) => (
            <option key={product} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Module</label>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="filter-select"
        >
          {sapModules.map(module => (
            <option key={module} value={module}>{module}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Severity</label>
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="filter-select"
        >
          {bugSeverity.map(severity => (
            <option key={severity} value={severity}>{severity}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          {bugCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <button className="btn-reset" onClick={onReset}>
        Reset Filters
      </button>
    </div>
  );
}

export default FilterPanel;
