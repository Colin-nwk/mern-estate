import fs from "fs"; // Import the File System module
// Function to save exceeded IPs to a text file
export const saveExceededIPsToFile = (ipList) => {
  const filePath = "exceeded-ips.txt";

  // Convert the IP list to a string with line breaks
  const ipListString = ipList.join("\n");

  // Write the IP list to the text file
  fs.writeFile(filePath, ipListString, (err) => {
    if (err) {
      console.error("Error writing IP list to file:", err);
    } else {
      console.log("Exceeded IPs saved to the file successfully.");
    }
  });
};
