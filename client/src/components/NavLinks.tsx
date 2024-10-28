import { NavLink } from "react-router-dom";

export interface MenuItem {
  label: string;
  url: string;
}

const NavLinks = () => {
   
  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: "Gift Ideas", url: "/#" },
    { label: "Today's Deals", url: "/#" }
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
      
    </>
  );
};

export default NavLinks;
