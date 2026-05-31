import api from './api';

export const getAllUsers = async (role = null) => {
  const url = role ? `/users?role=${role}` : '/users';
  const response = await api.get(url);
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const getUserStats = async (userId) => {
  const [tasksResponse, reportsResponse] = await Promise.all([
    api.get('/tasks'),
    api.get('/reports')
  ]);
  
  return {
    tasks: tasksResponse.data.data.filter(task => task.assignedTo?._id === userId),
    reports: reportsResponse.data.data.filter(report => report.userId?._id === userId)
  };
};