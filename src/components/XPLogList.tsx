import { useXPStore } from "../store/useXPStore";

export default function XPLogList() {
  const xpLog = useXPStore((state) => state.xpLog);

  if (xpLog.length === 0) {
    return <p className="text-gray-500">No XP log entries yet.</p>;
  }

  return (
  <div className="mt-8 w-full">
    <h2 className="text-lg font-semibold mb-2">Task Log</h2>
    <ul className="space-y-2 w-full max-h-[420px] overflow-y-auto">
      {[...xpLog].reverse().map((entry) => (
        <li key={entry.id} className="border p-2 rounded bg-gray-50 flex justify-between items-center">
          <div className="flex flex-col items-start">
            <span className="text-black font-medium">{entry.title}</span>
            <span className="text-xs text-gray-400">{entry.date}</span>
          </div>
          <span className="text-blue-600 font-bold">+{entry.xp} XP</span>
        </li>
      ))}
    </ul>
  </div>
);
}