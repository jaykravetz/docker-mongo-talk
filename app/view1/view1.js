'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl as $ctrl'
  });
}])

.controller('View1Ctrl', ["$http", function($http) {
    var self = this;

    self.list = [];
    self.alerts = [];
    
    $http.get("/babysitters").then(function(results) {
        self.list = results.data;
    });

    self.delete = function(id) {
      var deleted = _.findIndex(self.list, function(item) {
        return item._id === id;
      });

      self.list.splice(deleted, 1);

      self.alerts.push({
        msg: "Deleted",
        setTimeout: 2000,
        type: "info"
      });
    };

    self.closeAlert = function(index) {
      self.alerts.splice(index, 1);
    };

}]);