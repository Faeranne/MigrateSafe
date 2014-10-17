(function() {
  var app, bodyParser, db, express, levelup;

  express = require('express');

  levelup = require('levelup');

  bodyParser = require('body-parser');

  db = require('./db');

  app = express();

  app.use(bodyParser());

  app.use(db);

  app.post('/hook', function(req, res) {
    var event;
    res.send(200, '{"message":"ok","result":"ok"}');
    if (!req.body.ref === "refs/heads/master") {
      return;
    }
    event = req.get('X-Github-Event');
    if (event = 'pull_request') {
      return request.newOrReset(req, res);
    } else if (event = 'pull_request_review_comment') {
      return request.checkForApprove(req, res);
    }
  });

  app.listen(process.env.PORT || 3000);

}).call(this);
