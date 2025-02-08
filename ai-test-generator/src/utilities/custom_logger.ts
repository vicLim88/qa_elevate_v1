import winston from "winston";

export const logger_custom = winston.createLogger({
    level: "info", // Set log level (info, warn, error, debug)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/app.log" }) // Logs to a file
    ]
});
