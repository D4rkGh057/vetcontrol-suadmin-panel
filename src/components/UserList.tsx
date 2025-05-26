import React from 'react';

const UserList: React.FC = () => {
  // Simulación de datos de usuarios
  const users = [
    { id: 1, email: 'admin1@example.com' },
    { id: 2, email: 'admin2@example.com' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Admin Users</h2>
      <ul className="bg-black rounded-lg shadow border divide-y divide-gray-200">
        {users.map((user, idx) => (
          <li
            key={user.id}
            className={`px-4 py-2 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'} text-gray-800`}
          >
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
