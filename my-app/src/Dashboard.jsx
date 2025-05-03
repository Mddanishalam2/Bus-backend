import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; //  Navigation ke liye

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); //  navigation hook
  useEffect(() => {
    const user = localStorage.getItem('username');
    setUsername(user || 'User');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/'; // logout ke baad homepage
  };

  const handleTrackBus = () => {
    navigate('/map'); // navigate to map page
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-indigo-600">Welcome, {username} 👋</h1>
      <p className="mt-4 text-gray-600">Track your bus location here 🚍</p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleTrackBus}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg"
        >
          🚍 Track Your Bus
        </button>

        <button
        onClick={handleLogout}
        className="fixed top-5 right-5 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>

      </div>
    </div>
  );
}
