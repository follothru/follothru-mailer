import winston, { format } from 'winston';

const formatter = format.printf(({ level, label, message, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

export function createLogger(label) {
  return winston.createLogger({
    format: format.combine(
      format.label({ label }),
      format.json(),
      format.timestamp(),
      formatter
    ),
    transports: [
      new winston.transports.Console()
    ]
  });
}
