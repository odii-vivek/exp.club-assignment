import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/api';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            setError('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await registerUser({ name, email, password });
            const { token, user } = response.data;

            // Store the token and user data as an object
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user)); // Ensure user is stringified here
            localStorage.setItem('isLoggedIn', 'true');

            // Redirect to home page
            navigate('/');
        } catch (err) {
            const errMsg = err.response?.data?.msg || 'An error occurred. Please try again.';
            setError(errMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
                <div className="md:w-1/2 px-5">
                    <h2 className="text-2xl font-bold text-slate-700">Register</h2>
                    <p className="text-sm mt-4 text-slate-700">Create a new account</p>

                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-gray-400">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoFocus
                                autoComplete="name"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="email" className="block text-gray-400">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Email Address"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                autoComplete="email"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="password" className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                                minLength={6}
                                autoComplete="new-password"
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 mb-4 mt-2 text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Registering...' : 'Register'}
                        </button>
                    </form>

                    <div className="text-sm flex justify-between items-center mt-3">
                        <p>Already have an account?</p>
                        <a href="/login">
                            <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-blue-400">
                                Login
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

export default Register;
