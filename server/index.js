
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let xp = 0; 
let xpLog = [];


app.get('/xp-log', (req, res) => {
  res.json(xpLog);
});
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/xp', (req, res) => {
  res.json({ xp });
});

app.post('/tasks', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

app.post('/xp-log', (req, res) => {
console.log('Received XP log request:', req.body);
  const { amount, task } = req.body;
  xp += amount;
  xpLog.push({
    id: crypto.randomUUID(),
    title: task?.title || "XP Gain",
    xp: amount,
    date: new Date().toLocaleDateString(),
  });
  res.json({ xp });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  if (tasks.length < initialLength) {
    res.status(200).json({ success: true });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});