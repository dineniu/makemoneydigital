var mongoose = require('mongoose');

//Book Schema
var bookSchema = mongoose.Schema({
	title:{
		type:String,
		require:true
	},
	genre:{
		type:String,
		require:true
	},
	description:{
		type:String
	},
	author:{
		type:String,
		require:true
	},
	publisher:{
		type:String
	},
	pages:{
		type:String
	},
	img_url:{
		type:String
	},
	buy_url:{
		type:String
	},
	create_date:{
		type:Date,
		default:Date.now
	}
});

var Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = function(callback, limit){
	Book.find(callback).limit(limit);
};

module.exports.getBookById = function(id, callback){
	Book.findById(id,callback);
};