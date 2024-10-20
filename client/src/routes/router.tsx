import { createBrowserRouter } from "react-router-dom";
import About from "../pages/About";
import AuthLayout from "../pages/AuthLayout";
import Career from "../pages/Career";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import PrivateRoutes from "../pages/PrivateRoutes";
import Products from "../pages/Products";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";

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
      {
        path: "/products/:id",
        element: <ProductDetails />,
        loader: async ({ params }) => {
          const response = await fetch(
            `https://express-server-xi-one.vercel.app/api/products/${params.id}`
          );
          return await response.json(); // Ensure valid JSON
        },
      },
    ],
  },
]);

export default router;
