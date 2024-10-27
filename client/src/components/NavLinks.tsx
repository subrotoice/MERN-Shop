import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export interface MenuItem {
  label: string;
  url: string;
}

const NavLinks = () => {
  const { user } = useAuth();
  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: "Gift Ideas", url: "/#" },
    { label: "Today's Deals", url: "/#" },
    { label: "Sell", url: "/#" },
  ];
  return (
    <>
      {menuItems.map((menuItem) => (
        <li key={menuItem.url} className="shrink-0">
          <NavLink
            className="hover:text-primary-700 dark:hover:text-primary-500"
            to={menuItem.url}
          >
            {menuItem.label}
          </NavLink>
        </li>
      ))}
      {user && (
        <li className="shrink-0">
          <NavLink
            className="hover:text-primary-700 dark:hover:text-primary-500"
            to="/dashboard/welcome"
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );
};

export default NavLinks;
