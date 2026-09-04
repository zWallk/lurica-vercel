import LoginPage from "../Pages/Login/index.jsx"

// Rutas de las paginas de autenticacion
export default function AuthRoutes(){
    return [
        {
            path: "/login",
            element: <LoginPage />
        },
    ]
}