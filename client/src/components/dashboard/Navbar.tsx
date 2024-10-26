import { MdDashboard } from "react-icons/md";
import DarkModeToggle from "../DarkModeToggle";
import { IoIosNotifications } from "react-icons/io";
import LoginOrLogout from "../LoginOrLogout";

const Navbar = () => {
  return (
    <div>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <MdDashboard />
          </label>
          <h1 className="text-2xl font-semibold ml-2">MERN Shop</h1>
        </div>

        <div className="flex-none ">
          {/* Light and dark theme selection toogle **/}
          <DarkModeToggle />

          {/* Notification icon */}
          <button className="btn btn-ghost ml-4  btn-circle">
            <div className="indicator">
              <IoIosNotifications className="h-6 w-6" />
              <span className="indicator-item badge badge-secondary badge-sm">
                3
              </span>
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <LoginOrLogout />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
