

import Event from "../modles/eventModel.js";


import Event from "../modles/eventModel.js";

const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, location, price, seats } = req.body;
    const imagePath = `/uploads/EventImages/${req.file.filename}`;
    console.log('Image Path:', imagePath); // Log the image path
const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, location, price, seats } = req.body;
    const imagePath = `/uploads/EventImages/${req.file.filename}`;
    console.log('Image Path:', imagePath); // Log the image path

    // Parse the dates
    // const [startDay, startMonth, startYear] = startDate.split('-');
    // const parsedStartDate = new Date(`${startYear}-${startMonth}-${startDay}`);
    
    // const [endDay, endMonth, endYear] = endDate.split('-');
    // const parsedEndDate = new Date(`${endYear}-${endMonth}-${endDay}`);

    const event = new Event({
      title,
      description,
      startDate,
      endDate,
      location,
      price,
      seats,
      image: imagePath,
      createdBy: req.user._id
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEvents = async (req, res) => {
  try {
    const { title, location, date } = req.query;
    let query = {};

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (date) {
      const parsedDate = new Date(date);
      query.startDate = {
      query.startDate = {
        $lte: parsedDate.setHours(23, 59, 59, 999),
      };
      query.endDate = {
        $gte: parsedDate.setHours(0, 0, 0, 0),
      };
      query.endDate = {
        $gte: parsedDate.setHours(0, 0, 0, 0),
      };
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);  // Get the event by ID

    if (event) {
      const seatsToBook = parseInt(req.body.seatsToBook, 10);  // Get the number of seats to book from the request body

      // Check if the requested seats are available
      if (event.bookedSeats + seatsToBook > event.seats) {
        res.status(400);
        throw new Error('Not enough seats available');
      }

      // Ensure the booking is within the event's date range
      const now = new Date();
      if (now < event.startDate || now > event.endDate) {
const bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);  // Get the event by ID

    if (event) {
      const seatsToBook = parseInt(req.body.seatsToBook, 10);  // Get the number of seats to book from the request body

      // Check if the requested seats are available
      if (event.bookedSeats + seatsToBook > event.seats) {
        res.status(400);
        throw new Error('Not enough seats available');
      }

      // Ensure the booking is within the event's date range
      const now = new Date();
      if (now < event.startDate || now > event.endDate) {
        res.status(400);
        throw new Error('Booking is outside of the event date range');
      }

      event.bookedSeats += seatsToBook;  // Increment the booked seats by the number requested
      await event.save();

      res.json({ message: `${seatsToBook} seat(s) booked successfully` });
    } else {
      res.status(404);
      throw new Error('Event not found');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export  {createEvent, getEvents, getEventById, bookEvent,}