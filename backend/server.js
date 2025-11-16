const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const businessRoutes = require('./routes/businesses');
const adminRoutes = require('./routes/admin');
const moderatorRoutes = require('./routes/moderator');
const storageRoutes = require('./routes/storage');

const app = express();

// Middleware - CORS configuration
const corsOrigins = [
  // Production domain
  'https://www.mejorrasales.com',
  'https://mejorrasales.com',
  // Legacy domains (if still in use)
  'https://cardan.app',
  'https://www.cardan.app',
  // Environment variable override
  process.env.FRONTEND_URL
].filter(Boolean);

// Add production URLs if provided via environment
if (process.env.FRONTEND_URL) {
  corsOrigins.push(process.env.FRONTEND_URL);
  // Add www version if main domain doesn't include www
  if (!process.env.FRONTEND_URL.includes('www.')) {
    corsOrigins.push(process.env.FRONTEND_URL.replace('https://', 'https://www.'));
  }
  // Add non-www version if main domain includes www
  if (process.env.FRONTEND_URL.includes('www.')) {
    corsOrigins.push(process.env.FRONTEND_URL.replace('www.', ''));
  }
}

// Only add localhost in development
if (process.env.NODE_ENV !== 'production') {
  corsOrigins.push('http://localhost:3000', 'http://localhost:3001');
}

app.use(cors({
  origin: corsOrigins.length > 0 ? corsOrigins : true, // Allow all in development if no FRONTEND_URL set
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Log CORS configuration on startup
console.log('🔒 CORS allowed origins:', corsOrigins.length > 0 ? corsOrigins : 'All origins (development mode)');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (legacy - images now in Supabase Storage)
// app.use('/uploads', express.static('uploads'));

// Logging middleware
app.use((req, res, next) => {
  const origin = req.headers.origin || 'No origin header';
  console.log(`${req.method} ${req.path} | Origin: ${origin}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/moderator', moderatorRoutes);
app.use('/api/storage', storageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Dominion City API is running' });
});

// Database health check
app.get('/api/health/db', async (req, res) => {
  const pool = require('./config/database');
  try {
    const result = await pool.query('SELECT NOW()');
    const userCount = await pool.query('SELECT COUNT(*) FROM users');
    const businessCount = await pool.query('SELECT COUNT(*) FROM businesses');
    res.json({
      status: 'ok',
      message: 'Database connected',
      timestamp: result.rows[0].now,
      users: userCount.rows[0].count,
      businesses: businessCount.rows[0].count
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Use PORT from environment (required for cPanel/Passenger)
// cPanel automatically sets PORT environment variable
// Default to 5050 for this deployment
const PORT = process.env.PORT || 5050;

// Listen on all interfaces (required for cPanel)
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on ${HOST}:${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API available at: http://${HOST}:${PORT}/api`);
  console.log(`🌐 Production API URL: https://mejorrasales.com:${PORT}/api`);
  console.log(`🌐 Production API URL (www): https://www.mejorrasales.com:${PORT}/api`);
  console.log(`🔒 CORS configured for: ${corsOrigins.length > 0 ? corsOrigins.join(', ') : 'All origins'}`);
});
