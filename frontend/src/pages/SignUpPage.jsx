import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'https://todo-mern-2-evqm.onrender.com/api';

const SignUpPage = () => {
  const [form, setForm] = useState({ email: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Registration failed.');
      } else {
        localStorage.setItem('token', data.token);
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
        <h2 className="text-3xl font-anime text-primary mb-2 text-center">Sign Up</h2>
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
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
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
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
          required
          className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <div className="text-red-600 font-semibold text-center">{error}</div>}
        <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-white font-anime text-lg rounded-brutal border-2 border-secondary shadow-brutal hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed">{loading ? 'Signing Up...' : 'Sign Up'}</button>
        <div className="text-center text-gray-600 mt-2">
          Already have an account? <a href="/signin" className="text-primary underline font-semibold">Sign In</a>
        </div>
      </form>
    </section>
  );
};

export default SignUpPage; 
