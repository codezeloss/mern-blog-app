const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

// Middlewares
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/uploads", express.static(__dirname + "/uploads"));

// Morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/", userRoutes);

module.exports = app;
