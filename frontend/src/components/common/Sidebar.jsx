import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user, isManager, logout } = useAuth();

  const menuItems = isManager ? [
    { path: '/dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { path: '/tasks', icon: 'fas fa-tasks', label: 'All Tasks' },
    { path: '/reports', icon: 'fas fa-file-alt', label: 'Employee Reports' },
    { path: '/employees', icon: 'fas fa-users', label: 'Employees' },
  ] : [
    { path: '/dashboard', icon: 'fas fa-chart-line', label: 'Dashboard' },
    { path: '/tasks', icon: 'fas fa-check-circle', label: 'My Tasks' },
    { path: '/reports', icon: 'fas fa-file-alt', label: 'My Reports' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-xl">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <i className="fas fa-tasks text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold">TaskManager</h1>
            <p className="text-xs text-gray-400">Employee Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 mx-2 rounded-lg transition-all duration-200 ${
              isActive(item.path)
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <i className={`${item.icon} w-5 h-5 mr-3`}></i>
            <span>{item.label}</span>
            {isActive(item.path) && (
              <div className="ml-auto w-1 h-8 bg-white rounded-full"></div>
            )}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            <i className="fas fa-user text-gray-300"></i>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition duration-200"
        >
          <i className="fas fa-sign-out-alt mr-2"></i>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;