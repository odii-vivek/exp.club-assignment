import React, { useState } from 'react';
import { loginUser } from '../../api/api'; // Import the login function from api.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await loginUser({ email, password });
      const { token } = response.data;

      // Store the token and set user as logged in
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      
      // Redirect to home page
      window.location.href = '/home';
    } catch (err) {
      setError(err.response?.data?.errors || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-h-screen bg-gray-200 flex items-center justify-center">
      <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
        <div className="md:w-1/2 px-5">
          <h2 className="text-2xl font-bold text-slate-700">Login</h2>
          <p className="text-sm mt-4 text-slate-700">If you have an account, please login</p>

          {error && (
            <div className="text-red-500 mb-4">
              {error}
            </div>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-gray-400">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete="email"
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                minLength={6}
                autoComplete="current-password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>

          <div className="text-sm flex justify-between items-center mt-3">
            <p>If you don't have an account...</p>
            <a href="/register">
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                Register
              </button>
            </a>
          </div>
        </div>

        <div className="w-1/2 md:block hidden">
          <img
            src="../logo.png"
            className="rounded-2xl"
            alt="page img"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
