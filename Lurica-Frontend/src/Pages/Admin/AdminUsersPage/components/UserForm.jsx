import { useState } from "react";
import {
  validateRegister,
  validateUpdateUser,
} from "../../../../schemas/registerSchema.js";

export function UserForm({ user, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    password: "",
    email: user?.email || "",
    name: user?.name || "",
    lastname: user?.lastname || "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      let validationResult;
      let dataToValidate = { ...formData };

      if (user) {
        // Si estamos editando y no hay contraseña, la eliminamos antes de validar
        if (!formData.password) {
          delete dataToValidate.password;
        }
        validationResult = validateUpdateUser(dataToValidate);
      } else {
        // Si estamos creando, validación completa
        validationResult = validateRegister(dataToValidate);
      }

      if (!validationResult.success) {
        const formattedErrors = {};
        validationResult.error.errors.forEach((error) => {
          formattedErrors[error.path[0]] = error.message;
        });
        setErrors(formattedErrors);
        return;
      }

      const dataToSend = { ...validationResult.data };
      // Si estamos editando y no hay nueva contraseña, la eliminamos
      if (user && !dataToSend.password) {
        delete dataToSend.password;
      }

      await onSubmit(dataToSend);
    } catch (error) {
      console.error("Error en el formulario:", error);
      setErrors({ form: error.message || "Error al guardar el usuario" });
    }
  };

  const renderError = (field) => {
    return (
      errors[field] && (
        <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {user ? "Editar Usuario" : "Crear Usuario"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.form && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.form}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } px-3 py-2`}
            />
            {renderError("username")}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } px-3 py-2`}
            />
            {renderError("email")}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } px-3 py-2`}
              required={!user} // Solo requerido si es nuevo usuario
            />
            {renderError("password")}
            {user && !errors.password && (
              <p className="mt-1 text-sm text-gray-500">
                Deja este campo vacío si no deseas cambiar la contraseña
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } px-3 py-2`}
            />
            {renderError("name")}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              className={`mt-1 block w-full rounded-md border ${
                errors.lastname ? "border-red-500" : "border-gray-300"
              } px-3 py-2`}
            />
            {renderError("lastname")}
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              {user ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
