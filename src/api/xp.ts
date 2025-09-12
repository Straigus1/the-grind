import type { Task } from "../store/useXPStore";
export async function fetchXP() {
  const res = await fetch('http://localhost:4000/xp');
  if (!res.ok) throw new Error('Failed to fetch XP');
  return res.json();
}

export async function addXP(amount: number, task: Task) {
  const res = await fetch('http://localhost:4000/xp-log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, task }),
  });
  if (!res.ok) throw new Error('Failed to claim XP');
  return res.json();
}

export async function fetchXPLog() {
  const res = await fetch('http://localhost:4000/xp-log');
  if (!res.ok) throw new Error('Failed to fetch XP log');
  return res.json();
}