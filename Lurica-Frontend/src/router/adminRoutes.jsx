import AdminPage from "../Pages/Admin/index.jsx"
import AdminUsersPage from "../Pages/Admin/AdminUsersPage/index.jsx"
import AdminProductsPage from "../Pages/Admin/AdminProductsPage/index.jsx"

export default function AdminRoutes() {
    return [
        {
            path: "/admin",
            element: <AdminPage />
        },
        {
            path: "/admin/users",
            element: <AdminUsersPage />
        },
        {
            path: "/admin/products",
            element: <AdminProductsPage />
        },
    ]
}