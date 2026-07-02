import { IoSettingsSharp } from "react-icons/io5";
import SidebarItem from "./SidebarItem";
import { MdSpaceDashboard } from "react-icons/md";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <div className="p-4 h-full flex flex-col justify-between">
      <div>
        <div className="border-b border-gray-300 pb-4 mb-4">
          <h1 className="text-xl font-bold">Dashboard Content</h1>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Navigation</h2>
          <SidebarItem
            title="Dashboard"
            to="/dashboard"
            icon={<MdSpaceDashboard />}
          />
          <SidebarItem
            title="Paramètres"
            to="/dashboard/settings"
            icon={<IoSettingsSharp />}
          />
        </div>
      </div>

      <div>
        <button
          onClick={logout}
          className="w-full p-2 px-4 rounded-xl border border-red-300 text-red-500 hover:bg-red-50 hover:cursor-pointer"
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
