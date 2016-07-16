var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
	name: String,
	sex: Boolean,
	age: Number,
	pro: String,
	edu: String,
	loc: String,
	year: Number,
	marriage: Boolean,
	qq: String,
	phone: String,
	email: String,
	address: String 
});

teacherSchema.pre('save', function(next){
	next();
});

teacherSchema.statics = {
	fetch: function(cb) {
		return this.find({}).exec(cb)
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb)
	},
	findByName: function(name, cb){
		return this.where({name:name}).exec(cb);
	},
    findBySex: function(sex, cb){
        return this.where({sex:sex}).exec(cb);
    },
    findByMarriage: function(marriage, cb){
        return this.where({marriage:marriage}).exec(cb);
    },
    findByPro: function(pro, cb){
        return this.where({pro:pro}).exec(cb);
    },
    findByEdu: function(edu, cb){
        return this.where({edu:edu}).exec(cb);
    }
};

module.exports = teacherSchema;