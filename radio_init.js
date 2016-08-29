var mongoose = require('mongoose');
var fs = require('fs');
var Path = require('path');
var metadata = require('ffmetadata');
var musicPath = '../../../Music/iTunes/iTunes\ Media/Music/' 
var db = mongoose.connect('mongodb://localhost/radio');
require('./models/song_model.js');
var Songs = mongoose.model('Songs');
mongoose.Promise = global.Promise;
function addAlbum(albumPath){
	fs.readdir(albumPath, function(err, entries){
		for(var idx in entries){
			var fullPath = Path.join(albumPath, entries[idx]);
			//console.log(entries[idx]);
			(function(fullPath){
                fs.stat(fullPath, function(err, stats){
                    if(stats && stats.isFile()){
                        console.log(fullPath);
                        console.log(Path.parse(fullPath));
                        if(Path.parse(fullPath).ext == '.mp3'){
                        	metadata.read(fullPath, function(err, data){
	                        	if(err) {
	                        		console.log("error reading metadata:  " + err);
	                        	} else {
	                        		console.log(data);
	                        	}
	                        });
                        }
                    }else if(stats && stats.isDirectory()){
                        addAlbum(fullPath);
                        //console.log(stats)
                    }
                });
            })(fullPath);
		}
	});
}
Songs.remove().exec(function(){
	addAlbum(musicPath + 't e l e p a t h テレパシー能力者/');
});