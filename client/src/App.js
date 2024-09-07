import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import CreateForm from './components/CreateForm';
import FormList from './components/FormList';

function App() {
  // Simulating user authentication state with a token (in real app, use proper auth management)
  const isAuthenticated = !!localStorage.getItem('token');

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

// HomePage component that displays forms
const HomePage = () => (
  <div>
    <h1>Welcome to the Forms Page</h1>
    <CreateForm />
    <FormList />
  </div>
);

export default App;
