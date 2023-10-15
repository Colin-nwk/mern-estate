import winston from "winston";

const logFilePath = "error.md";

// Define the Winston logger with the desired configuration
export const logger = winston.createLogger({
  level: "error", // Set the minimum level for logging (you can change this)
  format: winston.format.json(),
  //   defaultMeta: { service: "mern-estate" },
  transports: [
    new winston.transports.File({ filename: "error.log" }), // Log errors to a file
    // You can add more transports here (e.g., console, external services)
  ],
});

// export const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File({
//       filename: logFilePath,
//       level: "error",
//       format: winston.format.combine(
//         winston.format.printf((info) => {
//           return (
//             `### Error Log Entry\n\n` +
//             `**Timestamp:** ${info.timestamp}\n` +
//             `**IP Address:** ${info.ip}\n` +
//             `**Device:** ${info.device}\n` +
//             `**Error Name:** ${info.errorName}\n` +
//             `**Error Message:** ${info.errorMessage}\n\n`
//           );
//         })
//       ),
//     }),
//   ],
// });

// export const logger = winston.createLogger({
//   transports: [
//     new winston.transports.File({
//       filename: logFilePath,
//       level: "error",
//       format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.printf((info) => {
//           return (
//             `### Error Log Entry\n\n` +
//             `**Timestamp:** ${info.timestamp}\n` +
//             `**IP Address:** ${info.ip}\n` +
//             `**Device:** ${info.device}\n` +
//             `**Error Name:** ${info.errorName}\n` +
//             `**Error Message:** ${info.errorMessage}\n\n`
//           );
//         })
//       ),
//     }),
//   ],
// });
