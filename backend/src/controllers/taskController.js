const Task = require('../models/Task');

// Get all tasks for user, with optional mood/completed/sort filtering
exports.getTasks = async (req, res) => {
  try {
    const { mood, completed, sort } = req.query;
    const filter = { user: req.user.id };
    if (mood) filter.mood = mood;
    if (completed !== undefined) filter.completed = completed === 'true';
    let query = Task.find(filter);
    if (sort) query = query.sort({ [sort]: 1 });
    const tasks = await query;
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tasks.' });
  }
};

// Get a single task by id (must belong to user)
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch task.' });
  }
};

// Create a new task (mood required)
exports.createTask = async (req, res) => {
  try {
    const { title, description, mood, dueDate } = req.body;
    if (!title || !mood) {
      return res.status(400).json({ message: 'Title and mood are required.' });
    }
    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      mood,
      dueDate,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task.' });
  }
};

// Update a task (must belong to user)
exports.updateTask = async (req, res) => {
  try {
    const { title, description, mood, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, description, mood, dueDate },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update task.' });
  }
};

// Delete a task (must belong to user)
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete task.' });
  }
};

// Toggle complete/incomplete
exports.toggleComplete = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Failed to toggle completion.' });
  }
}; 