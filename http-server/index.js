var https = require('https');
var fs = require('fs');
var pem = require('pem')
var express = require('express');
var path = require('path');
var mysql = require('mysql');
/*-----------------------------------------------------*/
var app = express();

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, app).listen(5000);

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

app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));
/*-----------------------------------------------------*/
// Router
// HTML pages in views
// java script in public/javascript
app.get('/login', function (request, response) {
  console.log("get /login");
  response.sendFile(path.join(__dirname, '/views', 'login.html'));
});

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/views', 'firstpage.html'));
});
app.get('/app.js', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/javascripts', 'app.js'));
});

app.get('/universitylist', function (request, response) {
  response.sendFile(path.join(__dirname, '/views', 'secondpage.html'));
});

app.get('/universitylist/:sat/:upperLimit/:lowerLimit', function (request, response) {

  var sat = request.params.sat;
  var upperLimit = request.params.upperLimit;
  var lowerLimit = request.params.lowerLimit;
  var query = "SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url FROM cis550fp.University NATURAL JOIN cis550fp.Admission WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit + " order by rank ASC;";
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    response.json(result);
  });
})

app.get('/fp.css', function (request, response){
  response.sendFile(path.join(__dirname, '/public/stylesheets', 'fp.css'));
});

app.get('/sidebar.css', function (request, response){
  response.sendFile(path.join(__dirname, '/public/stylesheets', 'sidebar.css'));
});

app.get('/fb-login.js', function (request, response){
  response.sendFile(path.join(__dirname, '/public/javascripts', 'fb-login.js'));
});

app.get('/fb-login.css', function (request, response){
  response.sendFile(path.join(__dirname, '/public/stylesheets', 'fb-login.css'));
});

app.get('/sp.css', function (request, response){
  response.sendFile(path.join(__dirname, '/public/stylesheets', 'sp.css'));
});
//npm start
// TODO： when to end the connection?
// connection.end(function (err) {
//   // The connection is terminated now
//   console.log("Connection close");
// });
