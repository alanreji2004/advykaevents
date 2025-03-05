import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import Cordinators from './Cordinators/Cordinators';
import Admin from './Admin/Admin';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/cordinators",
    element: <Cordinators />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
)