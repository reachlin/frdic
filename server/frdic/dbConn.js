var ObjectID = require('mongodb').ObjectID;
var https = require('https');
var http = require('http');

DBConnection = function(db) {
  this.db = db;
};

DBConnection.prototype.getCollection = function(collectionName, callback) {
  this.db.collection(collectionName, function(error, the_collection) {
    if( error ) callback(error);
    else callback(null, the_collection);
  });
};

DBConnection.prototype.findAll = function(collectionName, callback) {
    this.getCollection(collectionName, function(error, the_collection) {
      if( error ) callback(error);
      else {
        the_collection.find().sort({created_at: -1}).toArray(function(error, results) {
          if( error ) callback(error);
          else callback(null, results);
        });
      }
    });
};

//save new object
DBConnection.prototype.save = function(collectionName, obj, callback) {
    this.getCollection(collectionName, function(error, the_collection) { //A
      if( error ) callback(error)
      else {
        obj.created_at = new Date(); //B
        the_collection.insert(obj, function() { //C
          callback(null, obj);
        });
      }
    });
};

exports.DBConnection = DBConnection;
