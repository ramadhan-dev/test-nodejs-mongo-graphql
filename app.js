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

app.use(CORS);

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log(`database connected`));

mongoose.connection.on('error', err => {
  console.log(`error connection ${err.message}`);
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());

// app.set('view engine', 'jade');
// app.get('/', function(req, res) {
//   res.render('sample');
// });
mongoose.Promise = global.Promise;
app.use(routes);
app.use(handleError);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`a node js listening on port: ${port}`);
});
