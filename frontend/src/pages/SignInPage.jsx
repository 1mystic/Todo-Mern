import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL || 'https://todo-mern-2-evqm.onrender.com/api';

const SignInPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- This must be inside the component

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Login failed.');
      } else {
        login(data.token); // Use context to update auth state
        navigate('/tasks');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-background py-12">
      <form onSubmit={handleSubmit} className="bg-white border-4 border-primary rounded-brutal shadow-brutal p-10 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-3xl font-anime text-primary mb-2 text-center">Sign In</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
        <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-white font-anime text-lg rounded-brutal border-2 border-secondary shadow-brutal hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Signing In...' : 'Sign In'}</button>
        <div className="text-center text-gray-600 mt-2">
          Don&apos;t have an account? <Link to="/signup" className="text-primary underline font-semibold">Sign Up</Link>
        </div>
      </form>
    </section>
  );
};

export default SignInPage;
