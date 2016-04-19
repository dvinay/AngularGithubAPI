// Code goes here
(function() {

    angular
        .module("githubViewer", [])
        .controller("MainController", MainController);

    MainController.$inject = ["$scope","$http"];

    function MainController($scope,$http) {
    	var onUserComplete = function(response) {
    		$scope.user = response.data;
            $http.get($scope.user.repos_url)
                .then(onRepos,onError);
    	};

        var onRepos = function(response) {
            $scope.repos = response.data;
        };

    	var onError = function(reason) {
    		$scope.error = 'Could not fetch the user';
    	}

        $scope.search = function(username) {
            $http.get("https://api.github.com/users/"+username)
                .then(onUserComplete,onError);
            console.log("https://api.github.com/users/"+$scope.username);
        }

        $scope.username = "angular";
        $scope.message = "Github Viewer";
        $scope.repoSortOrder = "-name";
    }

})();