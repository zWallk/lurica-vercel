import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin.js";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { validateLogin } from "../../schemas/loginSchema.js";

import { FaUser, FaLock } from "react-icons/fa"; // FontAwesome

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const { isAuthenticated, verifyAuth } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const isValid = await verifyAuth();
      if (isValid) {
        navigate("/admin");
      }
    };
    verify();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validación primero
      const validation = validateLogin({ username, password });

      if (!validation.success) {
        setError(validation.error.errors[0].message);
        setLoading(false);
        return;
      }

      // Si la validación es exitosa, proceder con el login
      if (validation.success) {
        const success = await login(username, password);

        if (success) {
          await verifyAuth();
          navigate("/admin");
        } else {
          setError("Credenciales inválidas");
        }
      }
    } catch (err) {
      console.error("Error login:", err);
      setError("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out hover:shadow-3xl">
        <div className="text-center">
          <img
            className="mx-auto h-16 w-auto transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            src="/img/lurica-logo.webp"
            alt="Lurica"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-800 transition-colors duration-300 hover:text-indigo-600">
            Bienvenido a Lurica
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Acceda a su panel de administración
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm text-center animate-fade-in">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Usuario"
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  disabled:bg-gray-50 disabled:text-gray-500
                  transition-all duration-200 ease-in-out"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  disabled={loading}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                  disabled:bg-gray-50 disabled:text-gray-500
                  transition-all duration-200 ease-in-out"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5
            text-sm font-semibold text-white
            bg-indigo-600 hover:bg-indigo-700 
            rounded-lg shadow-sm
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 ease-in-out hover:scale-[1.02] rounded"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Iniciar Sesión</span>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 transition-opacity duration-200 hover:text-gray-700">
          <p>
            © {new Date().getFullYear()} Lurica. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
