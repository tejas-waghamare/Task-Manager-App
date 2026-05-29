// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getManagerStats } from '../services/dashboardService';
// import Navbar from '../components/common/Navbar';
// import CreateTask from '../components/manager/CreateTask';
// import TaskList from '../components/manager/TaskList';
// import EmployeeReports from '../components/manager/EmployeeReports';

// const ManagerDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalEmployees: 0,
//     totalTasks: 0,
//     pendingTasks: 0,
//     inProgressTasks: 0,
//     completedTasks: 0,
//     todayReports: 0,
//   });
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await getManagerStats();
//       if (response.success) {
//         setStats(response.data);
//       }
//     } catch (error) {
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const StatCard = ({ title, value, color, icon }) => (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-gray-500 text-sm">{title}</p>
//           <p className="text-2xl font-bold mt-1">{value}</p>
//         </div>
//         <div className={`text-${color}-500 text-3xl`}>
//           <i className={icon}></i>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
//           <p className="text-gray-600">Welcome back, {user?.name}!</p>
//         </div>

//         {/* Tab Navigation */}
//         <div className="border-b border-gray-200 mb-6">
//           <nav className="flex space-x-8">
//             <button
//               onClick={() => setActiveTab('overview')}
//               className={`py-2 px-3 ${
//                 activeTab === 'overview'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               Overview
//             </button>
//             <button
//               onClick={() => setActiveTab('create-task')}
//               className={`py-2 px-3 ${
//                 activeTab === 'create-task'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               Create Task
//             </button>
//             <button
//               onClick={() => setActiveTab('tasks')}
//               className={`py-2 px-3 ${
//                 activeTab === 'tasks'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               All Tasks
//             </button>
//             <button
//               onClick={() => setActiveTab('reports')}
//               className={`py-2 px-3 ${
//                 activeTab === 'reports'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               Employee Reports
//             </button>
//           </nav>
//         </div>

//         {activeTab === 'overview' && (
//           <>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               <StatCard title="Total Employees" value={stats.totalEmployees} color="purple" icon="fas fa-users" />
//               <StatCard title="Total Tasks" value={stats.totalTasks} color="blue" icon="fas fa-tasks" />
//               <StatCard title="Pending Tasks" value={stats.pendingTasks} color="yellow" icon="fas fa-clock" />
//               <StatCard title="In Progress" value={stats.inProgressTasks} color="orange" icon="fas fa-spinner" />
//               <StatCard title="Completed Tasks" value={stats.completedTasks} color="green" icon="fas fa-check-circle" />
//               <StatCard title="Today's Reports" value={stats.todayReports} color="indigo" icon="fas fa-file-alt" />
//             </div>

//             {/* Quick Actions */}
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => setActiveTab('create-task')}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Assign New Task
//                 </button>
//                 <button
//                   onClick={() => setActiveTab('reports')}
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 >
//                   View Reports
//                 </button>
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === 'create-task' && <CreateTask />}
//         {activeTab === 'tasks' && <TaskList />}
//         {activeTab === 'reports' && <EmployeeReports />}
//       </div>
//     </div>
//   );
// };

// export default ManagerDashboard;

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await getManagerStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon, trend, trendValue }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-transparent">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium tracking-wide">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'} bg-${trend === 'up' ? 'green' : 'red'}-50 px-2 py-0.5 rounded-full`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}%
              </span>
              <span className="text-xs text-gray-400 ml-2">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-${color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <i className={`${icon} text-2xl text-${color}-500`}></i>
        </div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`group flex items-center space-x-2 py-2.5 px-4 rounded-xl transition-all duration-200 ${
        activeTab === id
          ? 'bg-blue-50 text-blue-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      } font-medium`}
    >
      <i className={`${icon} text-lg ${activeTab === id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`}></i>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Manager Dashboard
              </h1>
              <p className="text-gray-500 mt-1 flex items-center">
                <i className="fas fa-calendar-alt text-gray-400 mr-2 text-sm"></i>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <i className="fas fa-user text-white text-sm"></i>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Welcome back,</p>
                    <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation - Modern Design */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-8">
          <div className="flex flex-wrap gap-1">
            <TabButton id="overview" label="Overview" icon="fas fa-chart-pie" />
            <TabButton id="create-task" label="Create Task" icon="fas fa-plus-circle" />
            <TabButton id="tasks" label="All Tasks" icon="fas fa-list-check" />
            <TabButton id="reports" label="Employee Reports" icon="fas fa-file-alt" />
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="animate-fadeIn">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <StatCard 
                  title="Total Employees" 
                  value={isLoading ? "..." : stats.totalEmployees} 
                  color="purple" 
                  icon="fas fa-users"
                  trend="up"
                  trendValue="12"
                />
                <StatCard 
                  title="Total Tasks" 
                  value={isLoading ? "..." : stats.totalTasks} 
                  color="blue" 
                  icon="fas fa-tasks"
                  trend="up"
                  trendValue="8"
                />
                <StatCard 
                  title="Pending Tasks" 
                  value={isLoading ? "..." : stats.pendingTasks} 
                  color="yellow" 
                  icon="fas fa-clock"
                  trend="down"
                  trendValue="5"
                />
                <StatCard 
                  title="In Progress" 
                  value={isLoading ? "..." : stats.inProgressTasks} 
                  color="orange" 
                  icon="fas fa-spinner"
                  trend="up"
                  trendValue="3"
                />
                <StatCard 
                  title="Completed Tasks" 
                  value={isLoading ? "..." : stats.completedTasks} 
                  color="green" 
                  icon="fas fa-check-circle"
                  trend="up"
                  trendValue="15"
                />
                <StatCard 
                  title="Today's Reports" 
                  value={isLoading ? "..." : stats.todayReports} 
                  color="indigo" 
                  icon="fas fa-file-alt"
                />
              </div>

              {/* Quick Actions and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
                    <i className="fas fa-bolt text-yellow-500"></i>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setActiveTab('create-task')}
                      className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className="relative z-10 flex items-center justify-center space-x-2">
                        <i className="fas fa-plus-circle"></i>
                        <span className="font-medium">Assign Task</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                    <button
                      onClick={() => setActiveTab('reports')}
                      className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                      <div className="relative z-10 flex items-center justify-center space-x-2">
                        <i className="fas fa-chart-line"></i>
                        <span className="font-medium">View Reports</span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Recent Activity Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Activity Summary</h3>
                    <i className="fas fa-chart-simple text-gray-400"></i>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                          <i className="fas fa-check-circle text-green-600 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {stats.totalTasks ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                          <i className="fas fa-chart-line text-blue-600 text-sm"></i>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Active Tasks</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {stats.inProgressTasks + stats.pendingTasks}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'create-task' && (
            <div className="animate-slideUp">
              <CreateTask />
            </div>
          )}
          {activeTab === 'tasks' && (
            <div className="animate-slideUp">
              <TaskList />
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="animate-slideUp">
              <EmployeeReports />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManagerDashboard;