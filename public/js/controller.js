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

	// add an agent
	$scope.addAgent = function(req, res) {
		var date = getCurrentDate();
		$scope.agent['dateAdded'] 		= date
		$scope.agent['dateModified'] 	= date;
		$scope.agent['portalLink']		= 'https://' + $scope.agent.agentID + '.clutchinsurance.com/';

		// validate the link
		var lowerLink = $scope.agent.websiteLink;
		if (lowerLink.includes("https")) {
			$scope.agent.websiteLink = lowerLink.substring(8);
		} else if (lowerLink.includes("http")) {
			$scope.agent.websiteLink = lowerLink.substring(7);
		}

		// send a post request to the server
		$http.post('/agents', $scope.agent).success(function(res) {
			if(res == 'Id taken!!!') {
				$scope.invalid = true;
				$('#alertView').append('<div class="alert alert-danger myAlert"><button id="closeAlert1" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div align="center" style="color: #000;"><strong>Oops!!! ID is already taken!!!</strong> </div></div>');
				
				$('#addAgent').click(function() {
					$('.myAlert').remove();
				});

				$('#closeAlert1').click(function() {
					$('.myAlert').remove();
				});
			} else {
				$scope.invalid = false;
				$('#alertView').append('<div class="alert alert-success alert-dismissible myAlert" role="alert"><button id="closeAlert2" type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><div align="center" style="color: #000;"><strong>Agent has been added!!!</strong> </div></div>');

				$('#addAgent').click(function() {
					$('.myAlert').remove();
				});

				$('#closeAlert2').click(function() {
					$('.myAlert').remove();
				});

				$http.get('/agents').success(function(res) {
					$scope.agentList = res;
				});
			}
		});
	};

	// delete an agent
	$scope.deleteContact = function(_id) {
		$http.delete('/agents/' + _id).success(function(res) {
			$http.get('/agents').success(function(res) {
				$scope.agentList = res;
			});
		});	
	};

	// get agent info
	$scope.getEditContact = function(_id, editAgent) {
		$http.get('/agents/' + _id).success(function(res) {
			$scope.editAgent = res;
		});
	};


	// edit an agent
	$scope.editContact = function(_id) {
		var date = getCurrentDate();
		$scope.editAgent['dateModified'] = date;
		$scope.editAgent['portalLink']		= 'https://' + $scope.editAgent.agentID + '.clutchinsurance.com/';


		// validate the link
		var lowerLink = $scope.editAgent.websiteLink;
		if (lowerLink.includes("https")) {
			$scope.editAgent.websiteLink = lowerLink.substring(8);
		} else if (lowerLink.includes("http")) {
			$scope.editAgent.websiteLink = lowerLink.substring(7);
		}

		// send a put request to the server
		$http.put('/agents/' + _id, $scope.editAgent).success(function(res) {
			$http.get('/agents').success(function(res) {
				$scope.agentList = res;
			});
		})
	}

});