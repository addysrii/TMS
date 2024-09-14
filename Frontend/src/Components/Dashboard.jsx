import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome,FaDollarSign , FaUser, FaTicketAlt, FaCalendarAlt, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import { useEffect } from 'react';
const Dashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-2xl font-bold">Ticket Management</div>
        <ul className="mt-6">
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/events">
              <FaHome className="inline-block mr-2" /> Home
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/dashboard/tickets">
              <FaTicketAlt className="inline-block mr-2" /> My Tickets
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/dashboard/events">
              <FaCalendarAlt className="inline-block mr-2" /> Browse Events
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/dashboard/bookings">
              <FaUser className="inline-block mr-2" /> My Bookings
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/dashboard/settings">
              <FaCog className="inline-block mr-2" /> Settings
            </Link>
          </li>
          <li className="py-2 px-4 hover:bg-gray-700">
            <Link to="/logout">
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <FaBell className="text-gray-600 text-xl mr-4" />
            <div className="relative">
              <img
                src=""
                alt="User"
                className="rounded-full w-10 h-10"
              />
              <div className="absolute top-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <OverviewCard title="Upcoming Events" count={5} icon={<FaCalendarAlt />} />
          <OverviewCard title="Pending Tickets" count={2} icon={<FaTicketAlt />} />
          <OverviewCard title="Total Spent" count="$350" icon={<FaDollarSign />} />
        </div>

        {/* My Tickets */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">My Tickets</h2>
          <TicketsTable />
        </div>
      </div>
    </div>
  );
};

const OverviewCard = ({ title, count, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className="text-3xl text-gray-600 mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
};



const TicketsTable = () => {
  // Example ticket data
  const tickets = [
    { id: 1, eventName: 'Concert A', date: '01-09-2024', venue: 'Stadium X', status: 'Confirmed' },
    { id: 2, eventName: 'Festival B', date: '15-09-2024', venue: 'Park Y', status: 'Pending' },
  ];

  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="py-2 px-4">Event Name</th>
          <th className="py-2 px-4">Date</th>
          <th className="py-2 px-4">Venue</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.id} className="border-b">
            <td className="py-2 px-4">{ticket.eventName}</td>
            <td className="py-2 px-4">{ticket.date}</td>
            <td className="py-2 px-4">{ticket.venue}</td>
            <td className="py-2 px-4">{ticket.status}</td>
            <td className="py-2 px-4">
              <button className="btn btn-sm btn-primary">View</button>
              <button className="btn btn-sm btn-secondary ml-2">Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Dashboard;
