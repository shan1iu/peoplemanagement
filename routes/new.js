var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var teacher = require('../models/teacherModel');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('new', {
		title: '信息修改/录入页面'
	});
});

router.post('/', function (req, res) {  
    var item = new teacher({
        name: req.body.name,
        age: req.body.age,
        loc: req.body.loc,
        year: req.body.year,
        sex: req.body.sex,
        marriage: req.body.marriage,
        pro: req.body.pro,
        edu: req.body.edu,
        qq: req.body.qq,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });
    item.save(function(err) {
        if(err) {
            console.log(err);
        }
    });
    res.redirect('/');
});

module.exports = router;
