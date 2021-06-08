const nodemailer = require('nodemailer');
const CronJob = require('cron').CronJob;
const moment = require('moment');
const Sequelize = require ('sequelize');
const Op = Sequelize.Op;


const { User } = require ('../db');
const eventsData = require('../assets/eventdata');

const emailBlast = (credA, credB) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: credA,
      pass: credB
    }
  });

  
  const weeklyEmail = new CronJob('0 2 * * *', async () => {

    const userList = await User.findAll({
      where: {
        email: {
          [Op.ne]: null
        }
      }
    }).then((data) => data.map(user => user.dataValues.email));
    const emailBody = (events) => {
      const weekStarts = moment().format('YYYYMMDD');
      const weekEnds = moment().add(1, 'week').format('YYYYMMDD');
      return events.filter(event => {
        const eventDate = event.uid.slice(0, 8);
        return eventDate > weekStarts && eventDate < weekEnds;
      }).map(({summary, description, uid}) => {
        const eventDate = uid.slice(0, 8);
        const formatDate = [eventDate.slice(4, 6), eventDate.slice(6), eventDate.slice(0, 4)].join('-');
        return [summary, formatDate, description].join('\n');
    
      }).join('\n\n').concat('\n\n\n Unsubscribe: \n http://solxrapp.com/unsubscribe')
        .toString();
    };

    const body = {
      from: 'solxrweekly@gmail.com',
      to: 'solxrweekly@gmail.com',
      bcc: userList,
      subject: 'Visible astral events for the coming week!',
      text: emailBody(eventsData)
    };

  });
  weeklyEmail.start();
};

module.exports = {
  emailBlast
};
