'use client';
import Sidebar from '../sidebar/sidebar';
import '../globals.css'; // Make sure to import the global CSS

export default function RankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Sidebar />
      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1600px] min-h-[94vh] mx-auto p-8"> {/* p-6 → p-8 */}
          {children}
        </div>
      </div>
    </div>
  );
}

