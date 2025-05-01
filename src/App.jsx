import Layout from "./components/Layout";
import { AuthProvider } from "./context/authContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "login",
      Component: Login,
    },

    {
      path: "register",
      Component: Register,
    },

    {
      path: "/",
      Component: Layout,
      children: [
        {
          path: "/",
          Component: Home,
        },
        {
          path: "/profile/",
          Component: Profile,
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
