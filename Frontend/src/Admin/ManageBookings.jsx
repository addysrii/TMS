
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.BASE_URL}/api/admin/bookings`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.BASE_URL}/api/admin/bookings/${id}`, { status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setBookings(bookings.map((booking) => (booking._id === id ? { ...booking, status } : booking)));
    } catch (error) {
      console.error('Error updating booking status', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manage Bookings</h2>
      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th>Event</th>
            <th>User</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.event.title}</td>
              <td>{booking.user.name}</td>
              <td>{booking.status}</td>
              <td>
                <select
                  value={booking.status}
                  onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
