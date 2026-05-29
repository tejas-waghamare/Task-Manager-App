const DailyReport = require('../models/DailyReport');

// @desc    Submit daily report
// @route   POST /api/reports
// @access  Private/Employee
const submitReport = async (req, res) => {
  try {
    const { workSummary, blockers } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if report already exists for today
    const existingReport = await DailyReport.findOne({
      userId: req.user.id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted a report for today',
      });
    }

    const report = await DailyReport.create({
      userId: req.user.id,
      workSummary,
      blockers,
    });

    const populatedReport = await DailyReport.findById(report._id).populate('userId', 'name email');

    res.status(201).json({
      success: true,
      data: populatedReport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reports (Manager: all, Employee: their reports)
// @route   GET /api/reports
// @access  Private
const getReports = async (req, res) => {
  try {
    let query;
    
    if (req.user.role === 'manager') {
      query = DailyReport.find().populate('userId', 'name email');
    } else {
      query = DailyReport.find({ userId: req.user.id }).populate('userId', 'name email');
    }

    const reports = await query.sort('-date');
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get reports by employee (Manager only)
// @route   GET /api/reports/employee/:employeeId
// @access  Private/Manager
const getEmployeeReports = async (req, res) => {
  try {
    const reports = await DailyReport.find({ userId: req.params.employeeId })
      .populate('userId', 'name email')
      .sort('-date');
    
    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { submitReport, getReports, getEmployeeReports };