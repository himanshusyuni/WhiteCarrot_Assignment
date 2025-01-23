import React from "react";
import DashBoard from "./components/Dashboard";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
