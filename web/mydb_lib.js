"use strict"

var pg = require('pg');

function DB(database, port, host) {
  this.config = {
    database: database,
    port: port,
    host: host
  };
}

DB.prototype.connect = function(callback){
  pg.connect(this.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      callback(client);
      // console.log(client);
      done();
  });
};

DB.prototype.query = function(statement, params, anotherCallback){
  this.connect(function(client){
    client.query(statement, params, anotherCallback);
  });
};

DB.prototype.end = function(){
 pg.end();
};

module.exports = DB;