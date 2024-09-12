import React, { useState } from 'react';
import './Dashboard.css';
import CreateForm from './CreateForm'; // Import the CreateForm component

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); // Tracks the active content section

  // Placeholder data for user, forms, and responses
  const user = { name: 'John Doe', email: 'john.doe@example.com', createdAt: new Date() };
  const recentForms = [{ _id: 1, title: 'Survey 1', description: 'A simple survey' }];
  const responseSummary = [{ formId: 1, formTitle: 'Survey 1', responseCount: 10 }];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={activeSection === 'overview' ? 'active' : ''}
          onClick={() => setActiveSection('overview')}
        >
          User Overview
        </button>
        <button
          className={activeSection === 'forms' ? 'active' : ''}
          onClick={() => setActiveSection('forms')}
        >
          Recent Forms
        </button>
        <button
          className={activeSection === 'responses' ? 'active' : ''}
          onClick={() => setActiveSection('responses')}
        >
          Response Summary
        </button>
        <button
          className={activeSection === 'create-form' ? 'active' : ''}
          onClick={() => setActiveSection('create-form')}
        >
          Create Form
        </button>
        <button
          className={activeSection === 'settings' ? 'active' : ''}
          onClick={() => setActiveSection('settings')}
        >
          Settings
        </button>
      </div>

      {/* Main content area */}
      <div className="content">
        {activeSection === 'overview' && (
          <div className="content-section user-overview">
            <h2>User Overview</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Account Created: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}

        {activeSection === 'forms' && (
          <div className="content-section recent-forms">
            <h3>Recent Forms</h3>
            <ul>
              {recentForms.length > 0 ? (
                recentForms.map(form => (
                  <li key={form._id}>
                    <h4>{form.title}</h4>
                    <p>{form.description}</p>
                  </li>
                ))
              ) : (
                <p>No recent forms available.</p>
              )}
            </ul>
          </div>
        )}

        {activeSection === 'responses' && (
          <div className="content-section response-summary">
            <h3>Response Summary</h3>
            <ul>
              {responseSummary.length > 0 ? (
                responseSummary.map(summary => (
                  <li key={summary.formId}>
                    <h4>{summary.formTitle}</h4>
                    <p>Total Responses: {summary.responseCount}</p>
                  </li>
                ))
              ) : (
                <p>No response data available.</p>
              )}
            </ul>
          </div>
        )}

        {activeSection === 'create-form' && (
          <div className="content-section">
            <h3>Create New Form</h3>
            <CreateForm /> {/* Render the CreateForm component when this section is active */}
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="content-section settings">
            <h3>Settings</h3>
            <button className="settings-btn">Account Settings</button>
            <button className="settings-btn">Privacy Settings</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
