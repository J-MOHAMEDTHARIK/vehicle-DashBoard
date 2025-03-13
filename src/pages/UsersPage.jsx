import React from "react";
import Header from "../components/common/Header";
import BusMap from "../components/BusMap";

const UsersPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900 text-white">
      <Header title="Map" />
      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* Bus Tracking Map */}
        <BusMap />
      </main>
    </div>
  );
};

export default UsersPage;
