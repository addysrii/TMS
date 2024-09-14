import React, { useState } from 'react';
import axios from 'axios';

const AdminCreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [seats, setSeats] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('seats', seats);
    formData.append('image', image);

    // Log the form data to the console
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to create an event');
            return;
        }
        const { data } = await axios.post('http://${import.meta.env.BASE_URL}/api/events/', formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        setMessage('Event created successfully!');
        setTitle('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setPrice('');
        setSeats('');
        setImage(null);
    } catch (error) {
        if (error.response && error.response.data) {
            setMessage(error.response.data.message || 'Failed to create event.');
        } else {
            setMessage('Failed to create event.');
        }
    }
};

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="card bg-white shadow-lg w-full max-w-md">
        <div className="card-body">
          <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
          {message && <div className="alert">{message}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label htmlFor="title" className="label">Event Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="description" className="label">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <div className="form-control">
              <label htmlFor="startDate" className="label">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="endDate" className="label">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="location" className="label">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="price" className="label">Price</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="seats" className="label">Seats</label>
              <input
                type="number"
                id="seats"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="image" className="label">Event Image</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">Create Event</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateEvent;
