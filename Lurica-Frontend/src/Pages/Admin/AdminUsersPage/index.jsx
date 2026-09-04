import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AdminNavBar } from "../components/admin.NavBar.jsx";
import { SearchBar } from "./components/SearchBar.jsx";
import { UserTable } from "./components/UserTable.jsx";
import { UserForm } from "./components/UserForm.jsx";
import { authService } from "../../../services/auth.service.js";
import { useAuthContext } from '../../../contexts/AuthContext.jsx';

export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const { isAuthenticated, loading } = useAuthContext();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
      return;
    }
  }, [isAuthenticated, loading, navigate]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await authService.getUsersInfo();
      setUsers(response.users);
      setFilteredUsers(response.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await authService.deleteUser(userToDelete);
      fetchUsers();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      console.log("Enviando datos:", formData); // Debug

      if (selectedUser) {
        const response = await authService.updateUser(
          selectedUser.id,
          formData
        );
        console.log("Respuesta update:", response); // Debug
      } else {
        const response = await authService.createUser(formData);
        console.log("Respuesta create:", response); // Debug
      }

      setShowForm(false);
      setSelectedUser(null);
      await fetchUsers(); // Recargar la lista de usuarios
    } catch (error) {
      console.error("Error saving user:", error);
      alert(error.message || "Error al guardar el usuario");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavBar />
      <main className="flex-1 md:ml-[70px] p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Usuarios
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Crear Usuario
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <UserTable
              users={filteredUsers}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {showForm && (
          <UserForm
            user={selectedUser}
            onSubmit={handleSubmit}
            onClose={() => {
              setShowForm(false);
              setSelectedUser(null);
            }}
          />
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Confirmar eliminación
              </h3>
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar este usuario? Esta acción
                no se puede deshacer.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
