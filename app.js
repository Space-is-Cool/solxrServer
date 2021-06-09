/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/server');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'splash')));

app.use('/users', usersRouter);

app.get('/subscribe', (req, res) => {
  const { email } = req.query;
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (email.match(regex)) {
    User.findAll({
      where: {email}
    }).then(user => {
      if (user.length) {
      } else {
        User.create({email});
      }
      res.sendFile(path.join(__dirname, './splash/subscribe.html'));
    });
  }
})

app.get('/unsubscribe', (req, res) => {
  res.sendFile(path.join(__dirname, './splash/unsubscribe.html'));
});

// app.get('/unsubscribed', (req, res) => {
//   const { email } = req.query;
//   const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   if (email.match(regex)) {
//     User.destroy({
//       where: {email}
//     }).then(() => {
//       res.sendFile(path.join(__dirname, './splash/unsubscribed.html'));
//     });
//   }
// });

// error handler
app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  //   // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
