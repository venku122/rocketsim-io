const path = require('path');                               // path is a built-in node library to handle file system paths
const express = require('express');                         // express is a popular Model-View-Controller framework for Node
const compression = require('compression');                 // compression library to gzip responses for smaller/faster transfer
const favicon = require('serve-favicon');                   // favicon library to handle favicon requests
const cookieParser = require('cookie-parser');              // Library to parse cookies from the requests
const bodyParser = require('body-parser');                  // library to handle POST requests any information sent in an HTTP body
const mongoose = require('mongoose');                       // Mongoose is one of the most popular MongoDB libraries for node
const expressHandlebars = require('express-handlebars');    // express handlebars is an express plugin for handlebars templating
const session = require('express-session');

const router = require('./router.js');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/rocketsimio';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../client/`)));
// This option tells express to use /assets in a URL path as a static mirror to our client folder
app.use(compression()); // Call compression and tell the app to use it
 // parse form POST requests as application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse application/json body requests.
app.use(session({
  key: 'sessionId',
  secret: 'Awesome Rocket Game',
  resave: true,
  saveUninitialized: true,
}));
app.engine('handlebars', expressHandlebars());  // app.set sets one of the express config options
app.set('view engine', 'handlebars'); // set up the view (V of MVC) to use handlebars
app.set('views', `${__dirname}/../views`);  // set the views path to the template directory
app.use(favicon(`${__dirname}/../client/img/favicon.png`)); // call favicon with the favicon path and tell the app to use it
app.use(cookieParser());  // call the cookie parser library and tell express to use it

router(app);  // pass our app to our router object to map the routes
app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
