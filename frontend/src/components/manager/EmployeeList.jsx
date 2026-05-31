import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getAllUsers, getUserStats } from '../../services/userService';
import { format } from 'date-fns';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeStats, setEmployeeStats] = useState({});
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers('employee');
      if (response.success) {
        setEmployees(response.data);
        // Fetch stats for each employee
        await fetchAllEmployeeStats(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch employees');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployeeStats = async (employeesList) => {
    const stats = {};
    for (const employee of employeesList) {
      try {
        const userStats = await getUserStats(employee._id);
        stats[employee._id] = userStats;
      } catch (error) {
        console.error(`Failed to fetch stats for ${employee.name}`);
      }
    }
    setEmployeeStats(stats);
  };

  const handleViewDetails = async (employee) => {
    setSelectedEmployee(employee);
    setShowDetailsModal(true);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Team Members</h2>
            <p className="text-gray-500 mt-1">
              Manage and monitor your team's performance
            </p>
          </div>
          <div className="relative">
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-80"
            />
          </div>
        </div>
      </div>

      {/* Employee Cards Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="text-center py-12">
          <i className="fas fa-users-slash text-6xl text-gray-300 mb-4"></i>
          <p className="text-gray-500">No employees found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredEmployees.map((employee) => {
            const stats = employeeStats[employee._id] || { tasks: [], reports: [] };
            const completedTasks = stats.tasks.filter(t => t.status === 'completed').length;
            const pendingTasks = stats.tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length;
            const recentReports = stats.reports.slice(0, 2);
            
            return (
              <div
                key={employee._id}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Employee Avatar and Name */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{employee.name}</h3>
                        <p className="text-sm text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                    
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-blue-50 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-blue-600">{stats.tasks.length}</p>
                      <p className="text-xs text-gray-600">Total Tasks</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-green-600">{completedTasks}</p>
                      <p className="text-xs text-gray-600">Completed</p>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-yellow-600">{pendingTasks}</p>
                      <p className="text-xs text-gray-600">In Progress</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-3 text-center">
                      <p className="text-2xl font-bold text-purple-600">{stats.reports.length}</p>
                      <p className="text-xs text-gray-600">Reports</p>
                    </div>
                  </div>

                  {/* Recent Reports Preview */}
                  {recentReports.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 mb-2">Recent Activity</p>
                      <div className="space-y-1">
                        {recentReports.map((report, idx) => (
                          <div key={idx} className="text-xs text-gray-600 truncate">
                            <i className="fas fa-file-alt text-gray-400 mr-1"></i>
                            {format(new Date(report.date), 'MMM dd')}: {report.workSummary.substring(0, 40)}...
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleViewDetails(employee)}
                      className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-xl hover:bg-blue-700 transition duration-200 text-sm font-medium flex items-center justify-center space-x-1"
                    >
                      <i className="fas fa-eye"></i>
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Employee Details Modal */}
      {showDetailsModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                  {selectedEmployee.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{selectedEmployee.name}</h3>
                  <p className="text-gray-500">{selectedEmployee.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Performance Overview</h4>
              {(() => {
                const stats = employeeStats[selectedEmployee._id] || { tasks: [], reports: [] };
                return (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Task Completion Rate</p>
                        <p className="text-2xl font-bold text-green-600">
                          {stats.tasks.length ? Math.round((stats.tasks.filter(t => t.status === 'completed').length / stats.tasks.length) * 100) : 0}%
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-sm text-gray-600">Active Tasks</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {stats.tasks.filter(t => t.status === 'in-progress' || t.status === 'pending').length}
                        </p>
                      </div>
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mb-3">Assigned Tasks</h4>
                    <div className="space-y-3 mb-6">
                      {stats.tasks.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No tasks assigned</p>
                      ) : (
                        stats.tasks.map((task, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">{task.title}</p>
                                <p className="text-sm text-gray-600">{task.description?.substring(0, 60)}</p>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                task.status === 'completed' ? 'bg-green-100 text-green-700' :
                                task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {task.status}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-gray-800 mb-3">Recent Reports</h4>
                    <div className="space-y-3">
                      {stats.reports.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No reports submitted</p>
                      ) : (
                        stats.reports.slice(0, 5).map((report, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-3">
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-sm font-medium text-gray-800">
                                {format(new Date(report.date), 'PPP')}
                              </p>
                            </div>
                            <p className="text-sm text-gray-600">{report.workSummary}</p>
                            {report.blockers && (
                              <p className="text-sm text-red-600 mt-1">
                                <i className="fas fa-exclamation-triangle mr-1"></i>
                                {report.blockers}
                              </p>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;