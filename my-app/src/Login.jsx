import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Bus, MapPin, UserCircle, Lock, Mail, School } from 'lucide-react';
import './Style.css'; // Importing custom CSS file for animation

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    studentId: '',
    role: 'student', // default value
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    if (isLogin) {
      // Login flow
      const user = storedUsers.find(
        (u) => u.email === formData.email && u.password === formData.password && u.role === formData.role
      );

      if (user) {
        localStorage.setItem('username', user.name);
        localStorage.setItem('role', user.role);
        navigate('/dashboard');
      } else {
        alert('Invalid credentials! Please try again.');
      }
    } else {
      // Sign up flow
      storedUsers.push(formData);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      alert('Sign Up Successfully!');
      setIsLogin(true);
    }
  }; 

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
   <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-700 opacity-20 z-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-3/4 h-2 bg-yellow-400 rounded-full transform rotate-45"></div>
            <div className="absolute top-1/2 left-0 w-3/4 h-2 bg-yellow-400 rounded-full transform -rotate-12"></div>
            <div className="absolute bottom-1/3 right-1/4 w-1/2 h-2 bg-yellow-400 rounded-full transform rotate-12"></div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Bus size={80} className="text-indigo-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">Chitkara Campus Bus</h1>
          <p className="text-xl text-white mb-8">Track your Chitkara college buses in real-time and never miss a ride again!</p>

          <div className="flex flex-col gap-4 items-center">
            <div className="flex items-center gap-3 bg-indigo-500 bg-opacity-40 p-4 rounded-lg text-white">
              <MapPin className="text-yellow-300" />
              <span>Real-time GPS tracking</span>
            </div>
            <div className="flex items-center gap-3 bg-indigo-500 bg-opacity-40 p-4 rounded-lg text-white">
              <School className="text-yellow-300" />
              <span>Campus-wide coverage</span>
            </div>
            <div className="flex items-center gap-3 bg-indigo-500 bg-opacity-40 p-4 rounded-lg text-white">
              <UserCircle className="text-yellow-300" />
              <span>Student-friendly interface</span>
            </div>
          </div>
        </div>

        {/* Animated bus */}
        <div className="absolute bottom-12 left-0 w-1/2 overflow-hidden">
          <div className="relative w-full h-12">
            <div className="absolute left-0 bottom-0 animate-moveBus">
              <Bus size={48} className="text-yellow-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-indigo-600 mb-2">
              {isLogin ? 'Welcome Back!' : 'Join Campus Commute'}
            </h2>
            <p className="text-gray-600">
              {isLogin
                ? 'Sign in to access your college bus tracker'
                : 'Create an account to start tracking college buses'}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit}>
              {/* Toggle buttons */}
              <div className="flex rounded-lg overflow-hidden mb-8 bg-gray-100">
                <button
                  type="button"
                  className={`w-1/2 py-3 text-center ${isLogin ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`w-1/2 py-3 text-center ${!isLogin ? 'bg-indigo-600 text-white' : 'text-gray-600'}`}
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </div>

              {/* Full Name (only Signup) */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <UserCircle className="text-gray-400" size={20} />
                    </span>
                    <input
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      type="text"
                      minLength={1}
                      maxLength={25}
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Student ID (only Signup) */}
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentId">
                    Student ID
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <School className="text-gray-400" size={20} />
                    </span>
                    <input
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                      type="text"
                      id="studentId"
                      name="studentId"
                      placeholder="Enter your student ID"
                      value={formData.studentId}
                      onChange={handleChange}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="text-gray-400" size={20} />
                  </span>
                  <input
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="text-gray-400" size={20} />
                  </span>
                  <input
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    type="password"
                    id="password"
                    name="password"
                    placeholder={isLogin ? "Enter your password" : "Create a password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role selection */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                  {isLogin ? "Login as" : "Sign Up as"}
                </label>
                <div className="relative">
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="admin">Driver</option>
                  </select>
                </div>
              </div>

              {/* Remember Me (only for login) */}
              {isLogin && (
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Toggle Form */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleForm}
                  className="ml-1 text-indigo-600 hover:text-indigo-800 font-medium"
                  type="button"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
