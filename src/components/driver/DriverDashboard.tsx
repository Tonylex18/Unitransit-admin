import { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Car, User, Settings, LogOut, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DriverDashboard() {
  const [activeTab, setActiveTab] = useState('ride-requests');
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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-blue-600">UniTransit</h1>
        </div>
        <nav className="p-4">
          <button 
            onClick={() => setActiveTab('ride-requests')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'ride-requests' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Ride Requests
          </button>
          <button 
            onClick={() => setActiveTab('earnings')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'earnings' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <DollarSign className="w-5 h-5 mr-3" />
            Earnings
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5 mr-3" />
            History
          </button>
          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5 mr-3" />
            My Profile
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
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
        <div className="p-8">
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
                <div className="flex items-center mb-6">
                  <img
                    src="https://i.pravatar.cc/100"
                    alt=""
                    className="w-20 h-20 rounded-full mr-6"
                  />
                  <div>
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
                    <div className="grid grid-cols-2 gap-4">
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
                      <div className="col-span-2">
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