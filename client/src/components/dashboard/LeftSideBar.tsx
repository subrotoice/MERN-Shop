import { useState } from "react";
import { IconType } from "react-icons"; // Ensure IconType is imported
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { CiHome } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa6";
import { GrUserAdmin } from "react-icons/gr";
import { TbCategoryPlus } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import IconComponent from "../IconComponent";

interface MenuItem {
  label: string;
  url?: string;
  icon: IconType;
  submenu?: MenuItem[];
}

const LeftSideBar = () => {
  const menuItems: MenuItem[] = [
    { label: "Dashboard", url: "/dashboard/welcome", icon: CiHome },
    {
      label: "Category",
      url: "/dashboard/categories",
      icon: TbCategoryPlus,
    },
    {
      label: "Products",
      submenu: [
        {
          label: "All Products",
          url: "/dashboard/products",
          icon: FaProductHunt,
        },
        {
          label: "Create Products",
          url: "/dashboard/create-product",
          icon: FaProductHunt,
        },
      ],
      icon: FaProductHunt,
    },
    {
      label: "Users",
      submenu: [
        {
          label: "All Users",
          url: "/dashboard/users",
          icon: FaRegUserCircle,
        },
        {
          label: "Create Users",
          url: "#",
          icon: FaRegUserCircle,
        },
      ],
      icon: FaRegUserCircle,
    },
    {
      label: "Role",
      url: "/dashboard/roles",
      icon: GrUserAdmin,
    },
  ];

  const [openSubmenu, setOpenSubmenu] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Toggle submenu based on each menu item's label
  const toggleSubmenu = (menuLabel: string) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

  return (
    <aside className="w-64 bg-base-200 shadow-lg">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <ul className="menu p-4 w-64">
        {menuItems.map((menuItem) => (
          <li key={menuItem.label}>
            {menuItem.submenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(menuItem.label)}
                  className="flex justify-between cursor-pointer w-full"
                >
                  <span className="flex items-center">
                    <IconComponent
                      className="text-xl mr-4"
                      Icon={menuItem.icon}
                    />
                    {menuItem.label}
                  </span>
                  {openSubmenu[menuItem.label] ? (
                    <BiChevronUp className="h-6 w-6" />
                  ) : (
                    <BiChevronDown className="h-6 w-6" />
                  )}
                </button>
                {openSubmenu[menuItem.label] && (
                  <ul className="ml-6 mt-2">
                    {menuItem.submenu.map((submenu) => (
                      <li key={submenu.label}>
                        <NavLink
                          className="flex items-center"
                          to={submenu.url || "/"}
                        >
                          <IconComponent
                            className="text-xl mr-2"
                            Icon={submenu.icon}
                          />
                          {submenu.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <NavLink to={menuItem.url || "/"}>
                <IconComponent className="text-xl mr-2" Icon={menuItem.icon} />
                {menuItem.label}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default LeftSideBar;
