import Layout from "./components/Layout";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PrivateRoutes } from "./components/PrivateRoutes";
import { PublicRoutes } from "./components/PublicRoutes";

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicRoutes />,
      children: [
        {
          path: "login",
          Component: Login,
        },
        {
          path: "register",
          Component: Register,
        },
      ],
    },
    {
      path: "/",
      element: <PrivateRoutes />,
      children: [
        {
          path: "/",
          Component: Layout,
          children: [
            {
              index: true,
              Component: Home,
            },
            {
              path: "profile",
              Component: Profile,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      Component: NotFound,
    },
  ]);

  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
