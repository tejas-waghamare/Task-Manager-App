const Task = require('../models/Task');
const DailyReport = require('../models/DailyReport');
const User = require('../models/User');

// @desc    Get dashboard stats for Manager
// @route   GET /api/dashboard/manager
// @access  Private/Manager
const getManagerStats = async (req, res) => {
  try {
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    
    const tasks = await Task.find();
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayReports = await DailyReport.countDocuments({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        todayReports,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get dashboard stats for Employee
// @route   GET /api/dashboard/employee
// @access  Private/Employee
const getEmployeeStats = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayReport = await DailyReport.findOne({
      userId: req.user.id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
        hasSubmittedTodayReport: !!todayReport,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getManagerStats, getEmployeeStats };