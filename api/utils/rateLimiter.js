import rateLimit from "express-rate-limit"; // Import the rate-limiting middleware
import { saveExceededIPsToFile } from "./functions.js";
export const exceededIPs = [];
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    // Access the client's IP address
    const clientIP = req.ip;

    // Store the IP address that has exceeded its limit
    if (clientIP) {
      exceededIPs.push(clientIP);
      console.log(exceededIPs);
      saveExceededIPsToFile(exceededIPs);
    }

    // Respond with a 429 status code
    //     return res.status(429).json({ message: "Rate limit exceeded" });
    res.status(429);
    throw new Error("Rate limit exceeded");
  },
});
