const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const paymentRoutes = require('./routes/payment');
const aiRoutes = require('./routes/ai');

const app = express();

// 1. CORS Fix: Verifying the frontend URL properly
const allowedOrigins = [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." }
});

const aiSpecificLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 20, 
    message: { error: "AI request limit reached for this hour." }
});

app.use(generalLimiter);
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiSpecificLimiter, aiRoutes); 

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Matrix DB Connected")) 
    .catch(err => console.log("❌ DB Connection Error:", err)); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));