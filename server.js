const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

// Database connection
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection successful!");
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRouter = require('./routes/auth.routes');
const manageRouter = require('./routes/manager.route');
const casesRouter = require('./routes/cases.route');
const videoRouter = require('./routes/video.route');
app.use('/Detecto/auth', authRouter);
app.use('/Detecto/manage', manageRouter);
app.use('/Detecto/CasesManage', casesRouter);
app.use('/Detecto/Video',videoRouter);

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
