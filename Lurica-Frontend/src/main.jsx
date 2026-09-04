import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';

import './index.css'

// Importar Bootstrap CSS y JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importando las rutas
import PageRoutes from './router/pageRoutes.jsx'
import AuthRoutes from './router/authRoutes.jsx'
import AdminRoutes from './router/adminRoutes.jsx';

const router = createBrowserRouter([
  ...PageRoutes(),
  ...AuthRoutes(),
  ...AdminRoutes(),
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)