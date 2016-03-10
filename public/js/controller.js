var app = angular.module('agentlistApp', ['angularUtils.directives.dirPagination']);


// get today's date
function getCurrentDate() {
	var today 	= new Date();
	var date 	= today.getDate();
	var month 	= today.getMonth() + 1;
	var year 	= today.getFullYear();
	if(date < 10) 
	    date = '0' + date
	if(month < 10)
	    month = '0' + month
	return String(month + '/' + date + '/' + year);
}


app.controller('mainCtrl', function($scope, $http) {


	// send GET request to the server
	$http.get('/agents').success(function(res) {
		$scope.agentList = res;
	});



	$scope.addAgent = function(req, res) {
		var date = getCurrentDate();
		$scope.agent['dateAdded'] 		= date
		$scope.agent['dateModified'] 	= date;
		$scope.agent['portalLink']		= 'https://' + $scope.agent.agentID + '.clutchinsurance.com/';

		// send a post request to the server
		$http.post('/agents', $scope.agent).success(function(res) {
			if(res == 'Id taken!!!') {
				$scope.invalid = true;
			} else {
				$scope.invalid = false;
				$http.get('/agents').success(function(res) {
					$scope.agentList = res;
				});
			}
		});
	};

});