import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getManagerStats } from '../services/dashboardService';
import Navbar from '../components/common/Navbar';
import CreateTask from '../components/manager/CreateTask';
import TaskList from '../components/manager/TaskList';
import EmployeeReports from '../components/manager/EmployeeReports';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    todayReports: 0,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getManagerStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const StatCard = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`text-${color}-500 text-3xl`}>
          <i className={icon}></i>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-3 ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('create-task')}
              className={`py-2 px-3 ${
                activeTab === 'create-task'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              Create Task
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-2 px-3 ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-3 ${
                activeTab === 'reports'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              Employee Reports
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Employees" value={stats.totalEmployees} color="purple" icon="fas fa-users" />
              <StatCard title="Total Tasks" value={stats.totalTasks} color="blue" icon="fas fa-tasks" />
              <StatCard title="Pending Tasks" value={stats.pendingTasks} color="yellow" icon="fas fa-clock" />
              <StatCard title="In Progress" value={stats.inProgressTasks} color="orange" icon="fas fa-spinner" />
              <StatCard title="Completed Tasks" value={stats.completedTasks} color="green" icon="fas fa-check-circle" />
              <StatCard title="Today's Reports" value={stats.todayReports} color="indigo" icon="fas fa-file-alt" />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('create-task')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Assign New Task
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  View Reports
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'create-task' && <CreateTask />}
        {activeTab === 'tasks' && <TaskList />}
        {activeTab === 'reports' && <EmployeeReports />}
      </div>
    </div>
  );
};

export default ManagerDashboard;