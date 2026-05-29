import api from './api';

export const getReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

export const submitReport = async (reportData) => {
  const response = await api.post('/reports', reportData);
  return response.data;
};

export const getEmployeeReports = async (employeeId) => {
  const response = await api.get(`/reports/employee/${employeeId}`);
  return response.data;
};