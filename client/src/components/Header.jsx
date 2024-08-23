import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../../api/api';
// import logo from '../logo.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is logged in by verifying the presence of a JWT token in local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location.pathname]); // Added location.pathname to watch for route changes

    const handleSearch = (event) => {
        event.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', searchTerm);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            await logoutUser(token);

            localStorage.removeItem('token');
            setIsLoggedIn(false); // Update the state to reflect the user is logged out
            navigate('/'); // Redirect to home page
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
            navigate('/');
        }
    }, [isLoggedIn, location.pathname, navigate]);

    return (
        <header className='bg-gray-200'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link className='flex items-center gap-2' to='/'>
                    {/* <img alt='' src={logo} className='max-h-10' /> */}
                    <span className='font-bold text color4'>exp.club</span>
                </Link>

                <form
                    onSubmit={handleSearch}
                    className='text-center bg-color1 p-2 rounded-full flex justify-center items-center hover:scale-105 hover:px-5 border-2 border-color3'
                >
                    <input
                        type='text'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Search...'
                        className='bg-transparent border-color3 focus:outline-none w-24 sm:w-64'
                    />

                    <button type='submit'>
                        <FaSearch className='text-color4'></FaSearch>
                    </button>
                </form>

                <ul className='flex gap-9'>
                    <Link to='/about'>
                        <li className='text-color4 hover:text-color3 hover:scale-110'>About Us</li>
                    </Link>

                    {isLoggedIn ? (
                        <>
                            <Link to='/my-listings'>
                                <li className='text-color4 hover:text-color3 hover:scale-110'>Your Listings</li>
                            </Link>
                            <li
                                onClick={handleLogout}
                                className='text-color4 hover:text-color3 hover:scale-110 cursor-pointer'
                            >
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <Link to='/register'>
                                <li className='text-color4 hover:text-color3 hover:scale-110'>Register</li>
                            </Link>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Header;
