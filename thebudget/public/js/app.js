'use strict';

angular.module('budget', ['ngRoute','ngGrid']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/budgetItems', {templateUrl: 'views/budgetItems.html',   controller: BudgetItemListCtrl}).
      when('/transactions', {templateUrl: 'views/transactions.html', controller: TransactionListCtrl}).
      otherwise({redirectTo: '/transactions'});
}]);

console.log('configured');
