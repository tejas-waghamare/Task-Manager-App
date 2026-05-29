import React, { useState, useEffect } from 'react';
import { getManagerStats } from '../../services/dashboardService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await getManagerStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Employees',
      value: stats?.totalEmployees || 0,
      icon: 'fas fa-users',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-600',
    },
    {
      title: 'Total Tasks',
      value: stats?.totalTasks || 0,
      icon: 'fas fa-tasks',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Pending Tasks',
      value: stats?.pendingTasks || 0,
      icon: 'fas fa-clock',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-600',
    },
    {
      title: 'In Progress',
      value: stats?.inProgressTasks || 0,
      icon: 'fas fa-spinner',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-600',
    },
    {
      title: 'Completed Tasks',
      value: stats?.completedTasks || 0,
      icon: 'fas fa-check-circle',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
    },
    {
      title: "Today's Reports",
      value: stats?.todayReports || 0,
      icon: 'fas fa-file-alt',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
  ];

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStats} />;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-full`}>
                  <i className={`${card.icon} ${card.textColor} text-2xl`}></i>
                </div>
              </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition">
            <i className="fas fa-plus"></i>
            <span>Create New Task</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition">
            <i className="fas fa-user-plus"></i>
            <span>Add Employee</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition">
            <i className="fas fa-chart-bar"></i>
            <span>View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;