import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:5001/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDashboardData(data);
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  const eventStatusData = [
    { name: 'Upcoming', value: dashboardData.upcomingEvents || 0 },
    { name: 'Ongoing', value: dashboardData.ongoingEvents || 0 },
    { name: 'Completed', value: dashboardData.completedEvents || 0 },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <div className="stats shadow mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="stat-value">{dashboardData.totalBookedSeats}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">₹{dashboardData.totalRevenue}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
