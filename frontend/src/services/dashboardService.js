import api from './api';

export const getManagerStats = async () => {
  const response = await api.get('/dashboard/manager');
  return response.data;
};

export const getEmployeeStats = async () => {
  const response = await api.get('/dashboard/employee');
  return response.data;
};