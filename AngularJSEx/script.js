// Code goes here
(function() {

    angular
        .module("appName", [])
        .controller("MainController", MainController);

    MainController.$inject = ["$scope","$http"];

    function MainController($scope,$http) {
    	var onUserComplete = function(response) {
    		$scope.user = response.data;
    	};

    	var onError = function(reason) {
    		$scope.error = 'Could not fetch the user';
    	}

    	$http.get("https://api.github.com/users/dvinay")
    		.then(onUserComplete,onError);

        $scope.message = "Hello Angular!";
    }

})();