import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { updateTaskStatus } from '../../services/taskService';

const UpdateTaskStatus = ({ task, onUpdate }) => {
  const [status, setStatus] = useState(task.status);
  const [updating, setUpdating] = useState(false);

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'review', label: 'Review', color: 'bg-purple-100 text-purple-800' },
    { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  ];

  const handleUpdate = async () => {
    if (status === task.status) {
      toast.error('Please select a different status');
      return;
    }

    setUpdating(true);
    try {
      const response = await updateTaskStatus(task._id, status);
      if (response.success) {
        toast.success('Task status updated successfully');
        if (onUpdate) onUpdate();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        disabled={updating}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={handleUpdate}
        disabled={updating || status === task.status}
        className="px-3 py-1 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
      >
        {updating ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          'Update'
        )}
      </button>
    </div>
  );
};

export default UpdateTaskStatus;