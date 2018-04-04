var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
/*-----------------------------------------------------*/
// Connect to the Database
var connection = mysql.createConnection({
  host: 'cis550project.cpqrgrawy8bo.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'cis550project',
  password: 'wyuVj[x^e.x9i',
  database: "cis550fp"
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
  response.sendFile(path.join(__dirname, '/views', 'firstpage.html'));
});
app.get('/app.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/javascripts', 'app.js'));
});

app.get('/universitylist',function(request, response) {
  response.sendFile(path.join(__dirname, '/views','secondpage.html'));
});

app.get('/universitylist/:sat/:upperLimit/:lowerLimit', function(request,response){
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'cis550project.cpqrgrawy8bo.us-east-2.rds.amazonaws.com',
    port: 3306,
    user: 'cis550project',
    password: 'wyuVj[x^e.x9i',
    database: "cis550fp"
  });
  var sat=request.params.sat
  var upperLimit=request.params.upperLimit
  var lowerLimit=request.params.lowerLimit
  var query= "SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url FROM cis550fp.University NATURAL JOIN cis550fp.Admission WHERE sat_avg <="+sat+" AND rank <="+lowerLimit+" AND rank >="+upperLimit+" order by rank ASC;";   
  connection.connect(function(err){
  if (err) throw err;
  //if (sat!='undefined' & upperLimit!='undefined' & lowerLimit!='undefined')
    connection.query(query, function (err, result, fields) {
    if (err) throw err;
    response.json(result);
  })
})
})

app.listen(app.get('port'), function () {
  console.log("Node app is running at localhost:" + app.get('port'));
});
//npm start
// TODO： when to end the connection?
// connection.end(function (err) {
//   // The connection is terminated now
//   console.log("Connection close");
// });
