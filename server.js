/* eslint-disable no-console */

/*
  ## What is this file?

  This file is one of two "apps" that combine to make your dynamic web application.
  It is your "server" file - the piece of software that responds to requests from the browser

  A request from the browser can be as simple as a URL
  for example: http://localhost:3000 or https://google.com - both of these perform "GET" requests.

  The requests get passed through routes by this software, which then call "controllers"
  A "controller" may then incorporate other software, like SQL queries, or requests to other servers

  This file is the "root" of the application and lives in your "root directory"
  The rest of the files it requires live in other directories.
*/

// NPM library dependencies
// These are written by other people, and are included through your 'package.json' file
// package-lock.json should not be touched - it is a generated file that controls versions.
import express from 'express';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';
import dotenv from 'dotenv';
import path from 'path';

// lab-authored routes
// Inside this file you'll find all the routes your client can request from this server
import apiRoutes from './server/routes/apiRoutes.js';

// This sets us up to bring in the .env file, which usually stores application secrets
// In this class, it stores our application context - 'development'
dotenv.config();

// this tells our application where we are in your computer
// so that it can load other files
const __dirname = path.resolve();

// This is commented out because SQL servers are optional in this class
// import db from './server/database/initializeDB.js';

const app = express(); // Turn on our base application
const PORT = process.env.PORT || 3000; // Set our port number to be flexible when deployed
const staticFolder = 'client'; // Our HTML and CSS live in the "staticFolder" - client, public, or build are common names

/*
  CORS - cross-origin request scripting
    These lines let our server respond to requests from any public URL
    CORS protections mostly apply to browsers rather than servers
    They mean that a client with an address of
    "http://xyz.ca" cannot access server "http://qrs.com" without a warning
    or being blocked

    This is to prevent something called cross-site scripting or "XSS" attacks
    It is useful in real life, but awkward while learning
*/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// These let us use JSON data structures to communicate
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Add live reloading to our static HTML/lab files */
// On a local server, reload static files when they are changed
// This will not run if we are on heroku
let liveReloadServer;
if (process.env.CONTEXT === 'development') {
  app.use(connectLivereload({hostname: 'localhost'})); // adding a port breaks the script injection that makes reload work
  liveReloadServer = livereload.createServer();
  const folder = path.join(__dirname, staticFolder);
  liveReloadServer.watch(folder);
}
/* End live reload addition */

/*
  Application Routing
    Set our app structure to use 'http://[whatever-you-chose]/ for our main app
    And 'http://[whatever-you-chose]/api for our data
    While developing, this will be 'http://localhost:3000' - the number set at line 16 in this file.
    In public, it will probably be 'http://your-app-name.heroku.com'
*/
app.use(express.static(staticFolder));
app.use('/api', apiRoutes);

// This function declares what happens when our server turns on
async function bootServer() {
  try { // Try the below, and if something goes wrong ...
    app.listen(PORT, async () => {
      // Turn these back on in later labs
      // const mysql = await db.sequelizeDB;
      // await mysql.sync();
      console.log(`Listening on http://localhost:${PORT}`);
      console.log('environment:', process.env.CONTEXT);
    });
  } catch (err) { // Catch and show us the error in our terminal or application logs
    console.log(err);
  }
}

// Turn the server on by calling the "turn on the server" function
bootServer();

// Old options for refreshing live server
// if (process.env.CONTEXT === 'development') {
//   console.log('livereload');
//   liveReloadServer.server.once('connection', () => {
//     setTimeout(() => {
//       console.log('liveReload');
//       liveReloadServer.refresh('/');
//     }, 100);
//   });
// }
