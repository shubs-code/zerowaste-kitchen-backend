const express = require("express");
const mongoose = require("mongoose");
const cors=require("cors")

const { MONGO_DB_URI } = require("./constants/constants");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGO_DB_URL = MONGO_DB_URI;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/foodItems", require("./routes/foodItemRoutes"));

app.use("/api/recipe", require("./routes/recipeRoutes"));

mongoose
  .connect(MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
