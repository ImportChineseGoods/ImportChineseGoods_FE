import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.css'
import RegisterScreen from './screens/register.jsx';
import LoginScreen from './screens/login.jsx';

import Homepage from './screens/home.jsx';
import NotFound from './screens/NotFound.jsx';
import { AuthWrapper } from './components/context/authcontext.jsx';

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
        path: 'auth/register',
        element: <RegisterScreen />
      },
      {
        path: 'auth/login',
        element: <LoginScreen />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>,
)
