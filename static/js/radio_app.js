var app = angular.module('radio',[])
app.controller('songController',['$scope', '$http', '$document', function($scope, $http, $document){
	$scope.title = "メガミックスのWAVESTATION";
	$scope.track = '/albums/t e l e p a t h テレパシー能力者 - 未来へ/t e l e p a t h テレパシー能力者 - 未来へ - 04 あなただけ.mp3';
	$scope.name = "Coming Up...";
	$scope.artist = "Some music";
	$scope.album = "the radio";
	$scope.cover = '';
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
			console.log($scope.cover);
			//console.log($scope.track);

			$document.find('audio source')[0].src = $scope.track;
			$document.find('audio')[0].load();
		}).error(function(data, status, headers, config){
			console.log("Couldn't find the song??");
		});
	}
	$scope.next = function(){
		$scope.tracklisting.played=$scope.tracklisting.upnext.splice(Math.floor(Math.random()*$scope.tracklisting.upnext.length),1).concat($scope.tracklisting.played);
		loadTrack($scope.tracklisting.played[0]._id);
	}
	$scope.play = function(){
		$document.find("audio")[0].play();
	}
	$scope.pause = function(){
		$document.find('audio')[0].pause();
	}
	$document.find('audio').on('ended',function(){
		console.log('audio done');
	});
}]);	