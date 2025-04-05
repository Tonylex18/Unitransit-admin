import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserTypeSelection from './components/auth/UserTypeSelection';
import AdminDashboard from './components/admin/AdminDashboard';
import PassengerDashboard from './components/passenger/PassengerDashboard';
import DriverDashboard from './components/driver/DriverDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserTypeSelection />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/passenger" element={<PassengerDashboard />} />
        <Route path="/driver" element={<DriverDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;