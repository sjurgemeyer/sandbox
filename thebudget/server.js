var express = require('express');
var app = express();
var path = require('path');

var transactions = require('./routes/transactions.js')
var budgetItems = require('./routes/budgetItems.js')

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.bodyParser());

app.get('/parse', transactions.parse);
app.get('/viewTransactions', transactions.view);
app.get('/viewTransactions/:category', transactions.view);
app.post('/updateTransaction/:transactionId', transactions.update);

app.get('/viewBudgetItems', budgetItems.view);
app.post('/updateBudgetItem/:budgetItemId', budgetItems.update);
app.post('/addBudgetItem', budgetItems.add);
app.delete('/budgetItem/:budgetItemId', budgetItems.delete);

app.get('/', function(req, res) {
    res.render('index.html');
});

app.listen(8071);
