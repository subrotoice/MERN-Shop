import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const { user, logout } = useAuth(); // Access the user and login function
  const [isOpen, setOpen] = useState(false);
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

  const handelLogout = async () => {
    try {
      await logout(); // Handle Firebase login
      toast.success("User logged out");
      // navigate("/"); // Redirect to homepage after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-8">
            <div className="shrink-0">
              <a href="#" title="" className="">
                <img
                  className="block w-auto h-8 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full.svg"
                  alt=""
                />
                <img
                  className="hidden w-auto h-8 dark:block"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/logo-full-dark.svg"
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
            <div className="myCart relative inline-block text-left">
              <button
                id="myCartDropdownButton1"
                data-dropdown-toggle="myCartDropdown1"
                type="button"
                onClick={() => setOpen(!isOpen)}
                className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium leading-none text-gray-900 dark:text-white"
              >
                <span className="sr-only">Cart</span>
                <svg
                  className="w-5 h-5 lg:me-1"
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
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                  />
                </svg>
                <span className="hidden sm:flex">My Cart</span>
                <svg
                  className=" sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1"
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
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </button>
              {isOpen && (
                <div
                  id="myCartDropdown1"
                  className="absolute right-0 mt-2 w-56 shadow-lg ring-1 ring-black ring-opacity-5 group-hover:block z-10 mx-auto max-w-sm space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased  dark:bg-gray-800"
                >
                  <div className="grid grid-cols-2">
                    <div>
                      <a
                        href="#"
                        className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                      >
                        Apple iPhone 15
                      </a>
                      <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                        $599
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                      <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                        Qty: 1
                      </p>
                      <button
                        data-tooltip-target="tooltipRemoveItem1a"
                        type="button"
                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                      >
                        <span className="sr-only"> Remove </span>
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="tooltipRemoveItem1a"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Remove item
                        <div className="tooltip-arrow" data-popper-arrow="" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2">
                    <div>
                      <a
                        href="#"
                        className="truncate text-sm font-semibold leading-none text-gray-900 dark:text-white hover:underline"
                      >
                        Apple iMac 20"
                      </a>
                      <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">
                        $8,997
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-6">
                      <p className="text-sm font-normal leading-none text-gray-500 dark:text-gray-400">
                        Qty: 3
                      </p>
                      <button
                        data-tooltip-target="tooltipRemoveItem5b"
                        type="button"
                        className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600"
                      >
                        <span className="sr-only"> Remove </span>
                        <svg
                          className="h-4 w-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <div
                        id="tooltipRemoveItem5b"
                        role="tooltip"
                        className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
                      >
                        Remove item
                        <div className="tooltip-arrow" data-popper-arrow="" />
                      </div>
                    </div>
                  </div>
                  <a
                    href="#"
                    title=""
                    className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    role="button"
                  >
                    {" "}
                    Proceed to Checkout{" "}
                  </a>
                </div>
              )}
            </div>
            <div className="myAccount">
              {!user ? (
                <Link to="/login">
                  <button className="btn btn-outline btn-sm btn-accent">
                    Login
                  </button>
                </Link>
              ) : (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        }
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-1 w-52 p-2 shadow"
                  >
                    <li className="p-2 font-bold">{user.displayName}</li>
                    <li>
                      <button
                        onClick={handelLogout}
                        className="btn btn-outline btn-sm btn-accent ml-2"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

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
