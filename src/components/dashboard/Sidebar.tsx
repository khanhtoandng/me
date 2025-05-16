// components/common/Sidebar.tsx
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-6">
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard Overview
          </Link>
        </li>
        <li>
          <Link href="/dashboard/users" className="hover:text-gray-300">
            Users
          </Link>
        </li>
        <li>
          <Link href="/dashboard/settings" className="hover:text-gray-300">
            Settings
          </Link>
        </li>
        {/* Add more links as necessary */}
      </ul>
    </div>
  );
};

export default Sidebar;
