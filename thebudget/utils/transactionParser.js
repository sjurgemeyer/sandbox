function parseTransactions(lines) {
    var allTransactions = []
    var currentTransaction
    for (var i=0; i<lines.length; i++) {
        var line = lines[i].trim();
        if (line == '<STMTTRN>') {
            currentTransaction = {type:'transaction'}
        }
        setElt(currentTransaction, line, 'TRNTYPE', 'transactionType');
        setElt(currentTransaction, line, 'DTPOSTED', 'datePosted');
        setElt(currentTransaction, line, 'TRNAMT', 'amount');
        setElt(currentTransaction, line, 'FITID', 'bankId');
        setElt(currentTransaction, line, 'NAME', 'name');
        setElt(currentTransaction, line, 'MEMO', 'memo');
        if (line == '</STMTTRN>') {
            //Cheesey work around for typed fields
            currentTransaction.amount = parseFloat(currentTransaction.amount);
            currentTransaction.datePosted = parseDate(currentTransaction.datePosted);
            allTransactions.push(currentTransaction);
        }
    }
    console.log(allTransactions);
    return allTransactions
}

function parseDate(date) {
    var year = date.substring(0,4);
    var month = date.substring(4,6);
    var day = date.substring(6,8);
    return new Date(year, month, day);
}
function setElt(obj, line, eltName, objEltName) {
    if (line.indexOf('<' + eltName + '>') == 0) {
        obj[objEltName] = line.substring(('<' + eltName + '>').length);
    }
}
