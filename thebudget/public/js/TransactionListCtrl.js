function TransactionListCtrl($scope, $http, $location) {
    var dataUrl = 'viewTransactions';
    var category = ($location.search()).category;
    if (category) {
        dataUrl = dataUrl + '/' + category;
    }
    console.log(dataUrl);
    $http.get(dataUrl).success(function(data) {
        $scope.transactions = data
    });
    var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-blur=\"onTransactionChange(col, row)\"/>"
    $scope.handleSubmit = function(transaction) {
        if (window.event) {
            key = window.event.keyCode;
        } else if (e) {
            key = e.which;
        }
        if (key == 13) {
            console.log(transaction);
            $http.post('updateTransaction/' + transaction._id, JSON.stringify(transaction));
        }
    }
    $scope.gridOptions = {
        data: 'transactions',
        enableCellSelection: true,
        enableRowSelection: false,
        showFilter:true,
        columnDefs: [{field: 'datePosted', displayName: 'Date'},
                     {field:'amount', displayName:'Amount'},
                     {field:'name', displayName:'Name'},
                     {field:'memo', displayName:'Memo', enableCellEdit: false},
                     {field:'category',
                      enableCellEdit: true,
                      displayName:'Category',
                      editableCellTemplate: cellEditableTemplate}
        ]
    };
    $scope.onTransactionChange = function(column, row) {
        var transaction = row.entity
            //TODO display something when post fails
        $http.post('updateTransaction/' + transaction._id, JSON.stringify(transaction));
    };
};
