import { FaTrash } from 'react-icons/fa';
import { MdModeEdit } from "react-icons/md";

export function UserTable({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm">{user.id}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{user.username}</td>
              <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">{`${user.name} ${user.lastname}`}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="p-1.5 md:p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                    title="Editar"
                  >
                    <MdModeEdit size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="p-1.5 md:p-2 bg-red-600 text-white rounded hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                    title="Eliminar"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}