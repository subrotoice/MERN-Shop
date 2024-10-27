import { useState } from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiCog,
  BiHome,
  BiUser,
} from "react-icons/bi";

type SubmenuKey = "settings" | "users";

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<Record<SubmenuKey, boolean>>({
    settings: false,
    users: false,
  });

  const toggleSubmenu = (menu: SubmenuKey) => {
    setOpenSubmenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <div className="w-64 bg-base-200 h-screen shadow-lg p-4">
      <div className="text-xl font-bold mb-4">Admin Dashboard</div>
      <ul className="menu">
        {/* Dashboard Link */}
        <li>
          <a href="/dashboard" className="flex items-center">
            <BiHome className="text-xl mr-2" /> Dashboard
          </a>
        </li>

        {/* Users Menu */}
        <li>
          <button
            onClick={() => toggleSubmenu("users")}
            className="flex justify-between cursor-pointer w-full text-left"
          >
            <span className="flex items-center">
              <BiUser className="text-xl mr-2" /> Users
            </span>
            {openSubmenu.users ? <BiChevronUp /> : <BiChevronDown />}
          </button>
          {openSubmenu.users && (
            <ul className="ml-6 mt-2">
              <li>
                <a href="/users/list" className="flex items-center">
                  - User List
                </a>
              </li>
              <li>
                <a href="/users/add" className="flex items-center">
                  - Add User
                </a>
              </li>
            </ul>
          )}
        </li>

        {/* Settings Menu */}
        <li>
          <button
            onClick={() => toggleSubmenu("settings")}
            className="flex justify-between cursor-pointer w-full text-left"
          >
            <span className="flex items-center">
              <BiCog className="text-xl mr-2" /> Settings
            </span>
            {openSubmenu.settings ? <BiChevronUp /> : <BiChevronDown />}
          </button>
          {openSubmenu.settings && (
            <ul className="ml-6 mt-2">
              <li>
                <a href="/settings/profile" className="flex items-center">
                  - Profile Settings
                </a>
              </li>
              <li>
                <a href="/settings/security" className="flex items-center">
                  - Security
                </a>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
