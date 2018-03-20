var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
/*-----------------------------------------------------*/
// Connect to the Database
var connection = mysql.createConnection({
  host: 'fling.seas.upenn.edu',
  user: 'kuangda',
  password: 'kwbJqcvxrN9Nx',
  database: "kuangda"
});

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
/*-----------------------------------------------------*/
// Application configuration set
app.set('port', (process.env.PORT || 5000));
// var pug = require('pug');
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
/*-----------------------------------------------------*/
// Router
// HTML pages in views
// java script in public/javascript
app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/views', 'firstPage.html'));
});
app.get('/searchBox.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public', 'searchBox.js'));
});
app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
//npm start
// TODO： when to end the connection?
// connection.end(function (err) {
//   // The connection is terminated now
//   console.log("Connection close");
// });
