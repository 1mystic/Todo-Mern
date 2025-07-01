import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://todo-mern-2-evqm.onrender.com/api/';
const MOODS = [
  { value: 'Focused', label: '🎯 Focused' },
  { value: 'Happy', label: '😊 Happy' },
  { value: 'Sad', label: '😔 Sad' },
  { value: 'Inspired', label: '🤩 Inspired' },
  { value: 'Stressed', label: '😵 Stressed' },
];

function getToken() {
  return localStorage.getItem('token');
}

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterMood, setFilterMood] = useState('');
  const [form, setForm] = useState({ title: '', description: '', mood: '', dueDate: '' });
  const [editing, setEditing] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      let url = `${API_URL}/tasks`;
      if (filterMood) url += `?mood=${encodeURIComponent(filterMood)}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError('Could not load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [filterMood]);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.mood) {
      setError('Title and mood are required.');
      return;
    }
    setError('');
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `${API_URL}/tasks/${editing}` : `${API_URL}/tasks`;
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          mood: form.mood,
          dueDate: form.dueDate || undefined,
        }),
      });
      if (!res.ok) throw new Error('Failed to save task');
      setForm({ title: '', description: '', mood: '', dueDate: '' });
      setEditing(null);
      fetchTasks();
    } catch (err) {
      setError('Could not save task.');
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setForm({
      title: task.title,
      description: task.description || '',
      mood: task.mood,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : '',
    });
    setEditing(task._id);
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to delete');
      fetchTasks();
    } catch {
      setError('Could not delete task.');
    }
  };

  // Toggle complete
  const handleToggleComplete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}/complete`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error('Failed to toggle');
      fetchTasks();
    } catch {
      setError('Could not update task.');
    }
  };

  return (
    <section className="flex flex-col items-center py-16 bg-background min-h-[70vh]">
      <div className="bg-white border-4 border-secondary rounded-brutal shadow-brutal p-10 w-full max-w-2xl mb-8">
        <h2 className="text-3xl font-anime text-secondary mb-6">Your Tasks</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            required
            className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={form.description}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-semibold">Mood:</span>
            {MOODS.map((m) => (
              <label key={m.value} className={`px-3 py-2 rounded-brutal border-2 cursor-pointer font-anime text-lg ${form.mood === m.value ? 'bg-primary text-white border-primary' : 'bg-background border-secondary text-secondary'}`}>
                <input
                  type="radio"
                  name="mood"
                  value={m.value}
                  checked={form.mood === m.value}
                  onChange={handleChange}
                  className="hidden"
                  required
                />
                {m.label}
              </label>
            ))}
          </div>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="px-4 py-3 border-2 border-secondary rounded-brutal font-sans text-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <button type="submit" className="px-6 py-2 bg-primary text-white font-anime text-lg rounded-brutal border-2 border-secondary shadow-brutal hover:bg-secondary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150">
              {editing ? 'Update Task' : 'Add Task'}
            </button>
            {editing && (
              <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', mood: '', dueDate: '' }); }} className="px-4 py-2 bg-secondary text-white font-anime text-lg rounded-brutal border-2 border-primary shadow-brutal hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150">
                Cancel
              </button>
            )}
          </div>
        </form>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="font-semibold">Filter by mood:</span>
          <button onClick={() => setFilterMood('')} className={`px-3 py-1 rounded-brutal border-2 font-anime text-lg ${!filterMood ? 'bg-primary text-white border-primary' : 'bg-background border-secondary text-secondary'}`}>All</button>
          {MOODS.map((m) => (
            <button key={m.value} onClick={() => setFilterMood(m.value)} className={`px-3 py-1 rounded-brutal border-2 font-anime text-lg ${filterMood === m.value ? 'bg-primary text-white border-primary' : 'bg-background border-secondary text-secondary'}`}>{m.label}</button>
          ))}
        </div>
        {error && <div className="text-red-600 font-semibold mb-4">{error}</div>}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">No tasks found.</div>
        ) : (
          <ul className="flex flex-col gap-4">
            {tasks.map((task) => (
              <li key={task._id} className={`flex flex-col md:flex-row md:items-center justify-between gap-2 p-4 border-2 rounded-brutal shadow-soft ${task.completed ? 'bg-gray-100 border-primary' : 'bg-background border-secondary'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-anime text-lg">{MOODS.find(m => m.value === task.mood)?.label || task.mood}</span>
                    <span className={`ml-2 px-2 py-1 rounded-brutal text-xs font-bold ${task.completed ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>{task.completed ? 'Completed' : 'Active'}</span>
                  </div>
                  <div className="font-bold text-xl mb-1">{task.title}</div>
                  {task.description && <div className="text-gray-700 mb-1">{task.description}</div>}
                  {task.dueDate && <div className="text-xs text-gray-500">Due: {task.dueDate.slice(0, 10)}</div>}
                </div>
                <div className="flex flex-col md:flex-row gap-2 items-center">
                  <button onClick={() => handleToggleComplete(task._id)} className={`px-3 py-1 rounded-brutal border-2 font-anime text-sm ${task.completed ? 'bg-secondary text-white border-primary' : 'bg-primary text-white border-secondary'} transition-colors duration-150`}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                  <button onClick={() => handleEdit(task)} className="px-3 py-1 rounded-brutal border-2 border-secondary font-anime text-sm bg-background text-secondary hover:bg-primary hover:text-white transition-colors duration-150">Edit</button>
                  <button onClick={() => handleDelete(task._id)} className="px-3 py-1 rounded-brutal border-2 border-red-500 font-anime text-sm bg-background text-red-600 hover:bg-red-500 hover:text-white transition-colors duration-150">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TasksPage; 
