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

const allowedOrigins = [
    'http://localhost:4200',       // Angular dev
    'https://musical-speculoos-e3a4c7.netlify.app' // production
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

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
