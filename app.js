var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');
var teacher = require('./models/teacherModel');

mongoose.connect('mongodb://localhost/people');

var routes = require('./routes/index');
var users = require('./routes/users');
var newPage = require('./routes/new');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/new', newPage);
app.use('/search', search);


app.delete('/delete', function(req, res){
    var id = req.query.id;
    if(id) {
        teacher.remove({_id: id}, function(err, docs) {
            res.json({success: 1});
        })
    }
});

app.get('/update/:id', function(req, res){
    var id = req.params.id;
    if(id) {
        teacher.findById(id, function(err, teacher){
        if(err) {
            console.log(err);
        }   
        else {
            res.render('update', {
                teachers: teacher,
                title: '修改页面 点击按钮提交'
            });
            console.log(teacher);
        }
    });
    }
});

app.post('/update', function(req, res){
    var id = req.body.id;
    console.log(req.body);
    var _name = req.body.name;
    var _age = req.body.age;
    var _loc = req.body.loc;
    var _year = req.body.year;
    var _qq = req.body.qq;
    var _phone = req.body.phone;
    var _email = req.body.email;
    var _address = req.body.address;
    var _teacher;
    teacher.findById(id, function(err, teachers) {
        if (err) {
            console.log(err);
        }
        teachers.name = _name;
        teachers.age = _age;
        teachers.loc = _loc;
        teachers.year = _year;
        teachers.qq = _qq;
        teachers.phone = _phone;
        teachers.email = _email;
        teachers.address = _address;
        teachers.save(function (err) {
            if (err) 
                console.log(err);
        });
    });
    res.redirect('/');
});

app.get('/searchResult', function(req, res) {
    var queryName = req.query.name;
    var querySex = req.query.sex;
    var queryMarriage = req.query.marriage;
    var queryPro = req.query.pro;
    var queryEdu = req.query.edu;
    console.log("姓名="+queryName);
    console.log("性别="+querySex);
    console.log("婚姻="+queryMarriage);
    console.log("职位="+queryPro);
    console.log("学历="+queryEdu);

    var nameReg = new RegExp(queryName);
    if(queryName != undefined) {
        teacher.findByName(nameReg, function(err, teachers){
            if(err) {
                console.log(err);
            } else {
                res.send(teachers);
            }
        });
        return;
    }
    if(querySex != undefined) {
        teacher.findBySex(querySex, function(err, teachers){
            if(err) {
                console.log(err);
            } else {
                res.send(teachers);
            }
        });
        return;
    }
    if(queryMarriage != undefined) {
        teacher.findByMarriage(queryMarriage, function(err, teachers){
            if(err) {
                console.log(err);
            } else {
                res.send(teachers);
            }
        });
        return;
    }
    if(queryPro != undefined) {
        teacher.findByPro(queryPro, function(err, teachers){
            if(err) {
                console.log(err);
            } else {
                res.send(teachers);
            }
        });
        return;
    }
    if(queryEdu != undefined) {
        teacher.findByEdu(queryEdu, function(err, teachers){
            if(err) {
                console.log(err);
            } else {
                res.send(teachers);
            }
        });
        return;
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
