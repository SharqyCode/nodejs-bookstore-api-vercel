const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorMiddleware = require('./middlewares/error.middleware');
const loggerMiddleware = require('./middlewares/logger.middleware');
const router = require('./routes');
const connectDB = require("./config/db");
const config = require('./config');


const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware)

// connect DB only once (reused in serverless functions)
connectDB(config.ATLAS_URI);

// Mount routes
app.use('/', router);

app.use(errorMiddleware);

module.exports = app;
