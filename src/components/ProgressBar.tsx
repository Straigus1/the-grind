
type ProgressBarProps = {
  currentXP: number;
  nextXP: number | null;
  nextXPTotal?: number | null;
  prevXPTotal?: number | null;
};


export default function ProgressBar({ currentXP, nextXP, nextXPTotal, prevXPTotal }: ProgressBarProps) {
  if (nextXP === null) {
    return (
      <div className="w-full bg-gray-200 rounded-full h-4">
        <div className="bg-green-500 h-4 rounded-full w-full text-xs text-white text-center">
          Max Level
        </div>
      </div>
    );
  }

const progress = nextXPTotal ? (currentXP / nextXPTotal) * 100 : 0;
  console.log(`Progress: ${progress}% (Current XP: ${currentXP}, Previous XP: ${prevXPTotal}, Next XP: ${nextXP})`);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-4 text-xs text-white text-center transition-all duration-300 ease-in-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        {Math.floor(progress)}%
      </div>
    </div>
  );
}