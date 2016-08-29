var app = angular.module('radio',[])
app.controller('songController',['$scope', '$http', '$document', function($scope, $http, $document){
	$scope.title = "メガミックスのWAVESTATION";
	$scope.play = function(){
		//Bit of a crappy way to select DOM elements. perhaps getting a jQuery elem instead of jqLite...
		$document.find("audio")[0].play();
	}
	$scope.pause = function(){
		$document.find('audio')[0].pause();
	}
}]);	