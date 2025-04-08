import Image from "next/image"
import { useState } from "react"

interface ChannelHeaderProps {
  name: string;
  description: string;
  subscriberCount: number;
  changePercentage: string;
  changeTime: string;
}

export default function ChannelHeader({
  name,
  description,
  subscriberCount,
  changePercentage,
  changeTime
}: ChannelHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <div className="flex items-start gap-3 md:gap-4">
      <div className="relative">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden bg-white">
          <Image
            src="/image.jpg?height=64&width=64"
            alt={name}
            width={64}
            height={64}
            className="rounded-full"
          />
        </div>
        <button
          className="absolute -top-1 -left-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full border border-gray-200 flex items-center justify-center"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#FFD700" : "none"}
            stroke={isFavorite ? "#FFD700" : "#888"}
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h1 className="text-black text-xl font-semibold">{name}</h1>
          <span className="text-gray-500 text-sm">{description}</span>
        </div>

        <div className="mt-1">
          <h2 className="text-3xl font-bold text-black">
            {subscriberCount.toLocaleString()}<span className="text-sm">명</span>
            <span className="text-sm font-normal ml-2 text-green-500 ">{changeTime} {changePercentage}</span>
          </h2>
        </div>
      </div>
    </div>
  );
}