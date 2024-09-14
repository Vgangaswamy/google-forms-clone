import React, { useState } from 'react';
import './Dashboard.css';
import CreateForm from './CreateForm';
import FormList from './FormList'; 

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('overview'); // Tracks the active content section

  // Placeholder data for user, forms, and responses
  const user = { name: 'John Doe', email: 'john.doe@example.com', createdAt: new Date() };

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
      </div>

      {/* Main content area */}
      <div className="content">
      {activeSection === 'create-form' && (
          <div className="content-section">
            <h3>Create New Form</h3>
            <CreateForm /> {/* Render the CreateForm component when this section is active */}
          </div>
        )}
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
            <FormList /> 
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
