function NavigationCtrl($scope, $http, $location, navService) {
    $scope.currentTab = navService.getCurrentTab();
    $scope.$on('tab.update', function(event) {
        $scope.currentTab = navService.getCurrentTab();
    });
}
