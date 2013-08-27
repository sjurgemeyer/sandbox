var datasource = require('../utils/datasource.js');

exports.view = function(req, res) {
    datasource.values('basicViews/allBudgetItems', {'descending':true}, function (budgetItems) {
        res.end(JSON.stringify(budgetItems))
    });
};
exports.update = function(req, res) {
    console.log('updating budgetItemId' + req.params.budgetItemId);
    console.dir(req.body);

    var db = datasource.connect();
    db.save(req.params.budgetItemId, req.body, function(err, couch_res) {
        if (err) {
            console.log('SAVE ERROR: Could not save record!!');
            datasource.logOldAndNewState(req.params.budgetItemId, req.body);
        } else {
            console.log('SUCESSFUL SAVE');
            console.log(couch_res);
            db.get(couch_res.id, function(err, doc) {
               console.log(doc);
               res.end(JSON.stringify(doc));
            });
        }});



};
exports.delete = function(req, res) {
    //TODO, super dangerous since any id is accepted
    var db = datasource.connect();
    console.log('Deleting ' + req.params.budgetItemId);
    db.remove(req.params.budgetItemId, function (err, res) {
        if (err) {
            console.log('SAVE ERROR!');
        } else {
            console.log('SUCCESS');
        }
  });
}

exports.add = function(req, res) {
    console.log('adding budget item' );
    var item = req.body;
    item.type = 'budgetItem';
    console.dir(item);

    var db = datasource.connect();
    db.save(item, function(err, couch_res) {
        if (err) {
            console.log('SAVE ERROR: Could not save record!!');
            res.end();
        } else {
            console.log('SUCESSFUL SAVE');
            db.get(couch_res.id, function(err, doc) {
               console.log(doc);
               res.end(JSON.stringify(doc));   
            });
        }
    });
}
