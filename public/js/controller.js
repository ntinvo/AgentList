var app = angular.module('agentlistApp', []);

app.controller('mainCtrl', function($scope, $http) {

	$scope.addAgent = function(req, res) {
		var  h  = $scope.req;
		var a = JSON.stringify(h);
		console.log(a);
	};

});