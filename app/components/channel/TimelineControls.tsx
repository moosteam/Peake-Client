import { Camera, Maximize2, Info } from "lucide-react"

interface TimelineControlsProps {
  minuteOptions: string[];
  periodOptions: string[];
  selectedTimeOption: string;
  onTimeSelection: (option: string) => void;
}

export default function TimelineControls({
  minuteOptions,
  periodOptions,
  selectedTimeOption,
  onTimeSelection
}: TimelineControlsProps) {
  return (
    <div className="flex items-center mt-4 gap-2 overflow-x-auto pb-2">
      {minuteOptions.map((option) => (
        <button
          key={option}
          className={`px-3 py-1.5 text-sm ${
            selectedTimeOption === option
              ? "text-black font-medium border-b-2 border-black"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => onTimeSelection(option)}
        >
          {option}
        </button>
      ))}

      <div className="h-4 border-l border-gray-300 mx-1"></div>

      {periodOptions.map((option) => (
        <button
          key={option}
          className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
          onClick={() => onTimeSelection(option)}
        >
          {option === "AI 차트 형식" && <Info className="w-4 h-4" />}
          {option}
        </button>
      ))}

      <div className="ml-auto flex gap-2">
        <button className="text-gray-500 hover:text-gray-700">
          <Camera className="w-5 h-5" />
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Maximize2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}