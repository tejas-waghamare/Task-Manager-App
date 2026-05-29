import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import MyReports from '../components/employee/MyReports';
import EmployeeReports from '../components/manager/EmployeeReports';

const ReportsPage = () => {
  const { isManager } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
          <p className="text-gray-600 mt-2">
            {isManager ? 'View all employee reports' : 'View your daily work reports'}
          </p>
        </div>
        {isManager ? <EmployeeReports /> : <MyReports />}
      </div>
    </div>
  );
};

export default ReportsPage;