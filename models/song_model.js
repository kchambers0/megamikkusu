var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var SongSchema = new Schema({
	title: String,
	artist: String,
	album: String,
	filepath: String,
	cover: String,
	links: {
		url: {type:String, default:"/"},
		bandcamp: {type:String, default:"http://bandcamp.com/"},
		soundcloud: {type:String, default:"http://soundcloud.com"},
		facebook: {type:String, default:"http://facebook.com"},
		twitter: {type:String, default:"http://twitter.com"}
	}
});
mongoose.model('Songs', SongSchema);