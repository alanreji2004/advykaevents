import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import Cordinators from './Cordinators/Cordinators';
import Admin from './Admin/Admin';
import ProtectedRoute from "./ProtectedRoute";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import Home from './Home/Home';
import OrganizerLogin from './OrganizerLogin/OrganizerLogin';


const router = createBrowserRouter([
  {
    path: "/addevents",
    element: (
      <ProtectedRoute>
        <Cordinators />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/organizerlogin",
    element: <OrganizerLogin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)