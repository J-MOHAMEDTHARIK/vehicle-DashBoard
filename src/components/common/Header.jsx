import { Bell } from "lucide-react";

const Header = ({ title }) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>

        {/* Notification Icon */}
        <button className="relative p-2 rounded-full hover:bg-gray-700 transition">
          <Bell size={24} className="text-gray-300" />
          {/* Notification Dot (Can be removed if not needed) */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
