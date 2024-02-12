import {
  format as _format,
  createLogger,
  transports as _transports,
} from "winston";

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const myFormat = _format.printf(
  ({ level, message, label, timestamp, stack, ...args }) => {
    const date = new Date(timestamp);
    const options = { timeZone: "Asia/Kolkata" };
    const ts = date
      .toLocaleString("en-US", options)
      .replace(/\//g, "-")
      .replace("T", " ")
      .slice(0, 19);
    const detailsFromFile = getDetailsFromFile(new Error().stack);
    message = level === "error" ? "\x1b[31m" + message + "\x1b[0m" : message;
    message = level === "info" ? "\x1b[32m" + message + "\x1b[0m" : message;
    message = level === "warn" ? "\x1b[33m" + message + "\x1b[0m" : message;
    message = level === "debug" ? "\x1b[36m" + message + "\x1b[0m" : message;
    return `${ts} [${level}] \x1b[37m[${detailsFromFile.file}] [${
      detailsFromFile.line
    }]\x1b[0m: ${message} ${
      Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
    }`;
  }
);
// get current Directory

const getDetailsFromFile = (fileDetails) => {
  const fileAndRow = fileDetails
    .split("at ")
    .pop()
    .split("(")
    .pop()
    .replace(")", "")
    .split(":");

  const detailsFromFile = {
    file: fileAndRow[0].trim().replace(process.cwd(), ""),
    line: fileAndRow[1],
    row: fileAndRow[2],
  };

  return detailsFromFile;
};
let logDate = new Date()
  .toLocaleString("en-US", {
    timeZone: "Asia/Calcutta",
    dateStyle: "short",
  })
  .replace(/\//g, "-");
const logger = createLogger({
  level: logLevels,
  format: _format.combine(
    _format.timestamp(),
    _format.json(),
    myFormat,
    _format.colorize({ all: true })
  ),
  transports: [
    new _transports.Console(options.console),
    new _transports.File({
      filename: `src/assets/logs/logs-${logDate}.log`,
      level: "debug",
    }),
  ],
});

// Handling uncaught exceptions
logger.exitOnError = false;

export default logger;
