// import React, { useState, useEffect } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { getEmployeeStats } from '../services/dashboardService';
// import Navbar from '../components/common/Navbar';
// import MyTasks from '../components/employee/MyTasks';
// import SubmitReport from '../components/employee/SubmitReport';
// import MyReports from '../components/employee/MyReports';

// const EmployeeDashboard = () => {
//   const { user } = useAuth();
//   const [stats, setStats] = useState({
//     totalTasks: 0,
//     pendingTasks: 0,
//     inProgressTasks: 0,
//     completedTasks: 0,
//     hasSubmittedTodayReport: false,
//   });
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const response = await getEmployeeStats();
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
//           <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
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
//               onClick={() => setActiveTab('tasks')}
//               className={`py-2 px-3 ${
//                 activeTab === 'tasks'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               My Tasks
//             </button>
//             <button
//               onClick={() => setActiveTab('submit-report')}
//               className={`py-2 px-3 ${
//                 activeTab === 'submit-report'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               Submit Report
//             </button>
//             <button
//               onClick={() => setActiveTab('reports')}
//               className={`py-2 px-3 ${
//                 activeTab === 'reports'
//                   ? 'border-b-2 border-blue-500 text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               } font-medium`}
//             >
//               My Reports
//             </button>
//           </nav>
//         </div>

//         {activeTab === 'overview' && (
//           <>
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               <StatCard title="Total Tasks" value={stats.totalTasks} color="blue" icon="fas fa-tasks" />
//               <StatCard title="Pending" value={stats.pendingTasks} color="yellow" icon="fas fa-clock" />
//               <StatCard title="In Progress" value={stats.inProgressTasks} color="orange" icon="fas fa-spinner" />
//               <StatCard title="Completed" value={stats.completedTasks} color="green" icon="fas fa-check-circle" />
//             </div>

//             {/* Today's Report Status */}
//             <div className={`rounded-lg shadow-md p-6 ${
//               stats.hasSubmittedTodayReport ? 'bg-green-50' : 'bg-yellow-50'
//             }`}>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h3 className="font-semibold text-lg">Today's Report Status</h3>
//                   <p className="mt-1">
//                     {stats.hasSubmittedTodayReport 
//                       ? "You have already submitted today's report. Great job!" 
//                       : "You haven't submitted today's report yet. Please submit your daily work report."}
//                   </p>
//                 </div>
//                 {!stats.hasSubmittedTodayReport && (
//                   <button
//                     onClick={() => setActiveTab('submit-report')}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//                   >
//                     Submit Report
//                   </button>
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === 'tasks' && <MyTasks />}
//         {activeTab === 'submit-report' && <SubmitReport onSuccess={fetchStats} />}
//         {activeTab === 'reports' && <MyReports />}
//       </div>
//     </div>
//   );
// };

