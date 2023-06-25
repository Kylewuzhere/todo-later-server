const express = require("express");
const cors = require("cors");
const todoRouter = require("./todos/todos.router");
const { checkJwt } = require("./middleware/authorizationMiddleware");
const errorHandler = require("./middleware/errorHandlerMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  res.json({ message: "OK!" });
});

app.get("/api/public", async (req, res) => {
  res.json({ message: "Public OK!" });
});

app.get("/api/private", checkJwt, async (req, res) => {
  res.json({ message: "Private OK!" });
});

app.use("/api/todos", todoRouter);
app.use(errorHandler);

module.exports = app;
