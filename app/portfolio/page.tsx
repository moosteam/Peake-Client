import InvestmentDashboard from "../components/investment-dashboard"
import Sidebar from '../sidebar/sidebar';

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#FFFFFF]">
      <Sidebar />
      <div className="flex-1 pl-[250px] pt-8">
        <div className="bg-white rounded-lg w-[95%] max-w-[1200px] 2xl:max-w-[1600px] min-h-[94vh] mx-auto p-6 mt-[-8]">
          <InvestmentDashboard />
        </div>
      </div>
    </div>
  )
}

