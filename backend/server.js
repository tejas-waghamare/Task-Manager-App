// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const userRoutes = require('./routes/userRoutes');

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/users', userRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log('MongoDB Connected Successfully'))
//   .catch((err) => {
//     console.error('MongoDB Connection Error:', err);
//     process.exit(1);
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API available at http://localhost:${PORT}/api`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',           // Local development
  'http://localhost:3000',           // Alternative local port
  process.env.FRONTEND_URL='https://task-manager-app-154s.onrender.com',          // Your Render frontend URL (set in env)
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});