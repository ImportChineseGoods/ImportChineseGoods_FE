import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css'
import RegisterScreen from './screens/customer/register.jsx';
import LoginScreen from './screens/customer/login.jsx';

import User from './screens/customer/user.jsx';
import Homepage from './screens/customer/home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Homepage />
      },
      {
        path: 'register',
        element: <RegisterScreen />
      },
      {
        path: 'login',
        element: <LoginScreen />
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
