import { FaTachometerAlt, FaChartBar, FaCog } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Efficiency Tracker</h2>
      <nav className="space-y-4">
        <a href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FaTachometerAlt /> Dashboard
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FaChartBar /> Reports
        </a>
        <a href="#" className="flex items-center gap-2 hover:text-gray-300">
          <FaCog /> Settings
        </a>
      </nav>
    </aside>
  );
}
