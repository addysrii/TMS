
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navigation from './Components/Navigation'
import EventList from './Components/EventList'
import Login from './Components/Login';
import Dashboard from "./Components/Dashboard"
import Landing from './Components/Landing';
import Register from './Components/Register';
function App() {
  

  return (
    <>
<Router>
      <Navigation />
      <Routes>
          <Route path="/" element={<Landing />} />
        <Route path="/events" element={<EventList />} />
            <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
