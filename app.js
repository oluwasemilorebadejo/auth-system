const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/api/v1/users", userRouter);

module.exports = app;
