import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEmployeeStats } from '../services/dashboardService';
import Navbar from '../components/common/Navbar';
import MyTasks from '../components/employee/MyTasks';
import SubmitReport from '../components/employee/SubmitReport';
import MyReports from '../components/employee/MyReports';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    completedTasks: 0,
    hasSubmittedTodayReport: false,
  });
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await getEmployeeStats();
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
          <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
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
              onClick={() => setActiveTab('tasks')}
              className={`py-2 px-3 ${
                activeTab === 'tasks'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab('submit-report')}
              className={`py-2 px-3 ${
                activeTab === 'submit-report'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              Submit Report
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`py-2 px-3 ${
                activeTab === 'reports'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              } font-medium`}
            >
              My Reports
            </button>
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Tasks" value={stats.totalTasks} color="blue" icon="fas fa-tasks" />
              <StatCard title="Pending" value={stats.pendingTasks} color="yellow" icon="fas fa-clock" />
              <StatCard title="In Progress" value={stats.inProgressTasks} color="orange" icon="fas fa-spinner" />
              <StatCard title="Completed" value={stats.completedTasks} color="green" icon="fas fa-check-circle" />
            </div>

            {/* Today's Report Status */}
            <div className={`rounded-lg shadow-md p-6 ${
              stats.hasSubmittedTodayReport ? 'bg-green-50' : 'bg-yellow-50'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Today's Report Status</h3>
                  <p className="mt-1">
                    {stats.hasSubmittedTodayReport 
                      ? "You have already submitted today's report. Great job!" 
                      : "You haven't submitted today's report yet. Please submit your daily work report."}
                  </p>
                </div>
                {!stats.hasSubmittedTodayReport && (
                  <button
                    onClick={() => setActiveTab('submit-report')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Submit Report
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'tasks' && <MyTasks />}
        {activeTab === 'submit-report' && <SubmitReport onSuccess={fetchStats} />}
        {activeTab === 'reports' && <MyReports />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;