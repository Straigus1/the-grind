import { create } from 'zustand';

export type Task = {
  id: string;
  title: string;
  category: 'Coding' | 'Job Hunting' |'AI Learning' | 'Personal' | string;
  xp: number;
  note?: string;
  date: string;
};

export type XPLogType = {
  id: string;
  title: string;
  xp: number;
  note?: string;
  date: string;
};

type XPStore = {
  xp: number;
  tasks: Task[];
  xpLog: XPLogType[];
  addTask: (task: Task) => void;
  gainXP: (task: Task) => void;
};

export type TaskListProps = {
  tasks?: Task[];
  onAddXP: (amount: number, task: Task) => void;
  onDeleteTask: (id: string) => void
};

export type TaskFormProps = {
    onAddTask: (task: Task) => void;
};

export const useXPStore = create<XPStore>((set) => ({
  xp: 0,
  tasks: [],
  xpLog: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  gainXP: (task) =>
    set((state) => ({
      xp: state.xp + task.xp,
      xpLog: [
        ...state.xpLog,
        {
          id: crypto.randomUUID(),
          title: task.title,
          xp: task.xp,
          date: new Date().toLocaleDateString(),
        },
      ],
    })),
}));