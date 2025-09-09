// import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import ProgressBar from './components/ProgressBar';
import { getLevelFromXP } from './utilities/getLevelFromXP'
import { useXPStore } from './store/useXPStore';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import XPLogList from './components/XPLogList';

function App() {
  const currentXP = useXPStore((state) => state.xp);// This would be fetched or calculated based on current level
  const levelInfo = getLevelFromXP(currentXP);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">XP Tracker</h1>
      <div className="flex justify-between items-start gap-8 w-full">
        {/* Task Form on the left */}
        <div className="flex-1">
          <TaskForm />
        </div>
        {/* Progress Bar in the center */}
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
          <XPLogList />
        </div>
        {/* Task List on the right */}
        <div className="flex-1">
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default App
