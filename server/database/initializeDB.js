/* eslint-disable max-len */
/*
## What is this file?
  Databases typically require some code to connect. This file stores that code.
  Once the code is working, you should not need to update it very often.
 */

import mysql from 'mysql';
import configOptions from './config.js';

const env = process.env.NODE_ENV || 'development'; // this clause allows us to set our "environment" for development, production, or testing.
const options = configOptions[env]; // this clause picks one of the options from the config file. We only have development set up just now.

const mysqlDB = mysql.createConnection(options); // connect to the database with the options we've stored

const db = {};

db.mysqlDB = mysqlDB;
db.MySql = mysql;

export default db; // this passes the database out when we include this file in other parts of the application
