import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://tms-backend2.onrender.com/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
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

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Event Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventStatusData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Refresh Data
      </button>
    </div>
  );
};

export default AdminDashboard;
