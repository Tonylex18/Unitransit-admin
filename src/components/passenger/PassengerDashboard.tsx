import { useState, useEffect } from 'react';
import { MapPin, Clock, Star, Car, User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PassengerDashboard() {
  const [activeTab, setActiveTab] = useState('available-drivers');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
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
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    });
  }

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
            onClick={() => setActiveTab('available-drivers')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'available-drivers' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Available Drivers
          </button>
          <button 
            onClick={() => setActiveTab('ride-history')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'ride-history' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5 mr-3" />
            Ride History
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
          {activeTab === 'available-drivers' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Available Drivers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={`https://i.pravatar.cc/40?img=${i + 10}`}
                        alt=""
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">Mike Smith</h3>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Car className="w-4 h-4 mr-2" />
                        Toyota Camry - ABC 123
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        2.5 km away
                      </div>
                    </div>
                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Request Ride
                    </button>
                  </div>
                ))}
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
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ride-history' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Ride History</h2>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          2024-03-{i < 10 ? `0${i}` : i}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={`https://i.pravatar.cc/40?img=${i + 10}`}
                              alt=""
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <span>Mike Smith</span>
                          
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">123 Main St</td>
                        <td className="px-6 py-4 whitespace-nowrap">456 Oak Ave</td>
                        <td className="px-6 py-4 whitespace-nowrap">$15.{i}0</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Completed
                          </span>
                        </td>
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
        </div>
      </main>
    </div>
  );
}