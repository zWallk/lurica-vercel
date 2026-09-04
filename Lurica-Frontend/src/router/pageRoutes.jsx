// Pagina de no encontrado (404)
import NotFoundPage from "../Pages/NotFound.jsx";

// Importando paginas de lurica
import HomePage from "../Pages/Home/index.jsx";
import ProductsPage from "../Pages/Products/index.jsx";


// Rutas de las paginas
export default function PageRoutes(){
    return [
        {
            path: "*",
            element: <NotFoundPage />
        },
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/products",
            element: <ProductsPage />
        }
    ]
}