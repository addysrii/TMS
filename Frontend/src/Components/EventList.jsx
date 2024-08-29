import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faSearch } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div className="navbar sticky top-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4 shadow-lg z-50 flex flex-wrap justify-between items-center">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <Link to="/" className="text-2xl sm:text-3xl font-extrabold text-white ml-4">
          <h1>BookForMe</h1>
        </Link>
        <button className="sm:hidden text-white focus:outline-none" aria-label="Toggle search">
          <FontAwesomeIcon icon={faSearch} className="text-white w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center mt-4 sm:mt-0 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search for books, authors..."
          className="input input-bordered w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-10 rounded-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button className="ml-4 hidden sm:block">
          <FontAwesomeIcon icon={faLocationDot} className="text-white w-6 sm:w-8 h-6 sm:h-8" />
        </button>
      </div>

      <div className="ml-52 flex items-center space-x-4 mt-4 sm:mt-0">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle avatar border-2 border-white">
            <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full ring ring-pink-300 ring-offset-base-100 ring-offset-2">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-40 sm:w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge bg-pink-500 text-white">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            {isLoggedIn && (
              <li><a onClick={handleLogout}>Logout</a></li>
            )}
          </ul>
        </div>
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="btn bg-white text-pink-500 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-pink-500 hover:text-white transition ease-in-out duration-200">
              Login
            </button>
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="btn bg-white text-pink-500 font-semibold py-2 px-4 rounded-full shadow-md hover:bg-pink-500 hover:text-white transition ease-in-out duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
