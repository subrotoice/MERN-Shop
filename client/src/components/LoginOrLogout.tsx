import toast from "react-hot-toast";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginOrLogout = () => {
  const { user, logout } = useAuth(); // Access the user and login function

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
    <div>
      <div className="myAccount">
        {!user ? (
          <Link to="/login">
            <button className="btn btn-outline btn-sm btn-accent">Login</button>
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
              
                <li className="shrink-0">
                  <NavLink
                    className="hover:text-primary-700 dark:hover:text-primary-500"
                    to="dashboard/welcome"
                  >
                    Dashboard
                  </NavLink>
                </li> 
              
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
    </div>
  );
};

export default LoginOrLogout;
