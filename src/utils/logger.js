import log from 'loglevel';
import process from 'process';

// Set log level based on environment
if (process.env.NODE_ENV === 'production') {
  log.setLevel('warn'); // In production, log only warnings and errors
} else {
  log.setLevel('debug'); // In development, log everything (debug, info, etc.)
}

export default log;
