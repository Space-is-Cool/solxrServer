/* eslint-disable camelcase */
const mysql = require('mysql2/promise');

const { User, db } = require('./index.js');

db.options.logging = false;

const seedMysql = () => {
  mysql
    .createConnection({ user: 'root', password: '' })
    .then((db) =>
      db.query('CREATE DATABASE IF NOT EXISTS `soldb`').then(() => db)
    )
    .then(() =>
      console.log(
        '\x1b[33m',
        '\nDatabase (MySQL): \'soldb\' successfully created!'
      )
    )
    // .then(() => User.sync({ force: true }))
    .then(() =>
      console.log(
        '\x1b[36m',
        '\nDatabase (MySQL2): \'User\' table successfully created!'
      )
    )
    .then(() =>
      Promise.all(
        [
          { username: 'Arin', email: 'adavisfilm@gmail.com', user_id: 69, accessibility: false, subscribed: false },
          { username: 'Pluto', email: 'bradleyblacksound@gmail.com', user_id: 42, accessibility: false, subscribed: false },
        ].map((txn) => User.create(txn))
      )
    )
    .then((arr) =>
      console.log(
        '\x1b[32m',
        `\nDatabase (MySQL): Successfully seeded soldb with ${arr.length} entries!\n`,
        '\x1b[37m'
      )
    )
    .then(process.exit);
};

seedMysql();

