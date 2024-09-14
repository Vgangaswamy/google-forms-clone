import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateForm from './components/CreateForm';
import FormList from './components/FormList';
import Dashboard from './components/Dashboard';
import Header from './components/Header'; // Import the Header component
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Listen for changes in localStorage when the token is set
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);  // Update the authentication state
  }, []);

  console.log("Rendering App component. Authenticated:", isAuthenticated);

  return (
    <Router>
      <div className="App">
        {/* If user is authenticated, display the header */}
        {isAuthenticated && <Header />}  {/* Header will be displayed only when authenticated */}

        <Routes>
          {/* If user is authenticated, redirect to home, else show SignUp page */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />

          {/* SignIn page route */}
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/home" /> : <SignIn />} />

          {/* Home page route - displays forms and the dashboard */}
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />

          {/* Dashboard route - user can navigate directly to the dashboard */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

// HomePage component that includes the Dashboard
const HomePage = () => (
  <div>
    <Dashboard/> {/* Add the Dashboard component */}
  </div>
);

export default App;
