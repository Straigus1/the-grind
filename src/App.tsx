// import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from "react";
import ProgressBar from './components/ProgressBar';
import { getLevelFromXP } from './utilities/getLevelFromXP'
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import XPLogList from './components/XPLogList';
import { fetchTasks, addTask, deleteTask } from "./api/tasks";
import { fetchXP, addXP, fetchXPLog } from "./api/xp";
import type { Task } from "./store/useXPStore";

function App() {
  const [currentXP, setCurrentXP] = useState(0);
  const [xpLog, setXPLog] = useState([]);

  useEffect(() => {
  fetchXP().then(data => setCurrentXP(data.xp));
  fetchXPLog().then(setXPLog);
}, []);

  async function handleAddXP(amount: number, task: Task) {
  const data = await addXP(amount, task); 
  setCurrentXP(data.xp);                  
  fetchXPLog().then(setXPLog);           
}
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks().then(setTasks).catch(console.error);
  }, []);

  async function handleAddTask(newTask: Task) {
    const added = await addTask(newTask);
    setTasks(p => [...p, added]);
  }

  async function handleDeleteTask(id: string) {
  await deleteTask(id);
  setTasks(p => p.filter(task => task.id !== id));
}

   const levelInfo = getLevelFromXP(currentXP);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">XP Tracker</h1>
      <div className="flex justify-between items-start gap-8 w-full">
        <div className="flex-1">
          <TaskForm onAddTask={handleAddTask} />
        </div>
        <div className="flex flex-col items-center flex-1">
          <p>XP: {currentXP}</p>
          <p>Level: {levelInfo.currentLevel}</p>
          <p>Title: {levelInfo.currentTitle}</p>
          <p>Next Level XP: {levelInfo.xpNeededForNextLevel ?? "Max Level"}</p>
          <ProgressBar 
            currentXP={currentXP} 
            nextXP={levelInfo.xpNeededForNextLevel} 
            nextXPTotal={levelInfo.xpTotalforNextLevel} 
            prevXPTotal={levelInfo.xpTotalforPreviouslevel} 
          />
          <XPLogList xpLog={xpLog} />
        </div>
        <div className="flex-1">
          <TaskList tasks={tasks} onAddXP={handleAddXP} onDeleteTask={handleDeleteTask} />
        </div>
      </div>
    </div>
  )
}

export default App
