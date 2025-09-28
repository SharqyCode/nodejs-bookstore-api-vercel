const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const start = Date.now();

  logger.info({ message: 'Incoming request', method: req.method, url: req.originalUrl});

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      message: 'Response sent',
      url: req.originalUrl,
      status: res.statusCode,
      duration
    });
  });

  next();
};