// export default EmployeeDashboard;

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const response = await getEmployeeStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const StatCard = ({ title, value, color, icon, progress, progressValue }) => (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-transparent">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl bg-${color}-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <i className={`${icon} text-xl text-${color}-500`}></i>
        </div>
        {progress && (
          <div className="text-right">
            <span className="text-xs font-semibold text-gray-500">Progress</span>
            <p className="text-sm font-bold text-gray-700">{progressValue}%</p>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-sm font-medium tracking-wide">{title}</p>
        <p className="text-3xl font-bold mt-1 text-gray-800">{isLoading ? "..." : value}</p>
      </div>
      {progress && (
        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-${color}-500 rounded-full transition-all duration-500`}
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>
      )}
    </div>
  );

  const TabButton = ({ id, label, icon, badge }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`group flex items-center space-x-2 py-2.5 px-4 rounded-xl transition-all duration-200 ${
        activeTab === id
          ? 'bg-indigo-50 text-indigo-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
      } font-medium`}
    >
      <i className={`${icon} text-lg ${activeTab === id ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`}></i>
      <span>{label}</span>
      {badge && badge > 0 && (
        <span className="ml-1 px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
          {badge}
        </span>
      )}
    </button>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-2xl">
                  {getGreeting() === "Good Morning" ? "🌅" : getGreeting() === "Good Afternoon" ? "☀️" : "🌙"}
                </span>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {getGreeting()}
                </h1>
              </div>
              <p className="text-gray-500 mt-1 flex items-center">
                <i className="fas fa-calendar-alt text-gray-400 mr-2 text-sm"></i>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <i className="fas fa-user text-white text-sm"></i>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employee</p>
                    <p className="text-sm font-bold text-gray-800">{user?.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 mb-8">
          <div className="flex flex-wrap gap-1">
            <TabButton id="overview" label="Overview" icon="fas fa-chart-pie" />
            <TabButton 
              id="tasks" 
              label="My Tasks" 
              icon="fas fa-tasks" 
              badge={stats.pendingTasks + stats.inProgressTasks}
            />
            <TabButton id="submit-report" label="Submit Report" icon="fas fa-pen-alt" />
            <TabButton id="reports" label="My Reports" icon="fas fa-history" />
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="animate-fadeIn">
          {activeTab === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard 
                  title="Total Tasks" 
                  value={stats.totalTasks} 
                  color="blue" 
                  icon="fas fa-tasks"
                  progress={true}
                  progressValue={completionRate}
                />
                <StatCard 
                  title="Pending" 
                  value={stats.pendingTasks} 
                  color="yellow" 
                  icon="fas fa-clock"
                />
                <StatCard 
                  title="In Progress" 
                  value={stats.inProgressTasks} 
                  color="orange" 
                  icon="fas fa-spinner"
                />
                <StatCard 
                  title="Completed" 
                  value={stats.completedTasks} 
                  color="green" 
                  icon="fas fa-check-circle"
                />
              </div>

              {/* Performance Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Today's Report Status */}
                <div className={`rounded-2xl shadow-sm border p-6 transition-all duration-300 ${
                  stats.hasSubmittedTodayReport 
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100' 
                    : 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-100'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <i className={`fas fa-clipboard-list text-lg ${stats.hasSubmittedTodayReport ? 'text-green-600' : 'text-yellow-600'}`}></i>
                        <h3 className="font-bold text-lg text-gray-800">Today's Report</h3>
                      </div>
                      <p className="text-gray-700 mt-1">
                        {stats.hasSubmittedTodayReport 
                          ? "✅ You've submitted today's report. Great job keeping track!" 
                          : "📝 You haven't submitted today's report yet. Share your daily work progress."}
                      </p>
                    </div>
                    {!stats.hasSubmittedTodayReport && (
                      <button
                        onClick={() => setActiveTab('submit-report')}
                        className="ml-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 font-medium whitespace-nowrap"
                      >
                        <i className="fas fa-paper-plane mr-2"></i>
                        Submit Now
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Stats Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-800">Quick Overview</h3>
                    <i className="fas fa-chart-simple text-gray-400"></i>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Overall Progress</span>
                        <span className="font-semibold text-indigo-600">{completionRate}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-2">
                      <div className="text-center p-2 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500">Pending</p>
                        <p className="text-xl font-bold text-yellow-600">{stats.pendingTasks}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500">In Progress</p>
                        <p className="text-xl font-bold text-orange-600">{stats.inProgressTasks}</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-xl">
                        <p className="text-xs text-gray-500">Completed</p>
                        <p className="text-xl font-bold text-green-600">{stats.completedTasks}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivational Quote */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <i className="fas fa-quote-left text-3xl opacity-50 mb-2 block"></i>
                    <p className="text-lg font-medium leading-relaxed">
                      {stats.completedTasks === stats.totalTasks && stats.totalTasks > 0
                        ? "🎉 Amazing! You've completed all your tasks. Keep up the great work!"
                        : stats.inProgressTasks > 0
                        ? "💪 You're making great progress! Stay focused and keep pushing forward."
                        : "✨ Every task you complete brings you one step closer to your goals. Stay motivated!"}
                    </p>
                  </div>
                  <i className="fas fa-medal text-5xl opacity-30 hidden sm:block"></i>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tasks' && (
            <div className="animate-slideUp">
              <MyTasks />
            </div>
          )}
          {activeTab === 'submit-report' && (
            <div className="animate-slideUp">
              <SubmitReport onSuccess={fetchStats} />
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="animate-slideUp">
              <MyReports />
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

export default EmployeeDashboard;