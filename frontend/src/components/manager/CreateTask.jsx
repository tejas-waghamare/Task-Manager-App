import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { createTask } from '../../services/taskService';
import api from '../../services/api';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    deadline: '',
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [characterCount, setCharacterCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/users?role=employee');
      if (response.data.success) {
        setEmployees(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to load employees list');
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    if (name === 'title') {
      setTitleCount(value.length);
    }
    if (name === 'description') {
      setCharacterCount(value.length);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please enter task title');
      return;
    }
    if (!formData.description.trim()) {
      toast.error('Please enter task description');
      return;
    }
    if (!formData.assignedTo) {
      toast.error('Please assign task to an employee');
      return;
    }
    if (!formData.deadline) {
      toast.error('Please set a deadline');
      return;
    }

    const selectedDate = new Date(formData.deadline);
    if (selectedDate < new Date()) {
      toast.error('Deadline cannot be in the past');
      return;
    }

    setLoading(true);
    try {
      const response = await createTask(formData);
      if (response.success) {
        toast.success('Task created successfully!');
        setFormData({
          title: '',
          description: '',
          assignedTo: '',
          deadline: '',
        });
        setTitleCount(0);
        setCharacterCount(0);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Create New Task</h2>
            <p className="text-sm text-gray-500">Assign tasks to employees with deadlines</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Task Title */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Task Title</span>
              <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${titleCount > 100 ? 'text-orange-500' : 'text-gray-400'}`}>
              {titleCount}/100
            </span>
          </div>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            maxLength="100"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="e.g., Develop login API endpoint"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Description</span>
              <span className="text-red-500">*</span>
            </label>
            <span className={`text-xs ${characterCount > 500 ? 'text-orange-500' : 'text-gray-400'}`}>
              {characterCount}/500
            </span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            maxLength="500"
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            placeholder="Provide detailed information about the task, requirements, and expected outcomes..."
            required
          ></textarea>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => setFormData({...formData, description: formData.description + "• Create database schema\n"})}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition"
            >
              + Add bullet point
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, description: formData.description + "✅ Acceptance criteria:\n"})}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded-lg transition"
            >
              + Add criteria
            </button>
          </div>
        </div>

        {/* Assign To */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Assign To</span>
            <span className="text-red-500">*</span>
          </label>
          
          {loadingEmployees ? (
            <div className="flex items-center justify-center py-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-500">Loading employees...</span>
            </div>
          ) : (
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer"
              required
            >
              <option value="">Select an employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  👤 {emp.name} - {emp.email}
                </option>
              ))}
            </select>
          )}
          
          {employees.length === 0 && !loadingEmployees && (
            <p className="text-xs text-yellow-600 mt-1">
              ⚠️ No employees found. Please add employees first.
            </p>
          )}
        </div>

        {/* Deadline */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 flex items-center space-x-1">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Deadline</span>
            <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            min={getMinDateTime()}
            className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Set a realistic deadline for task completion
          </p>
        </div>

        {/* Quick Tips */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">💡 Tips for creating effective tasks:</p>
              <ul className="text-xs space-y-1 text-blue-700">
                <li>• Be specific and clear about the task requirements</li>
                <li>• Set realistic deadlines considering task complexity</li>
                <li>• Include acceptance criteria for better clarity</li>
                <li>• Add relevant resources or links in description</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading || employees.length === 0}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Task...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Create Task</span>
              </div>
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({
                title: '',
                description: '',
                assignedTo: '',
                deadline: '',
              });
              setTitleCount(0);
              setCharacterCount(0);
              toast.success('Form cleared');
            }}
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;