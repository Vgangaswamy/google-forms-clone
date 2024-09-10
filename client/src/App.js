import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateForm from './components/CreateForm';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // useEffect to listen for changes in localStorage (e.g., when token is set)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);  // Update the authentication state
  }, []);

  console.log("Rendering App component. Authenticated:", isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* If user is authenticated, redirect to home, else show SignUp page */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <SignUp />} />

          {/* SignIn page route */}
          <Route path="/signin" element={isAuthenticated ? <Navigate to="/home" /> : <SignIn />} />

          {/* Home page route - accessible only if authenticated */}
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

// HomePage component that displays forms and SignOut button
const HomePage = () => (
  <div>
    <h1>Welcome to the Forms Page</h1>
    <CreateForm />
    <SignOutButton /> {/* Add the SignOut button here */}
  </div>
);

// SignOut button component
const SignOutButton = () => {
  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    window.location.href = '/signin'; // Redirect to SignIn page after signout
  };

  return (
    <button className="signout-btn" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default App;
