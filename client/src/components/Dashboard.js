import React, { useState } from 'react';
import './Dashboard.css';
import CreateForm from './CreateForm'; 
import FormList from './components/FormList';


const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('create-form'); // Default to create form

  // Placeholder data for forms and responses
  const recentForms = [{ _id: 1, title: 'Survey 1', description: 'A simple survey' }];
  const responseSummary = [{ formId: 1, formTitle: 'Survey 1', responseCount: 10 }];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button
          className={activeSection === 'create-form' ? 'active' : ''}
          onClick={() => setActiveSection('create-form')}
        >
          Create Form
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
      </div>

      {/* Main content area */}
      <div className="content">
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
            <CreateForm /> {/* Render the CreateForm component */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
