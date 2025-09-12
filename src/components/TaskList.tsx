import type { TaskListProps } from "../store/useXPStore";
import type { Task } from "../store/useXPStore";


export default function TaskList({ tasks, onAddXP, onDeleteTask }: TaskListProps) {

  if (!tasks || tasks.length === 0) {
    return <p className="text-gray-500">No tasks logged yet.</p>;
  }

  
  const grouped = groupTasksByCategory(tasks);

  return (
    <>
    <h2 className="text-2xl font-bold mb-4 text-center tracking-wide">Activity List</h2>
    <div className="space-y-6 w-full max-h-[400px] overflow-y-auto">
      {Object.entries(grouped).map(([category, tasks]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </h2>
          <ul className="space-y-1">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="border p-2 rounded-md bg-white shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="text-black text-left font-medium">{task.title}</p>
                  <p className="text-sm text-gray-500 text-left">{task.note}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-bold whitespace-nowrap">{task.xp} XP</span>
                  <button
                    className="bg-green-500 text-white px-2 py-1 whitespace-nowrap rounded hover:bg-green-600 transition"
                    onClick={() => onAddXP(task.xp, task)}
                  >
                    Claim XP
                  </button>
                  <button
                      className="bg-red-500 text-white px-2 py-1 whitespace-nowrap rounded hover:bg-red-600 transition"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this task?")) {
                          onDeleteTask(task.id);
                        }
                      }}
                    >
                      X
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </>
  );
}


function groupTasksByCategory(tasks: Task[]): Record<string, Task[]> 
{
  const groups: Record<string, Task[]> = {};
  tasks.forEach(task => {
    (groups[task.category] ||= []).push(task);
  });
  return groups;
}
