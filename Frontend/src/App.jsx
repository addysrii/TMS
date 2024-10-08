import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import EventList from './Components/EventList';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Landing from './Components/Landing';
import Register from './Components/Register';
import ManageUsers from './Admin/ManageUsers';
import ManageBookings from './Admin/ManageBookings';
import ManageEvents from './Admin/ManageEvents';
import AdminDashboard from './Admin/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Routes>
          {/* Define all your routes here */}
          <Route path="/" element={<Landing />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/manageevents" element={<ManageEvents />} />
          <Route path="/admin/managebookings" element={<ManageBookings />} />
          <Route path="/admin/manageusers" element={<ManageUsers />} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
