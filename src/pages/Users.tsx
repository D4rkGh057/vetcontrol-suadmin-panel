import React, { useEffect } from 'react';
import Modal from '../components/Modal';
import UserForm from '../components/UserForm';
import { getUsers } from '../services/userService';
import { getCompanies } from '../services/companyService';
import { useAppStore } from '../store';
import type { User } from '../services/userService';

const Users: React.FC = () => {
  const userList = useAppStore((state) => state.users);
  const setUserList = useAppStore((state) => state.setUsers);
  const companies = useAppStore((state) => state.companies);
  const setCompanies = useAppStore((state) => state.setCompanies);
  const loading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState<User | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getCompanies()
    ])
      .then(([users, companies]) => {
        setUserList(users);
        setCompanies(companies);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  }, []);

  const reloadData = () => {
    setLoading(true);
    Promise.all([
      getUsers(),
      getCompanies()
    ])
      .then(([users, companies]) => {
        setUserList(users);
        setCompanies(companies);
      })
      .catch((err) => console.error(err.message))
      .finally(() => setLoading(false));
  };

  const handleEdit = (user: User) => {
    setEditUser(user);
    setModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const currentUsers = useAppStore.getState().users;
    setUserList(currentUsers.filter((u) => u.id_usuario !== id));
  };

  // Helper para obtener el nombre de la empresa
  const getEmpresaNombre = (id_empresa: string) => {
    const empresa = companies.find((c) => c.id_empresa === id_empresa);
    return empresa ? empresa.nombre : '';
  };

  return (
    <div className="p-4">
      <div className="bg-[#14294b] w-full rounded-lg mb-8 flex items-center px-8 py-4 shadow-md">
        <h1 className="text-3xl font-bold text-white tracking-wide">Usuarios</h1>
      </div>
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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Empresa</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={`skeleton-user-skeleton-${idx}-users`}>
                  <td><div className="skeleton h-4 w-32"></div></td>
                  <td><div className="skeleton h-4 w-32"></div></td>
                  <td><div className="skeleton h-4 w-40"></div></td>
                  <td><div className="skeleton h-4 w-24"></div></td>
                  <td><div className="skeleton h-4 w-32"></div></td>
                  <td><div className="skeleton h-4 w-24"></div></td>
                </tr>
              ))
            ) : (
              userList.map((user) => (
                <tr key={user.id_usuario || user.email}>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.email}</td>
                  <td>{user.rol}</td>
                  <td>{getEmpresaNombre(user.id_empresa)}</td>
                  <td className="flex justify-end gap-2">
                    <button className="btn btn-xs btn-primary text-white bg-blue-700" onClick={() => handleEdit(user)}>Editar</button>
                    <button
                      className="btn btn-xs btn-error bg-red-700 text-white"
                      onClick={() => {
                        if (user.id_usuario) handleDelete(user.id_usuario);
                      }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={() => { setModalOpen(false); setEditUser(null); }}>
        <h2 className="text-xl font-bold mb-4 text-black">{editUser ? 'Editar Usuario Admin' : 'Crear Usuario Admin'}</h2>
        <UserForm user={editUser} companies={companies} onSuccess={() => {
          reloadData();
          setModalOpen(false);
          setEditUser(null);
        }} />
      </Modal>
    </div>
  );
};

export default Users;
