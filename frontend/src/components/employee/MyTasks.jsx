import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getTasks, updateTaskStatus } from '../../services/taskService';
import { format } from 'date-fns';

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

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

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date();
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Tasks</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-gray-300 rounded-lg"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="review">Review</option>
        </select>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No tasks assigned</p>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task._id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{task.title}</h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2 items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    {isOverdue(task.deadline) && task.status !== 'completed' && (
                      <span className="text-red-600 text-sm">
                        <i className="fas fa-exclamation-triangle mr-1"></i>
                        Overdue
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      <i className="fas fa-calendar mr-1"></i>
                      Due: {format(new Date(task.deadline), 'PPP')}
                    </span>
                  </div>
                </div>
                <div className="ml-4">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTasks;