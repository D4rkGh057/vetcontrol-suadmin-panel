import React, { useState } from 'react';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';

const Users: React.FC = () => {
  // Simulación de datos de usuarios
  const users = [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    { id: 3, name: 'User 3', email: 'user3@example.com' },
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<null | typeof users[0]>(null);
  const [userList, setUserList] = useState(users);

  const handleEdit = (user: typeof users[0]) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setUserList((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow"
        >
          Añadir Usuario Admin
        </button>
      </div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-white text-black">
        <table className="table">
          <thead className="bg-gray-100 text-black">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="flex justify-end gap-2">
                  <button className="btn btn-xs btn-primary  text-white bg-blue-700" onClick={() => handleEdit(user)}>Editar</button>
                  <button className="btn btn-xs btn-error bg-red-700 text-white" onClick={() => handleDelete(user.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditUser(null); }}>
        <h2 className="text-xl font-bold mb-4 text-black">{editUser ? 'Editar Usuario Admin' : 'Crear Usuario Admin'}</h2>
        <UserForm user={editUser} />
      </Modal>
    </div>
  );
};

export default Users;
