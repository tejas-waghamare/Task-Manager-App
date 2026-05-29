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

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // CORS configuration - Allow multiple origins
// const allowedOrigins = [
//   'http://localhost:5173',           // Local development
//   'http://localhost:3000',           // Alternative local port
//   process.env.FRONTEND_URL='https://task-manager-app-154s.onrender.com',
// ].filter(Boolean); // Remove undefined values

// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, postman)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

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

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');

// dotenv.config();

// const app = express();

// // CORS configuration - Allow multiple origins
// const allowedOrigins = [
//   'http://localhost:5173',           // Local development (Vite default)
//   'http://localhost:3000',           // Alternative local port
//   'https://task-manager-app-154s.onrender.com',  // Your Render frontend
//   process.env.FRONTEND_URL,          // Optional: Set in Render dashboard
// ].filter(Boolean); // Remove undefined values

// // Enable CORS with proper configuration
// app.use(cors({
//   origin: function(origin, callback) {
//     // Allow requests with no origin (like mobile apps, curl, postman)
//     if (!origin) return callback(null, true);
    
//     // Check if origin is allowed
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       return callback(null, true);
//     }
    
//     // For development, log rejected origins
//     console.log(`CORS request rejected from origin: ${origin}`);
//     const msg = 'CORS policy does not allow access from this origin.';
//     return callback(new Error(msg), false);
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
//   exposedHeaders: ['Content-Range', 'X-Content-Range'],
//   maxAge: 86400 // 24 hours
// }));

// // Handle preflight requests OPTIONS method
// app.options('*', cors());

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const reportRoutes = require('./routes/reportRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');
// const userRoutes = require('./routes/userRoutes');

// // Health check endpoint (useful for Render)
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'ok',
//     timestamp: new Date().toISOString(),
//     mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
//   });
// });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/reports', reportRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/users', userRoutes);

// // 404 handler for undefined routes
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Cannot find ${req.originalUrl} on this server`
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('Error:', err.stack);
  
//   // Handle CORS errors specifically
//   if (err.message.includes('CORS')) {
//     return res.status(403).json({
//       success: false,
//       message: 'CORS error: ' + err.message
//     });
//   }
  
//   res.status(err.status || 500).json({
//     success: false,
//     message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
//   });
// });

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('MongoDB Connected Successfully');
//     console.log('MongoDB Database:', mongoose.connection.db.databaseName);
//   })
//   .catch((err) => {
//     console.error('MongoDB Connection Error:', err.message);
//     process.exit(1);
//   });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log(`API available at http://localhost:${PORT}/api`);
//   console.log(`Health check at http://localhost:${PORT}/health`);
//   console.log(`CORS allowed origins:`, allowedOrigins.filter(o => o));
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// CORS configuration - Allow multiple origins
const allowedOrigins = [
  'http://localhost:5173',           // Local development (Vite default)
  'http://localhost:3000',           // Alternative local port
  'https://task-manager-app-154s.onrender.com',  // Your Render frontend
  process.env.FRONTEND_URL,          // Optional: Set in Render dashboard
].filter(Boolean); // Remove undefined values

// CORS middleware - Simplified for Express 5 compatibility
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Check if origin is allowed
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // For development, log rejected origins
    console.log(`CORS request rejected from origin: ${origin}`);
    const msg = 'CORS policy does not allow access from this origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// REMOVED the problematic line: app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userRoutes = require('./routes/userRoutes');

// Health check endpoint (useful for Render)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Handle CORS errors specifically
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({
      success: false,
      message: 'CORS error: ' + err.message
    });
  }
  
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message,
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    console.log('MongoDB Database:', mongoose.connection.db.databaseName);
  })
  .catch((err) => {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
  console.log(`Health check at http://localhost:${PORT}/health`);
  console.log(`CORS allowed origins:`, allowedOrigins.filter(o => o));
});