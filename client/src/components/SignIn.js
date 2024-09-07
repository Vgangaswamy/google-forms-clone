import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css'; 

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Submitting login data:', formData);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Login response:', res.data);
      localStorage.setItem('token', res.data.token);
  
      toast.success('Login successful!', { position: "top-right" });
  
      setTimeout(() => {
        console.log('Redirecting to home page');
        navigate('/home');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      toast.error('Login failed. Invalid credentials.', { position: "top-right" });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="signin-container">
      <ToastContainer /> {/* Container to display toast notifications */}
      <h2>Sign In</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit" disabled={isSubmitting}>Login</button>
      </form>
      <p>Don't have an account? <a href="/">Sign Up</a></p> {/* Link to sign-up page */}
    </div>
  );
};

export default SignIn;
