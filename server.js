const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path"); // Import the path module
const app = express();
const favicon = require("serve-favicon");


app.use(express.json());
app.use(favicon(path.join(__dirname, "favicon.png")));


// Set the content type explicitly for all static files
app.use(
  express.static(path.join(__dirname), {
    setHeaders: (res, filePath) => {
      // Get the file extension
      const ext = path.extname(filePath).toLowerCase();
      // Set the appropriate content type based on file extension
      const contentType = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        // Add more MIME types as needed
      }[ext];
      if (contentType) {
        res.setHeader("Content-Type", contentType);
      }
    },
  })
);

// Define a route to serve the HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
