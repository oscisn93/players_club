import { Provider } from "@/components/ui/provider.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import Layout from "./layouts/root";
// import AuthLayout from "./layouts/auth";

// routes
import Landing from "@/routes/landing";
import NotFound from "@/404";
import Rules from "@/routes/rules";
import Contact from "@/routes/contact";
import Games from "@/routes/games/root"
import { authProvider } from "./lib/api/auth";
import Login, { loginAction, loginLoader } from "./routes/auth/login";
import Register from "./routes/auth/register";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: authProvider.userId };
    },
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "rules",
        element: <Rules />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "games",
        element: <Games />
      },
      {
        path: "games/:id",
        element: <Games />
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            action: loginAction,
            loader: loginLoader,
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
