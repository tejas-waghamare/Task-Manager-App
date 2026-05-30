import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getTasks, updateTaskStatus } from '../../services/taskService';
import { format } from 'date-fns';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const response = await updateTaskStatus(taskId, newStatus);
      if (response.success) {
        toast.success('Task status updated');
        fetchTasks();
      }
    } catch (error) {
      toast.error('Failed to update task status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      review: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏰',
      'in-progress': '🔄',
      completed: '✅',
      review: '👀',
    };
    return icons[status] || '📋';
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  // Apply both filter and search
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Loading Component
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Animated Loader */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          {/* Skeleton Cards */}
          <div className="w-full max-w-2xl space-y-4 mt-4">
            <div className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="flex justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                    <div className="flex space-x-2">
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-28"></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm animate-pulse">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">My Tasks</h2>
              <p className="text-sm text-gray-500">Track and manage your assigned tasks</p>
            </div>
          </div>
          
          {/* Task Stats */}
          <div className="flex gap-2 text-sm">
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-gray-500">Total:</span>
              <span className="ml-1 font-semibold text-gray-800">{tasks.length}</span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-gray-500">Completed:</span>
              <span className="ml-1 font-semibold text-green-600">
                {tasks.filter(t => t.status === 'completed').length}
              </span>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-gray-500">Pending:</span>
              <span className="ml-1 font-semibold text-yellow-600">
                {tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search tasks by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
            >
              <option value="all">📋 All Tasks</option>
              <option value="pending">⏰ Pending</option>
              <option value="in-progress">🔄 In Progress</option>
              <option value="review">👀 Review</option>
              <option value="completed">✅ Completed</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="p-6">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
            <p className="text-gray-500">
              {searchTerm || filter !== 'all' 
                ? "Try adjusting your search or filter criteria"
                : "You don't have any tasks assigned yet"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="group bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    {/* Task Title and Status Badge */}
                    <div className="flex items-center flex-wrap gap-2 mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {task.title}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(task.status)}`}>
                        <span>{getStatusIcon(task.status)}</span>
                        <span>{task.status}</span>
                      </span>
                      {isOverdue(task.deadline) && task.status !== 'completed' && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
                          <span>⚠️</span>
                          <span>Overdue</span>
                        </span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Due: {format(new Date(task.deadline), 'PPP')}</span>
                      </div>
                      {task.createdAt && (
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Created: {format(new Date(task.createdAt), 'PPP')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Status Update Dropdown */}
                  <div className="lg:ml-4">
                    <select
                      value={task.status}
                      onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                      className="px-3 py-2 cursor-pointer border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-blue-300 transition-colors"
                    >
                      <option value="pending">⏰ Mark as Pending</option>
                      <option value="in-progress">🔄 Mark as In Progress</option>
                      <option value="review">👀 Mark as Review</option>
                      <option value="completed">✅ Mark as Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Results Count */}
        {filteredTasks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">
              Showing {filteredTasks.length} of {tasks.length} tasks
              {searchTerm && ` matching "${searchTerm}"`}
              {filter !== 'all' && ` • Filtered by: ${filter}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;