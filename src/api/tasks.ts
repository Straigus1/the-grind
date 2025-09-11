export async function fetchTasks() {
  const res = await fetch('http://localhost:4000/tasks');
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function addTask(task: Record<string, unknown>) {
  const res = await fetch('http://localhost:4000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to add task');
  return res.json();
}