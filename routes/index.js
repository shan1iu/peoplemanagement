var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teacher = require('../models/teacherModel');
/* GET home page. */
router.get('/', function(req, res, next) {
	teacher.fetch(function(err, teacher){
		if(err) {
			console.log(err);
		}	
		else {
			res.render('index', { 
				title: '首页',
				teachers: teacher
			});	
		}
	});
});


module.exports = router;
