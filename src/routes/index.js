const express = require('express');
const app = express();

// route
const post = require('./post');
const blog = require('./blog');
const register = require('./register');

// middleware check for expired token
const { expiredToken } = require('./../Helpers/middlewares/expiredToken');

// graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./../schema/schema');

// routing graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

// get blog list
app.use('/blog', blog);
app.use('/auth', register);

// GLobal middleware check request headers (token)
app.use(expiredToken);

app.use('/post', post);

module.exports = app;
