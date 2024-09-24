import React, { useState } from 'react';
import './Dashboard.css';
import CreateForm from './CreateForm';
import FormList from './FormList';  // Import FormList

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('welcome'); // Default to welcome page

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
        {/* Welcome section */}
        {activeSection === 'welcome' && (
          <div className="content-section welcome-section">
            <h2>Welcome to the Forms Dashboard</h2>
            <p>Click "Create Form" to begin creating your own form or explore recent forms and responses.</p>
            <img src="path/to/your/image.jpg" alt="Welcome" className="welcome-image" />
          </div>
        )}

        {activeSection === 'forms' && (
          <div className="content-section recent-forms">
            <FormList /> {/* Render the FormList component */}
          </div>
        )}

        {activeSection === 'responses' && (
          <div className="content-section response-summary">
            <h3>Response Summary</h3>
            {/* Render response summary */}
            <p>No response data available.</p>
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
