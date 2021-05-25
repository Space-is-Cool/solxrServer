/* eslint-disable camelcase */
const Sequelize = require('sequelize');

// const db = new Sequelize('soldb', 'root');

const db = new Sequelize('soldb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

db.authenticate()
  .then(()=>{ console.log('server connected'); })
  .catch((err)=>{ console.log(err); });

const User = db.define('user', {
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  hash: Sequelize.STRING,
  music: Sequelize.BOOLEAN,
  theme: Sequelize.BOOLEAN,
  accessibility: Sequelize.BOOLEAN,
  subscribed: Sequelize.BOOLEAN
});

const Iotd = db.define('users_iotd', {
  user_id: Sequelize.INTEGER,
  url: Sequelize.STRING,
  title: Sequelize.STRING,
  explanation: Sequelize.TEXT
});

const ImageFeed = db.define('image_feed', {
  picture_id: Sequelize.INTEGER,
  created_at: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
});

const Emoji = db.define('emoji', {
  picture_id: Sequelize.INTEGER,
  emoji_type: Sequelize.STRING,
  user_id: Sequelize.INTEGER,
});

User.sync();
Iotd.sync();
ImageFeed.sync();
Emoji.sync();

module.exports.db = db;
module.exports.User = User;
module.exports.Iotd = Iotd;
module.exports.ImageFeed = ImageFeed;
module.exports.Emoji = Emoji;
