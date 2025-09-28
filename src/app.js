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
const loggerMiddleware = require('./middlewares/logger.middleware');

const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware)

// Mount routes
app.use('/api/books', bookRouter);
app.use('/u', userRouter);
app.use('/api/authors', authorRouter);

app.use('/', (err, req, res, next)=> {
    res.send("abo")
});
// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
