import { useEffect, useRef } from "react";

interface Channel {
  name: string;
  change: string;
}

interface MarqueeItem {
  category: string;
  channels: Channel[];
  direction: string;
}

interface MarqueeNewsProps {
  items: MarqueeItem[];
}

export default function MarqueeNews({ items }: MarqueeNewsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const marqueeContent = marqueeRef.current;
    const marqueeWidth = marqueeContent.scrollWidth / 3;
    marqueeContent.style.animationDuration = `${marqueeWidth / 60}s`;

    return () => {
      if (marqueeContent) {
        marqueeContent.style.animationDuration = "";
      }
    };
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: marquee linear infinite;
          animation-fill-mode: forwards;
        }
      `}</style>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-100 py-3 overflow-hidden border-t border-gray-200">
        <div className="marquee-container overflow-hidden">
          <div ref={marqueeRef} className="marquee-content">
            {[...Array(3)].map((_, i) => (
              <span key={i} className="inline-block">
                {items.map((item, index) => (
                  <span key={`${i}-${index}`} className="mx-16 text-base">
                    <span
                      className={`font-medium ${
                        item.category === "급상승 채널"
                          ? "text-red-500"
                          : item.category === "급하락 채널"
                            ? "text-blue-500"
                            : "text-gray-900"
                      }`}
                    >
                      {item.category}:
                    </span>
                    {item.channels.map((channel, channelIndex) => (
                      <span key={channelIndex} className="ml-2 font-light">
                        <span className="text-black">{channel.name}</span>
                        {channel.change && (
                          <span className={`ml-1 ${channel.change.startsWith("+") ? "text-red-500" : "text-blue-500"}`}>
                            {channel.change}
                          </span>
                        )}
                        {channelIndex < item.channels.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}