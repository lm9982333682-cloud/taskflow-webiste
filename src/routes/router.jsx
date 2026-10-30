
import { createBrowserRouter } from "react-router";

import KanbanBoard from "../pages/KanbanBoard";
import AllTasks from "../pages/AllTasks";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";
import MainLayout from '../layout/MainLayout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <KanbanBoard />,
      }, {
        path: "/tasks",
        element: <AllTasks />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
