var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sample', (req, res, next) => {
  res.json({ foo: "bar", deploy: 2 });
});

module.exports = router;
