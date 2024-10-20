import { NavLink } from "react-router-dom";

export interface MenuItem {
  label: string;
  url: string;
}

const NavLinks = () => {
  const menuItems: MenuItem[] = [
    { label: "Home", url: "/" },
    { label: "Products", url: "/products" },
    { label: "About", url: "/about" },
  ];
  return (
    <>
      <ul className="menu menu-horizontal px-1">
        {menuItems.map((menuItem) => (
          <li key={menuItem.url}>
            <NavLink to={menuItem.url}>{menuItem.label}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavLinks;
