const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
const CORS = require('./src/utils/CORS');
const handleError = require('./src/utils/handleError');
const routes = require('./src/routes');

// graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
// set cors header
app.use(CORS);

// declarasi env
dotenv.config();


// conection to database
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log(`database connected`));

// error message if connection failed
mongoose.connection.on('error', err => {
  console.log(`error connection ${err.message}`);
});

// history url
app.use(morgan('dev'));

// parsing request json  to json
app.use(bodyParser.json());

// use validation for validation field
app.use(expressValidator());


// setup view engine
// app.set('view engine', 'jade');
// app.get('/', function (req, res) {
//   res.render('sample');
// });

// set global promise
mongoose.Promise = global.Promise;

// routing graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

// group router
app.use(routes);

// set handle error request URL
app.use(handleError);



// set dinamic port
const port = process.env.PORT || 8080;


// running app with express js
app.listen(port, () => {
  console.log(`a node js listening on port: ${port}`);
});