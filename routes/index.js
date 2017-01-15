var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var config = require('../myModules/config');

var todoSchema = mongoose.Schema({
  title:String,
  date:String,
  writer:String,
  task:String,
});
var todo = mongoose.model("todo", todoSchema, 'test');

Date.prototype.yyyymmdd = function()
{
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return yyyy +"."+ (mm[1] ? mm : '0'+mm[0]) +"."+ (dd[1] ? dd : '0'+dd[0]);
}

mongoose.connect(config.dbUrl());
router.get('/list', function(req, res, next) {
  todo.find({},function(err, docs){
    console.log(docs);
    res.render('index', {todo:docs});
  });
});

router.get('/', function(req, res, next) {
  res.redirect('/list');
});

router.get('/write', function(req, res, next) {
  res.render('write');
});

router.get('/detail', function(req, res, next) {
	 var contentId = req.param('id');
    todo.findOne({_id:contentId}, function(err, rawContent){
        if(err) throw err;
         
		res.render('detail',{todo:rawContent}); // db에서 가져온 내용을 뷰로 렌더링
    })
});

router.post('/task-register', function(req, res) {
  var date = (new Date()).yyyymmdd();
  var title = req.body.title;
  var writer = req.body.writer;
  var contents = req.body.contents;
  var obj = {"title":title, "writer":writer, "task":contents, "date":date};
  var task = new todo(obj);
  task.save(function(err){
    if(err) console.log(err);
    res.redirect('/');
  });
});
module.exports = router;
