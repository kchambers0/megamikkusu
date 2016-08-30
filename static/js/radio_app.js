var app = angular.module('radio',[])
app.controller('songController',['$scope', '$http', '$document', '$interval', function($scope, $http, $document, $interval){
	$scope.title = "メガミックスのWAVESTATION";
	$scope.track = '';
	$scope.name = "Coming Up...";
	$scope.artist = "Some music";
	$scope.album = "the radio";
	$scope.playing = false;
	$scope.cover = '';
	$scope.clock = {
		min:0,
		sec:0
	}
	$scope.tracklisting= {
		upnext:[],
		played:[]
	};
	$http.get('/song/getIds').success(function(data, status, headers, config){
		$scope.tracklisting.upnext = data;
		$scope.next();
	}).error(function(data, status, headers, config){
		console.log("Couldn't connect??");
	});
	function loadTrack(trackId){
		$http.get('/song/get?id='+trackId).success(function(data, status, headers, config){
			$scope.name = data.title;
			$scope.artist = data.artist;
			$scope.album = data.album;
			$scope.track = data.filepath;
			$scope.cover = data.cover;

			$scope.playing = true;
			$scope.clock = {
				min:0,
				sec:0
			}
			console.log($scope.cover);
			//console.log($scope.track);
		}).error(function(data, status, headers, config){
			console.log("Couldn't find the song??");
		});
	}
	$interval(function(){
		if($scope.playing){
			if($scope.clock.sec < 59){
				$scope.clock.sec++;
			} else {
				$scope.clock.min++;
				$scope.clock.sec = 0;
			}
		}
	},1000)
	$scope.next = function(){
		$scope.tracklisting.played=$scope.tracklisting.upnext.splice(Math.floor(Math.random()*$scope.tracklisting.upnext.length),1).concat($scope.tracklisting.played);
		loadTrack($scope.tracklisting.played[0]._id);
	}
	$scope.play = function(){
		$document.find("audio")[0].play();
		$scope.playing = true;
	}
	$scope.pause = function(){
		$document.find('audio')[0].pause();
		$scope.playing = false;
	}
	$document.find('audio').on('ended',function(){
		$scope.next();
	});
}]);	