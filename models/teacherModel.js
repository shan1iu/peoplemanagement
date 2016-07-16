var mongoose = require('mongoose');
var teacherSchema = require('../schemas/teacherSchema');
var teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;