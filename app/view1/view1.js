'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as $ctrl'
  });
}])

.controller('View1Ctrl', ["$http", function($http) {
    let self = this;

    self.list = [];

    $http.get("/babysitters").then(function(results) {
        self.list = results.data;
    });

}]);