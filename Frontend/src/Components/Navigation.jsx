import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

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
    <div className="navbar sticky top-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-4 shadow-lg z-50">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-extrabold text-white ml-4">
          <h1>BookForMe</h1>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <input
          type="text"
          placeholder="Search for books, authors..."
          className="input input-bordered w-1/2 h-10 rounded-full px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button className="ml-4">
          <FontAwesomeIcon icon={faLocationDot} className="text-white w-8 h-8" />
        </button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-circle avatar border-2 border-white">
            <div className="w-12 h-12 rounded-full ring ring-pink-300 ring-offset-base-100 ring-offset-2">
              <img
                alt="Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 p-2 shadow-lg bg-white rounded-box w-52"
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
