import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import AuthLayout from "../pages/AuthLayout";
import Career from "../pages/Career";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "../pages/PrivateRoutes";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";
import Register from "../pages/Register";
import AdminCategories from "../pages/dashboard/AdminCategories";
import AdminPage from "../pages/dashboard/AdminPage";
import AdminProducts from "../pages/dashboard/AdminProducts";
import DashboardWelcome from "../pages/dashboard/DashboardWelcome";
import Roles from "../pages/dashboard/Roles";
import Users from "../pages/dashboard/Users";
import AdminOrders from "../pages/dashboard/AdminOrders";

const router = createBrowserRouter([
  { path: "/", errorElement: <NotFound />, element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/career", element: <Career /> },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    element: <PrivateRoutes />,
    children: [
      { path: "/products", element: <Products /> },
      { path: "/categories/:id", element: <Products /> },
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `http://localhost:5000/api/products/${params.id}`
          );
          return await response.json(); // Ensure valid JSON
        },
      },
    ],
  },

  {
    path: "/dashboard",
    element: <AdminPage />,
    children: [
      { path: "welcome", element: <DashboardWelcome /> },
      { path: "orders", element: <AdminOrders /> },
      { path: "users", element: <Users /> },
      { path: "products", element: <AdminProducts /> },
      { path: "categories", element: <AdminCategories /> },
      { path: "roles", element: <Roles /> },
    ],
  },
]);

export default router;
