import Event from '../modles/eventModel.js';
import User from '../modles/userModel.js';

const adminControllerFunction = {
  getDashboardData: async (req, res) => {
    try {
      const totalEvents = await Event.countDocuments();
      const totalUsers = await User.countDocuments();
      const totalBookings = await Event.aggregate([
        {
          $group: {
            _id: null,
            totalBookedSeats: { $sum: '$bookedSeats' }
          }
        }
      ]);

      res.json({
        totalEvents,
        totalUsers,
        totalBookedSeats: totalBookings[0] ? totalBookings[0].totalBookedSeats : 0
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching dashboard data', error });
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
    }
  },

  createEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(201).json(savedEvent);
    } catch (error) {
      res.status(500).json({ message: 'Error creating event', error });
    }
  },

  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        Object.assign(event, req.body);
        const updatedEvent = await event.save();
        res.json(updatedEvent);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating event', error });
    }
  },

  deleteEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event) {
        await event.remove();
        res.json({ message: 'Event removed' });
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting event', error });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users', error });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
  },

  // Booking is handled directly in the Event model, so no separate booking functions are needed.
  updateBookingStatus: async (req, res) => {
    try {
      const event = await Event.findById(req.params.eventId);
      if (event) {
        const { status } = req.body;
        event.bookedSeats = status === 'confirmed' ? event.bookedSeats + 1 : event.bookedSeats;
        const updatedEvent = await event.save();
        res.json(updatedEvent);
      } else {
        res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking status', error });
    }
  }
};

export default adminControllerFunction ;
