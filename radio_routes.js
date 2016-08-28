var mongoose = require('mongoose');
module.exports = function(server){
	var songs = require('./controllers/songs_controller');
	app.use('/static', express.static('./static')).
		use('/images', express.static('./static/images'));
	app.get('/', function(req, res){
		res.render('radio');
	});
	app.get('/song/get', songs.getSong());
}