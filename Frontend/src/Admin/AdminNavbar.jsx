import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
  return (
    <nav className="navbar bg-gray-800 text-white">
      <div className="navbar-start">
        <Link to="/admin/dashboard" className="btn btn-ghost normal-case text-xl">Admin Panel</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/admin/events">Manage Events</Link></li>
          <li><Link to="/admin/users">Manage Users</Link></li>
          <li><Link to="/admin/bookings">Manage Bookings</Link></li>
          <li><Link to="/admin/profile">Profile & Settings</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavBar;
