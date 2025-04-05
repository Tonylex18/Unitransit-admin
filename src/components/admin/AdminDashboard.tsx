import { useState, useEffect } from 'react';
import { Users, Car, ChevronDown, Bell, Search, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('passengers');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalPassengers: 100, // Mock data
    activeDrivers: 50, // Mock data
    totalRides: 200, // Mock data
  });
  const { signOut } = useAuth();
  const navigate = useNavigate();

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

  useEffect(() => {
    // Mock fetching stats
    setStats({
      totalPassengers: 100,
      activeDrivers: 50,
      totalRides: 200,
    });
  }, []);

  const handleSignout = () => {
    signOut()
    .then(() => {
      navigate('/');
    })
    .catch((error) => {
      console.error('Error during sign out:', error);
      navigate('/');
    });
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative z-20 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0`}>
        <div className="p-4 border-b flex justify-between items-center">
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
            onClick={() => {
              setActiveTab('passengers');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${
              activeTab === 'passengers' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Passengers
          </button>
          <button 
            onClick={() => {
              setActiveTab('drivers');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
            className={`flex items-center w-full p-3 rounded-lg ${
              activeTab === 'drivers' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
            }`}
          >
            <Car className="w-5 h-5 mr-3" />
            Drivers
          </button>
          <button 
            onClick={handleSignout}
            className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 mt-8"
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
                <span className="font-medium hidden md:inline">Admin</span>
                <ChevronDown className="w-4 h-4 text-gray-600 hidden md:inline" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-2">Total Passengers</h3>
              <p className="text-3xl font-bold">{stats.totalPassengers}</p>
              <p className="text-green-600 text-sm mt-2">+12% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-2">Active Drivers</h3>
              <p className="text-3xl font-bold">{stats.activeDrivers}</p>
              <p className="text-green-600 text-sm mt-2">+5% from last month</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h3 className="text-lg font-semibold mb-2">Total Rides</h3>
              <p className="text-3xl font-bold">{stats.totalRides}</p>
              <p className="text-green-600 text-sm mt-2">+18% from last month</p>
            </div>
          </div>

          {activeTab === 'passengers' ? (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-semibold">Recent Passengers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rides</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={`https://i.pravatar.cc/40?img=${i}`}
                              alt="" 
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">John Doe</div>
                              <div className="text-sm text-gray-500">ID: #12345{i}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">john.doe@example.com</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">{Math.floor(Math.random() * 50)}</td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 md:p-6 border-b">
                <h2 className="text-lg md:text-xl font-semibold">Active Drivers</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Vehicle</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i}>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img 
                              src={`https://i.pravatar.cc/40?img=${i + 10}`}
                              alt="" 
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <div className="font-medium">Mike Smith</div>
                              <div className="text-sm text-gray-500">ID: #67890{i}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <div>Toyota Camry</div>
                          <div className="text-sm text-gray-500">ABC 123{i}</div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">4.{Math.floor(Math.random() * 9)}</span>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            i % 2 === 0 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {i % 2 === 0 ? 'On Trip' : 'Available'}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}