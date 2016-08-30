var mongoose = require('mongoose');
var fs = require('fs');
var Path = require('path');
var metadata = require('ffmetadata');
var musicPath = './static/albums' 
var db = mongoose.connect('mongodb://localhost/radio');
require('./models/song_model.js');
var Song = mongoose.model('Songs');
mongoose.Promise = global.Promise;
function addAlbums(albumsPath){
	fs.readdir(albumsPath, function(err, entries){
		var songsList = [];
		var coverlink;
		for(var idx in entries){
			var fullPath = Path.join(albumsPath, entries[idx]);
			(function(fullPath, songsList){
				var parsedPath = Path.parse(fullPath);
                fs.stat(fullPath, function(err, stats){
                    if(stats && stats.isFile()){
                        if(parsedPath.ext == '.mp3'){
                        	metadata.read(fullPath, function(err, data){
	                        	if(err) {
	                        		 console.log("error reading metadata:  " + err);
	                        	} else {
	                        		var song = new Song({
	                        			title: data.title,
	                        			artist: data.artist,
	                        			album: data.album,
	                        			filepath: fullPath
	                        		});
	                        		if(coverlink){
	                        			song.cover = coverlink
	                        		}else{
	                        			console.log('oops!');
	                        		}
	                        		song.save(function(err, results){
	                        			console.log("Saved! "+results);
	                        		})
	                        	}
	                        });
                        }else if(parsedPath.ext == '.jpg'){
                        	//strip the static, retreive it from the albums path.
                        	coverlink = fullPath;
                        }
                    }else if(stats && stats.isDirectory()){
                        addAlbums(fullPath);
                    }
                });
				
            })(fullPath, songsList);
		}
		
	});
}
function saveSongs(songsList, coverlink){
	console.log("songl: "+songsList.length);
	console.log("coverl: "+coverlink);
}
Song.remove().exec(function(){
	addAlbums(musicPath);
	// console.log(Path.parse(musicPath));
});