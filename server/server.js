require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const roadmapsRouter = require("./routes/roadmaps");

const app = express();

// Enable CORS for the React app
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/roadmaps", roadmapsRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
