const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');
const config = require('./config');
const bookRouter = require('./routes/books.routes');
const authorRouter = require("./routes/authors.routes");


const app = express();
// In your app.js or wherever you set up swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Store API',
      version: '1.0.0',
      description: 'A Book Store API with Express and MongoDB',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API files
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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
app.use('/api/authors', authorRouter);
// app.use('/api/authors', authorRouter);

// Error handler (must be last)
app.use(errorMiddleware);

module.exports = app;
