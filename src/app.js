const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const errorMiddleware = require('./middlewares/error.middleware');
const config = require('./config');
const bookRouter = require('./routes/books.routes');
const userRouter = require('./routes/user.routes');
const authorRouter = require("./routes/authors.routes");


const app = express();


// Global middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (config.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
}

// Mount routes
app.use('/api/books', bookRouter);
app.use('/', userRouter);
app.use('/api/authors', authorRouter);
// app.use('/api/authors', authorRouter);

// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
