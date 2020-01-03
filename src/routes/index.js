const express = require('express');
const app = express();
const post = require('./post');
const blog = require('./blog');
const register = require('./register');

app.use('/post', post);
app.use('/auth', register);
app.use('/blog', blog);

module.exports = app;