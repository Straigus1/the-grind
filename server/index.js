
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = []; // Temporary in-memory storage

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});