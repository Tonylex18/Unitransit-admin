import { useNavigate } from 'react-router-dom';
import { Car, User } from 'lucide-react';

export default function UserTypeSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome to UniTransit</h2>
          <p className="mt-2 text-gray-600">Choose how you want to continue</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => navigate('/passenger')}
            className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
          >
            <User className="w-6 h-6 mr-2" />
            Continue as Passenger
          </button>

          <button
            onClick={() => navigate('/driver')}
            className="w-full flex items-center justify-center px-8 py-6 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out"
          >
            <Car className="w-6 h-6 mr-2" />
            Continue as Driver
          </button>

          <div className="pt-4 text-center">
            <p className="text-sm text-gray-600">Are you an administrator?</p>
            <button
              onClick={() => navigate('/admin')}
              className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              Access Admin Panel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}