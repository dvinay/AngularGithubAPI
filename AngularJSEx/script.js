// Code goes here
(function() {

    angular
        .module("githubViewer", [])
        .controller("MainController", MainController);

    MainController.$inject = ["$scope","$http","$interval","$log","$anchorScroll","$location"];

    function MainController($scope,$http,$interval,$log,$anchorScroll,$location) {
    	var onUserComplete = function(response) {
    		$scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos,onError);
    	};

        var onRepos = function(response) {
            $scope.repos = response.data;
            $location.hash("userDetails");
            $anchorScroll();
        };

    	var onError = function(reason) {
    		$scope.error = 'Could not fetch the user';
    	};

        var decrementCountdown = function() {
            $scope.countdown -=1;
            if($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdownInterval = null;
        var startCountdown = function() {
            countdownInterval = $interval(decrementCountdown,1000,$scope.countdown)
        }

        $scope.search = function(username) {
            $log.info("searching for "+username);
            $http.get("https://api.github.com/users/"+username)
                .then(onUserComplete,onError);
            if(countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            //console.log("https://api.github.com/users/"+$scope.username);
        }

        $scope.username = "angular";
        $scope.message = "Github Viewer";
        $scope.repoSortOrder = "-name";
        $scope.countdown = 5;
        startCountdown();
    }

})();