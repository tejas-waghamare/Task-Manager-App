import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import MyTasks from '../components/employee/MyTasks';
import TaskList from '../components/manager/TaskList';

const TasksPage = () => {
  const { isManager } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tasks</h1>
          <p className="text-gray-600 mt-2">
            {isManager ? 'Manage all employee tasks' : 'View and update your tasks'}
          </p>
        </div>
        {isManager ? <TaskList /> : <MyTasks />}
      </div>
    </div>
  );
};

export default TasksPage;