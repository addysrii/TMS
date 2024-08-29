import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('http://localhost:5001/api/events/');
      const data = await response.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => new Date(event.date) > new Date());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map(event => (
          <div
            key={event._id}
            className="card w-full bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          >
            <figure className="h-56 overflow-hidden">
              <img
                src={`http://localhost:5001${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-6">
              <h2 className="card-title text-2xl font-semibold text-gray-900">{event.title}</h2>
              <p className="text-gray-700 mt-2">{event.description}</p>
              <p className="mt-4 text-gray-600">
                <strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-IN')}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/event/${event._id}`}
                  className="btn bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-200 ease-in-out"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
