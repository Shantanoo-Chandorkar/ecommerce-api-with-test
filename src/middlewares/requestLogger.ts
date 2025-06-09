import morgan from 'morgan';
import logger from '../config/logger';

// Custom stream for Morgan to use Winston
const stream = {
  write: (message: string) => logger.info(message.trim()),
};

// Morgan middleware using winston
const requestLogger = morgan('combined', { stream });

export default requestLogger;
