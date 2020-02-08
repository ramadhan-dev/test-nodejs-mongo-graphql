const express = require('express');
const app = express();
const UrlNotFound = require('../Helpers/Errors/UrlNotFound');

// app.use((req, res, next) => {
//   const error = new UrlNotFound();
//   next(error);
// });

app.use((req, res, next) => {
  const error = new UrlNotFound();
  res.json({
    error: error
  });
});

module.exports = app;