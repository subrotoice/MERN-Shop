import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import LoginOrLogout from "./LoginOrLogout";
import NavLinks from "./NavLinks";
import MernShopLogo from "../assets/MERN_Shop_Logo.png";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="" className="">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src={MernShopLogo}
                  alt=""
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src={MernShopLogo}
                  alt=""
                />
              </a>
            </div>
            <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">
              <NavLinks />
            </ul>
          </div>
          <div className="flex items-center lg:space-x-2">
            <DarkModeToggle />
            
            <LoginOrLogout />

            <button
              type="button"
              onClick={() => {
                setOpenMobileMenu(!isOpenMobileMenu);
              }}
              data-collapse-toggle="ecommerce-navbar-menu-1"
              aria-controls="ecommerce-navbar-menu-1"
              aria-expanded="false"
              className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md dark:hover:bg-gray-700 p-2 text-gray-900 dark:text-white"
            >
              <span className="sr-only">Open Menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>
        </div>
        {isOpenMobileMenu && (
          <div
            id="ecommerce-navbar-menu-1"
            className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border border-gray-200 rounded-lg py-3 px-4 mt-4"
          >
            <ul className="text-gray-900 text-sm font-medium dark:text-white space-y-3">
              <NavLinks />
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
