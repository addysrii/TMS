import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from "../public/image.png";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`http://${import.meta.env.BASE_URL}/api/admin/login`, { email, password });
      localStorage.setItem('token', data.token);
      navigate('/events'); // Navigate to dashboard or home page after login
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label htmlFor="email" className="label text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {error && (
            <div className="alert alert-error bg-red-100 border border-red-400 text-red-700 rounded-lg p-4 shadow-sm">
              <div>
                <span>{error}</span>
              </div>
            </div>
          )}
          <div className="form-control mt-6">
            <button type="submit" className="btn w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 transition duration-200 ease-in-out">
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-800">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
