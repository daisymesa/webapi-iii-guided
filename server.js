const express = require('express'); // importing a CommonJS module
// Third party middleware imports
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// ///////// THIRD PARTY MIDDLEWARE /////////
server.use(helmet()); // Third-party middleware
// Look on NPM for morgan middleware, and add it the same as we did with helmet:
server.use(morgan('dev')); // Third-party middleware
/* OPTIONAL:
server.use(express.json(), helmet(), morgan('dev'))
*/


// ///////// CUSTOM MIDDLEWARE /////////
// 'next' will make the next middleware run
const methodLogger = (req, res, next) => {
  console.log(`${req.method} REQUEST!`);
  next();
}
// server.use(methodLogger);


server.use(express.json()); // this is being used globally in the application. this is a built-in middleware, coming from express.

server.use('/api/hubs', hubsRouter); // hubsRouter here is being used locally - only affects behaviour of this endpoint

server.get('/', methodLogger, (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
