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
  console.log('Use https://localhost:5000 to login to System.');
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

app.get('/details', function (request, response) {
  response.sendFile(path.join(__dirname, '/views', 'thirdpage.html'));
});

app.get('/details/:name', function (request, response) {
  var name = request.params.name;
  name = decodeURI(name);
  console.log(name);
  var query = " SELECT * " +
              " FROM ( SELECT * FROM cis550fp.University u WHERE univ_name = '" + name + "' ) a " +
              "      NATURAL JOIN cis550fp.Subject s NATURAL JOIN cis550fp.Crime c " +
              "      JOIN ( SELECT com.state, com.comp_name, com.city AS comp_city, com.industry, com.comp_url FROM cis550fp.Company com) comp ON comp.state = a.state " +
              "      JOIN cis550fp.Living_cost lc ON lc.city = a.city;";
  console.log(query);
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    response.json(result);
  });
});

app.get('/universitylist/:sat/:upperLimit/:lowerLimit/:sort', function (request, response) {

  var sat = request.params.sat;
  var upperLimit = request.params.upperLimit;
  var lowerLimit = request.params.lowerLimit;
  var sort = request.params.sort;
  var query;

  if (sort === '1') {
    query = " SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url" +
            " FROM cis550fp.University NATURAL JOIN cis550fp.Admission" +
            " WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit +
            " ORDER BY rank ASC;";
  }
  else if (sort === '2') {
    query = " SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url" +
            " FROM cis550fp.University NATURAL JOIN cis550fp.Admission" +
            " WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit +
            " ORDER BY adm_rate DESC;";
  }
  else if (sort === '3') {
    query = " SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url, total_number" +
            " FROM cis550fp.University NATURAL JOIN cis550fp.Admission NATURAL JOIN cis550fp.Crime" +
            " WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit +
            " ORDER BY total_number ASC;";
  }
  else if (sort === '4') {
    query = " SELECT univ_name, rank, city, adm_rate, sat_avg, univ_url, living_cost_index" +
            " FROM cis550fp.University NATURAL JOIN cis550fp.Admission NATURAL JOIN cis550fp.Living_cost" +
            " WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit +
            " ORDER BY living_cost_index ASC;";
  }
  else if (sort === '5') {
    query = " SELECT univ_name, rank, u.city, adm_rate, sat_avg, univ_url, count(*) as company_num" +
            " FROM cis550fp.University u NATURAL JOIN cis550fp.Admission JOIN cis550fp.Company c ON u.city = c.city" +
            " WHERE sat_avg <=" + sat + " AND rank <=" + lowerLimit + " AND rank >=" + upperLimit +
            " GROUP BY univ_name" +
            " ORDER BY count(*) DESC;";
  }


  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    response.json(result);
  });
});

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

app.get('/patternb.png', function (request, response){
  response.sendFile(path.join(__dirname, '/public/images/patternb.png'));
});

app.get('/patternb-head.png', function (request, response){
  response.sendFile(path.join(__dirname, '/public/images/patternb-head.png'));
});

app.get('/crime.jpeg', function (request, response){
  response.sendFile(path.join(__dirname, '/public/images/crime.jpeg'));
});

app.get('/living.jpeg', function (request, response){
  response.sendFile(path.join(__dirname, '/public/images/living.jpeg'));
});

app.get('/tp.css', function (request, response){
  response.sendFile(path.join(__dirname, '/public/stylesheets', 'tp.css'));
});
//npm start
// TODO： when to end the connection?
// connection.end(function (err) {
//   // The connection is terminated now
//   console.log("Connection close");
// });
