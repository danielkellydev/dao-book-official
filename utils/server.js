console.log("Starting the server...");
const app = require("../app");
const connectToDatabase = require("./connect");
const path = require("path");
require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 5000;

// Serve static assets

app.use(express.static(path.join(__dirname, "../client/dist")));

console.log("Connecting to the database...");
connectToDatabase()
  .then(() => {
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.log(`Could not connect to the database. Exiting now...${err}`);
    process.exit(1);
  });
