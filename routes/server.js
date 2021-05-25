/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('wowwwwww');
  res.render('index', { title: 'Express' });
});

// console.log('whats the valu of router right here', router);
// router.listen(8000, () => {
// console.log('http://localhost:8000');
// });
module.exports = router;
