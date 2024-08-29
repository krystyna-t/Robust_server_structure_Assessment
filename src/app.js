const express = require("express");

const app = express();

app.use(express.json());

const urlsRouter = require("./urls/urls.router");
const usesRouter = require("./uses/uses.router");

app.use("/urls", urlsRouter);
app.use("/uses", usesRouter);

app.use((req, res, next) => {
  return next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "Error occured" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;
