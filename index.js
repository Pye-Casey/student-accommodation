const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
//const mail = require('./mail.js');
const sql = require('./sql.js');
const studentController = require("./controllers/studentController.js");
const accommodationController = require("./controllers/accommodationController.js");
var app = express();

pg = require("pg");
pg.defaults.ssl = true;
const { Pool } =pg; // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://jjocwswcpkgmmr:aa5af7ae964815dc8990097b7a6755a4876c45c7a3e00426a5081c986f3b8de9@ec2-23-21-171-249.compute-1.amazonaws.com:5432/dukt7i3mvsqal";

// Establish a new connection to the data source specified the connection string.
const pool = new Pool({connectionString: connectionString});

/* pool.query('SELECT * FROM person', (err, res) => {
  console.log(err, res)
  pool.end()
}) */

app.use(express.static(__dirname + '/public'));
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended:true})); // support url encoded bodies

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/index', (req, res) => res.render('pages/index'))
  .get('/index2', (req, res) => res.render('pages/index2'))
  .get('/student', (req, res) => res.render('pages/student'))
  .get('/accommodation', (req, res) => res.render('pages/accommodation'))
  .get('/disability', (req, res) => res.render('pages/disability'))
  .get('/create_student', sql.create_student)
  .get('/create_accommodation', sql.create_accommodation)
  .get('/create_disability', sql.create_disability)
  //.get('/get_students', sql.get_students)
  .get("/students", studentController.getStudents)
  .get("/all_accommodations", accommodationController.getAccommodations)
  .get("/get_accommodation", accommodationController.getAccommodationById)
  .get("/accommodations_type", accommodationController.getAccommodationByType)
  //.get("/accommodations_type", (req, res) => res.render(accommodationController.getAccommodationByType))
  //.get("/accommodations_type", accommodationController.getAccommodationByType)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
