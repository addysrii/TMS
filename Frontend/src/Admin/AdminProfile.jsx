import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data } = await axios.get('http://localhost:5001/api/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAdmin(data);
      setName(data.name);
      setEmail(data.email);
    };
    fetchAdminData();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put('http://localhost:5001/api/users/profile', { name, email }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAdmin(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin Profile</h2>
      <form onSubmit={updateProfile} className="mt-4 space-y-4">
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary w-full">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
