var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var SongSchema = new Schema({
	title: String,
	filepath: String,
	cover: String,
	links: {
		url: String,
		bandcamp: String,
		soundcloud: String
	}
});
mongoose.model('Song', SongSchema);