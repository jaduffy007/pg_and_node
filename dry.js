"use strict"

var pg = require('pg');

var db = {};
db.config = {
    database: "library_example_app",
    port: 5432,
    host: "localhost"
};

db.connect = function(buzzer) {
  pg.connect(db.config, function(err, client, done){
      if (err) {
           console.error("OOOPS!!! SOMETHING WENT WRONG!", err);
      }
      buzzer(client);
      done();
  });
};

db.query = function(statement, params, anotherBuzzer){
  db.connect(function(client){
    client.query(statement, params, anotherBuzzer);
  });
};

db.query("SELECT * FROM books;",[], function(err, resultSet){
    if (err) console.log("SELECT FAILED :-(", err);
    console.log(resultSet.rows);
});

db.query("INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
["The Great Gatsby", "Fitzgerald"], function(err, resultSet){
  if (err) console.log("INSERT FAILED :-(", err);
});

// Excercise: add UPDATE and DELETE calls
db.query("DELETE from books WHERE author = $1;",["Fitzgerald"],
  function(err,resultSet){
    if (err) console.log ("Deletion failed :-(", err);
      console.log(resultSet.rows);
}

db.query("UPDATE books SET author = $1 WHERE title =$2;",["Bart","The Taker"],
  function(err,resultSet){
    if (err) console.log ("Update failed :-(", err);
      console.log(resultSet.rows);
}

pg.end();
