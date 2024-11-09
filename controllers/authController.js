const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
