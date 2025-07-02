import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/login`, {
        email,
        password,
      });

      // login now returns the correct merged cart
      const mergedCart = await login(response.data.token, cart);
      setCart(mergedCart);

      setMessage(response.data.message || 'Login successful');
      setError('');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {message && <p className="mb-4 text-center text-green-600">{message}</p>}
        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          {/* Forgot */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition duration-200"
          >
            Sign In
          </button>
        </form>
        {/* Sign Up */}
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;