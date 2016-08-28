var mongoose = require('mongoose'),
	url = require('url'),
	Songs = mongoose.model('Songs');
exports.getSongIds = function(req, res){
	Songs.find().select({_id:1}).exec(function(err, songIds){
		if(err || songIds.length < 1){
			res.json(404, {msg:"Songs not Found."});
		} else {
			res.json(songIds);
		}
	});
}
exports.getSong = function(req, res){
	var query = url.parse(req.url, true).query;
	Songs.findOne({_id:query.id}).exec(function(err, song){
		if(!song){
			res.json(404, {msg:"Song not Found."});
		} else {
			res.json(song);
		}
	});
}