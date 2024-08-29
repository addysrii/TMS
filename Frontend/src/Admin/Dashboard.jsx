import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5001/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDashboardData(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="stats shadow mt-4">
        <div className="stat">
          <div className="stat-title">Total Events</div>
          <div className="stat-value">{dashboardData.totalEvents}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Users</div>
          <div className="stat-value">{dashboardData.totalUsers}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value">{dashboardData.totalBookings}</div>
        </div>
      </div>
    </div>
  );
}; 

export default AdminDashboard;
