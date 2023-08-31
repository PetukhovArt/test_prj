import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Profile } from "@/features/profile";
import { Team } from "@/features/team";
import { ErrorPage } from "@/common/error-page";
import { Navbar } from "@/components/navbar/navbar.tsx";

export const router = createBrowserRouter([
  {
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Profile />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
