import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await axios.get('http://${import.meta.env.BASE_URL}/api/admin/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const deleteEvent = async (id) => {
   if (window.confirm('Are you sure you want to delete this event?')) {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/admin/events/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    // Handle success, e.g., removing the event from the list in the UI
  } catch (error) {
    console.error('Error deleting the event', error);
  }
}


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Manage Events</h2>
      <Link to="/admin/events/create" className="btn btn-primary mb-4">
        Add Event
      </Link>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.title}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>
                <Link to={`/admin/events/edit/${event._id}`} className="btn btn-sm">
                  Edit
                </Link>
                <button onClick={() => deleteEvent(event._id)} className="btn btn-sm btn-error ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
