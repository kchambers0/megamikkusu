var express = require('express');
module.exports = function(server){
	var songs = require('./controllers/songs_controller');
	server.use('/static', express.static('./static')).
		use('/images', express.static('./static/images')).
		use('/music', express.static('../../../Music/iTunes/iTunes\ Media/Music'));
	server.get('/', function(req, res){
		res.render('radio');
	});
	server.get('/song/getIds', songs.getSongIds);
	server.get('/song/get', songs.getSong);
}