(function() {
  var checkForApprove, newOrReset, request;

  request = require('request');

  newOrReset = function(req, res) {
    return request(req.body.commits_url, function(err, data) {
      data = JSON.parse(data);
      return request(data.parents[0].url, function(err, data) {
        var file, files, folder, migrate, paths, _i, _j, _len, _len1;
        data = JSON.parse(data);
        files = data.files;
        migrate = false;
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          paths = file.split('/');
          for (_j = 0, _len1 = paths.length; _j < _len1; _j++) {
            folder = paths[_j];
            if (folder === 'migrations') {
              migrate = true;
            }
          }
        }
        if (migrate) {
          return req._db.put('pr-' + req.body.id, 0, function(err) {
            if (err) {
              return console.err('levelup-error: ' + err);
            }
          });
        }
      });
    });
  };

  checkForApprove = function(req, res) {
    var id, username;
    id = req.body.pull_request.id;
    username = req.body.comment.user.login;
    return req._db.get('pr-' + id, function(err, value) {
      if (err) {
        return;
      }
      return request(req.body.pull_request.head.repo.contributors_url, function(err, data) {
        var user, _i, _len;
        data = JSON.parse(data);
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          user = data[_i];
          if (user.login === username) {
            req._db.put('pr-' + req.body.id, value++);
            return;
          }
        }
      });
    });
  };

}).call(this);
