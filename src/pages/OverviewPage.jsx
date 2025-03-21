import { Users, Truck, ParkingSquare, Wallet } from "lucide-react"; // Updated Icons
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";

const OverviewPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Dashboard" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard name="Drivers" icon={Users} value="300" color="#6366F1" />
          <StatCard name="Vehicles" icon={Truck} value="300" color="#8B5CF6" />
          <StatCard
            name="Parked Vehicles"
            icon={ParkingSquare}
            value="20"
            color="#EC4899"
          />
          <StatCard
            name="Expense Rate"
            icon={Wallet}
            value="3.4%"
            color="#10B981"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
