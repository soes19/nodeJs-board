var express = require('express');
var router = express.Router();
var config = require('../myModules/config');
var readData = require('../myModules/readData');
var writeData = require('../myModules/writeData');

var MongoClient = require('mongodb').MongoClient
     , assert = require('assert');
// Connection URL
var url = 'mongodb://localhost:27017/project_todo';
// Use connect method to connect to the server

var dbUrl = config.dbUrl();
router.get('/', function(req, res, next) {
 MongoClient.connect(dbUrl, function(err,db){
    readData(db, function(err, data){
      assert.equal(err, null);
      db.close();
      res.render('index', {todo:data});
    });
  });
});

router.post('/task-register', function(req, res) {
  var date = new Date();
  var title = req.body.title;
  var writer = req.body.writer;
  var contents = req.body.contents;
  var obj = {"title":title, "writer":writer, "task":contents, "date":date};
  /* Mongo DB */
  MongoClient.connect(dbUrl, function(err,db) {
    writeData(db, obj, function(err, result){
      assert.equal(null, err);
      assert.equal(1, result.insertedCount);
      db.close();
      res.redirect('/');
    })
  });
});
module.exports = router;
