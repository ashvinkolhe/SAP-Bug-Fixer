import React, { useMemo } from 'react';
import { BarChart3, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import './AnalyticsDashboard.css';

function AnalyticsDashboard({ bugs, allBugs }) {
  const analytics = useMemo(() => {
    const stats = {
      totalBugs: allBugs.length,
      criticalCount: allBugs.filter((b) => b.severity === 'Critical').length,
      highCount: allBugs.filter((b) => b.severity === 'High').length,
      mediumCount: allBugs.filter((b) => b.severity === 'Medium').length,
      lowCount: allBugs.filter((b) => b.severity === 'Low').length,
      moduleCounts: {},
      categoryCounts: {},
      frequencyStats: {
        High: allBugs.filter((b) => b.frequency === 'High').length,
        Medium: allBugs.filter((b) => b.frequency === 'Medium').length,
        Low: allBugs.filter((b) => b.frequency === 'Low').length
      },
      filtered: bugs.length
    };

    allBugs.forEach((bug) => {
      stats.moduleCounts[bug.module] = (stats.moduleCounts[bug.module] || 0) + 1;
      stats.categoryCounts[bug.category] = (stats.categoryCounts[bug.category] || 0) + 1;
    });

    return stats;
  }, [allBugs, bugs]);

  const getSeverityPercentage = (count) => {
    return ((count / analytics.totalBugs) * 100).toFixed(1);
  };

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-title">
        <BarChart3 size={20} />
        <h3>Analytics & Statistics</h3>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h4 className="card-title">Severity Distribution</h4>
          <div className="severity-bars">
            <div className="severity-item">
              <div className="bar-label">
                <span>Critical</span>
                <span className="count">{analytics.criticalCount}</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar critical"
                  style={{ width: `${getSeverityPercentage(analytics.criticalCount)}%` }}
                />
              </div>
              <span className="percentage">{getSeverityPercentage(analytics.criticalCount)}%</span>
            </div>

            <div className="severity-item">
              <div className="bar-label">
                <span>High</span>
                <span className="count">{analytics.highCount}</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar high"
                  style={{ width: `${getSeverityPercentage(analytics.highCount)}%` }}
                />
              </div>
              <span className="percentage">{getSeverityPercentage(analytics.highCount)}%</span>
            </div>

            <div className="severity-item">
              <div className="bar-label">
                <span>Medium</span>
                <span className="count">{analytics.mediumCount}</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar medium"
                  style={{ width: `${getSeverityPercentage(analytics.mediumCount)}%` }}
                />
              </div>
              <span className="percentage">{getSeverityPercentage(analytics.mediumCount)}%</span>
            </div>

            <div className="severity-item">
              <div className="bar-label">
                <span>Low</span>
                <span className="count">{analytics.lowCount}</span>
              </div>
              <div className="bar-container">
                <div
                  className="bar low"
                  style={{ width: `${getSeverityPercentage(analytics.lowCount)}%` }}
                />
              </div>
              <span className="percentage">{getSeverityPercentage(analytics.lowCount)}%</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h4 className="card-title">
            <Zap size={16} />
            Occurrence Frequency
          </h4>
          <div className="frequency-stats">
            <div className="freq-item high">
              <span className="freq-label">High Frequency</span>
              <span className="freq-count">{analytics.frequencyStats.High}</span>
            </div>
            <div className="freq-item medium">
              <span className="freq-label">Medium Frequency</span>
              <span className="freq-count">{analytics.frequencyStats.Medium}</span>
            </div>
            <div className="freq-item low">
              <span className="freq-label">Low Frequency</span>
              <span className="freq-count">{analytics.frequencyStats.Low}</span>
            </div>
          </div>
        </div>

        <div className="analytics-card">
          <h4 className="card-title">
            <TrendingUp size={16} />
            Top Modules
          </h4>
          <div className="top-list">
            {Object.entries(analytics.moduleCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([module, count]) => (
                <div key={module} className="list-item">
                  <span className="list-label">{module}</span>
                  <span className="list-count">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="analytics-card">
          <h4 className="card-title">
            <AlertCircle size={16} />
            Top Categories
          </h4>
          <div className="top-list">
            {Object.entries(analytics.categoryCounts)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([category, count]) => (
                <div key={category} className="list-item">
                  <span className="list-label">{category}</span>
                  <span className="list-count">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="analytics-card wide">
          <h4 className="card-title">Summary</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Total Bugs</span>
              <span className="summary-value">{analytics.totalBugs.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Filtered Results</span>
              <span className="summary-value">{analytics.filtered.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Modules Covered</span>
              <span className="summary-value">{Object.keys(analytics.moduleCounts).length}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Error Categories</span>
              <span className="summary-value">{Object.keys(analytics.categoryCounts).length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
