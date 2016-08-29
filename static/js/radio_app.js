var app = angular.module('radio',[])
app.controller('songController',['$scope', '$http', '$document', function($scope, $http, $document){
	$scope.title = "megamixメガミックス";
	$scope.play = function(){
		$document.find("audio")[0].play();
	}
	$scope.pause = function(){
		$document.find('audio')[0].pause();
	}
}]);	