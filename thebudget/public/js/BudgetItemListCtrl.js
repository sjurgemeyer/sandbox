function BudgetItemListCtrl($scope, $http, $location) {
    $http.get('viewBudgetItems').success(function(data) {
        $scope.budgetItems = data
    });
    var cellEditableTemplate = "<input ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-model=\"COL_FIELD\" ng-blur=\"onBudgetItemChange(col, row)\"/>";
    var transactionLinkTemplate = "<div class=\"ngCellText\" ng-class=\"col.colIndex()\"><span ng-cell-text>" +
    "<button ng-click=\"viewTransactions(col, row)\" class=\"btn-xs btn-default\">View Transactions</button></a></span></div>";
    var deleteTemplate = "<div><button ng-click=\"deleteBudgetItem(col, row)\" class=\"btn-xs btn-default\">Delete</button></div>";
    $scope.handleSubmit = function(budgetItem) {
        if (window.event) {
            key = window.event.keyCode;
        } else if (e) {
            key = e.which;
        }
        if (key == 13) {
            console.log(budgetItem);
            $http.post('updateBudgetItem/' + budgetItem._id, JSON.stringify(budgetItem));
        }
    }
    $scope.gridOptions = {
        data: 'budgetItems',
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        showFilter:true,
        columnDefs: [
            {field:'_id', displayName:'', enableCellSelection: false, enableCellEdit: false, cellTemplate: deleteTemplate},
            {field: 'month', displayName: 'Month', editableCellTemplate: cellEditableTemplate},
            {field:'category', displayName:'Category', editableCellTemplate: cellEditableTemplate},
            {field:'amount', displayName:'amount', editableCellTemplate: cellEditableTemplate},
            {field:'memo', displayName:'Memo', editableCellTemplate: cellEditableTemplate},
            {field:'category', displayName:'transactions', enableCellEdit: false, cellTemplate: transactionLinkTemplate},
        ]
    };
    $scope.onBudgetItemChange = function(column, row) {
        var budgetItem = row.entity
            //TODO display something when post fails
        console.log(budgetItem)
        if (budgetItem._id) {
            $http.post('updateBudgetItem/' + budgetItem._id, JSON.stringify(budgetItem)).success(function(data) {
                updateEntity(data, budgetItem);
            });
        } else {
            $http.post('addBudgetItem', JSON.stringify(budgetItem)).success(function(data) {
                updateEntity(data, budgetItem);
            });
        }
    };
    $scope.addBudgetItem = function() {
        $scope.budgetItems.unshift({});
    }

    $scope.viewTransactions = function(column, row) {
        var entity = row.entity
        $location.url("/transactions?category=" + entity.category);
    }

    $scope.deleteBudgetItem = function(column, row) {
        var idx = $scope.budgetItems.indexOf(row.entity)
        $scope.budgetItems.splice(idx, 1)
        $http.delete('budgetItem/' + row.entity._id).success(function(data) {

        });
    }
    function updateEntity(responseData, entity) {
        for (d in responseData) {
            entity[d] = responseData[d];
        }
        console.log('updating entity');
        console.log(entity);
    }
}
