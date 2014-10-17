(function() {
  var db, levelup;

  levelup = require('levelup');

  db = levelup('./db');

  module.exports = function(req, res, next) {
    req._db = db;
    return next();
  };

}).call(this);
