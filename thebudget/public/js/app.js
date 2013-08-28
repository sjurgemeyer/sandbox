'use strict';

var budget = angular.module('budget', ['ngRoute','ngGrid']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/budgetItems', {templateUrl: 'views/budgetItems.html',   controller: BudgetItemListCtrl}).
      when('/transactions', {templateUrl: 'views/transactions.html', controller: TransactionListCtrl}).
      otherwise({redirectTo: '/transactions'});
}]);
budget.factory('navService', function($rootScope) {
    var currentTab = 'transactions';
    return {
      getCurrentTab: function() {
         return currentTab
      },
      setCurrentTab: function(newTab) {
          console.log(newTab);
          currentTab = newTab
          $rootScope.$broadcast( 'tab.update' );
      }
   }
});
//budget.directive('navBar', function factory(navService) {
  //var directiveDefinitionObject = {
    //priority: 0,
    ////templateUrl: 'views/navbar.html',
    //replace: false,
    //transclude: false,
    //restrict: 'A',
    //scope: false,
    ////controller: function($scope, $element, $attrs, $transclude, otherInjectables) {  },
    ////require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
    //compile: function compile(tElement, tAttrs, transclude) {
      //return {
        //pre: function preLink(scope, iElement, iAttrs, controller) {  },
        //post: function postLink(scope, iElement, iAttrs, controller) { 
            //console.log(iAttrs.navBar);
            //console.log(navService.getCurrentTab())
            //if(navService.getCurrentTab() == iAttrs.navBar) {
                //iElement.addClass('active');
            //} else {
                //iElement.removeClass('active');
            //}

            //return iElement;
        //}
      //}
    //}
  //};
  //return directiveDefinitionObject;
//});
