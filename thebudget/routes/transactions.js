var fs = require('fs');
var transactionParser = require('../utils/transactionParser');
var datasource = require('../utils/datasource.js');

exports.parse = function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    fs.readFile('/Users/sjurgemeyer/Downloads/Checking2.qfx', 'utf8', function(err, data) {
        //if (err) throw err;
        var lines = data.split('\n')
        var transactions = parseTransactions(lines)
        var db = datasource.connect();
        for(var i=0; i<transactions.length; i++) {
            var transaction = transactions[i];
            db.save(getKey(transaction), transaction, datasource.handleSave);
        }
        res.end(JSON.stringify(transactions));
    });
};
exports.view = function(req, res) {
    var category = req.params.category;
    console.log(req.params);
    console.log(req.headers);
    console.log(category);
    if (category) {
        datasource.values('basicViews/transactionsByCategory', {'descending':true, 'key':category}, function (allTransactions) {
            res.end(JSON.stringify(allTransactions))
        });
    } else {
        datasource.values('basicViews/allTransactions', {'descending':true}, function (allTransactions) {
            res.end(JSON.stringify(allTransactions))
        });
    }
};
exports.update = function(req, res) {
    console.log('updating transactionId' + req.params.transactionId);
    console.dir(req.body)

    var db = datasource.connect();
    db.save(req.params.transactionId, req.body, datasource.handleSave);
    res.end();
};

function getKey(transaction) {
    return 'TRANSACTION_' + transaction.bankId
}

