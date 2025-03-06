'use client'
import Sidebar from './sidebar/sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F3F4F6]">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg w-[1200px] min-h-[640px] ml-[250px] mt-[-10]">
        </div>
      </div>
    </div>
  );
}
