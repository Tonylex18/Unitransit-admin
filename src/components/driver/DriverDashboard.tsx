import { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Car, User, Settings, LogOut, DollarSign, Menu, X, Search, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState('ride-requests');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    phone: '987-654-3210',
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      plate: 'XYZ 789',
    },
  });
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Close sidebar when changing tabs on mobile
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // Close sidebar by default on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function fetchProfile() {
    // Mock data for profile
    setProfile({
      name: 'Jane Doe',
      email: 'janedoe@example.com',
      phone: '987-654-3210',
      vehicle: {
        make: 'Toyota',
        model: 'Camry',
        plate: 'XYZ 789',
      },
    });
  }

  // Handle sign out with redirect to home page
  const handleSignOut = () => {
    signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
        navigate('/');
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-20
        w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">UniTransit</h1>
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-4">
          <button 
            onClick={() => handleTabChange('ride-requests')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'ride-requests' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Ride Requests
          </button>
          <button 
            onClick={() => handleTabChange('earnings')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'earnings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <DollarSign className="w-5 h-5 mr-3" />
            Earnings
          </button>
          <button 
            onClick={() => handleTabChange('history')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5 mr-3" />
            History
          </button>
          <button 
            onClick={() => handleTabChange('profile')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5 mr-3" />
            My Profile
          </button>
          <button 
            onClick={() => handleTabChange('settings')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </button>
          <button 
            onClick={handleSignOut}
            className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 mt-auto"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-4 md:px-8 py-4">
            <div className="flex items-center">
              <button 
                className="mr-4 md:hidden text-gray-600"
                onClick={toggleSidebar}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 w-full md:w-auto">
                <Search className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="bg-transparent border-none focus:outline-none w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Admin" 
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium hidden md:inline">Driver</span>
                <ChevronDown className="w-4 h-4 text-gray-600 hidden md:inline" />
              </div>
            </div>
          </div>
        </header>
        <div className="p-4 md:p-8">
          {activeTab === 'ride-requests' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ride Requests</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i}`}
                        alt=""
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">Passenger {i}</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1">4.{i}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Pick up: Location {i}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Drop off: Destination {i}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Estimated fare: ${i * 10}.00
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <button className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Accept
                      </button>
                      <button className="bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Earnings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">Today's Earnings</h3>
                  <p className="text-3xl font-bold">$125.00</p>
                  <p className="text-green-600 text-sm mt-2">8 completed rides</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">This Week</h3>
                  <p className="text-3xl font-bold">$850.00</p>
                  <p className="text-green-600 text-sm mt-2">45 completed rides</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-2">This Month</h3>
                  <p className="text-3xl font-bold">$3,250.00</p>
                  <p className="text-green-600 text-sm mt-2">180 completed rides</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ride History</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passenger</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[1, 2, 3].map((i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">2024-03-{i < 10 ? `0${i}` : i}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Passenger {i}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Location {i}</td>
                          <td className="px-6 py-4 whitespace-nowrap">Destination {i}</td>
                          <td className="px-6 py-4 whitespace-nowrap">${i * 10}.00</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Settings</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>Email</option>
                      <option>SMS</option>
                      <option>Push Notifications</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select className="w-full px-3 py-2 border rounded-lg">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">My Profile</h2>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt=""
                    className="w-20 h-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-semibold">{profile.name}</h3>
                    <p className="text-gray-600">{profile.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      className="w-full px-3 py-2 border rounded-lg"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="border-t pt-4 mt-4">
                    <h4 className="font-semibold mb-4">Vehicle Information</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Make
                        </label>
                        <input
                          type="text"
                          value={profile.vehicle?.make}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Model
                        </label>
                        <input
                          type="text"
                          value={profile.vehicle?.model}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          License Plate
                        </label>
                        <input
                          type="text"
                          value={profile.vehicle?.plate}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}