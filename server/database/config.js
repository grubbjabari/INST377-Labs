/* eslint-disable max-len */ // this is how we make exceptions in the linter
/*
## What is this file?
  A config file stores settings for connecting out of your current environment.

  username: the name the computer you are connecting to expects
  password: password for that account
  database: database you would like to connect to in that machine
  host: '174.129.198.86' - the IP address of the machine running the process to which you want to connect.

  "host" can get complicated quickly. If you have a "dynamic" IP address, it may change too often for you to store.
  this is a "static" or unchanging IP address - in a "real" app it is more likely to be a URL hosted by a separate service.

  By keeping these options in a separate text file,
  it's possible to hide them from version control or other services that would make them public.

  Outside of class, this makes it easier to protect your work from other people taking over your database.
 */
/* eslint-enable max-len */

export default {
  development: {
    username: 'ubuntu',
    password: 'Veracrypt@12!',
    database: 'Dining_Hall_Tracker',
    host: '174.129.198.86'
  },
  test: {
  },
  production: {
  }
};
