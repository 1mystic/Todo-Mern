const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route for health check
app.get('/', (req, res) => {
  res.send({ message: 'Server running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
