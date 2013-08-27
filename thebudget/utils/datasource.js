var cradle = require('cradle');
exports.connect = connect
exports.handleSave = function(err, couch_res) {
      var response = '';
      if (err) {
          console.log('SAVE ERROR: Could not save record!!');
      } else {
          console.log('SUCESSFUL SAVE');
      }
}

exports.logOldAndNewState = function(id, newState) {
    connect().get(id, function(err, doc) {
        console.log('current state');
        console.log(doc);
    });
    console.log('new state');
    console.dir(newState);
}


exports.logCouchResponse = function(couch_res) {
    connect().get(couch_res.id, function(err, doc) {
        console.log(doc);
    });
}
exports.values = function(viewName, options, callback) {
    var db = connect();
    db.view(viewName, options, function (err, docs) {
        if (err) {
            console.log(err);
            res.end(err);
            return
        }
        var items = []
        for (var i=0; i<docs.length; i++) {
            items.push(docs[i].value);
        }
        callback(items);
    });
}
function connect() {
  var connection = new(cradle.Connection)('http://127.0.0.1', 5984, {
      //auth: { username: '', password: '' }
  });

  return connection.database('budget');
}

