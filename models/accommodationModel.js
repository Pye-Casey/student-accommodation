pg = require("pg");
pg.defaults.ssl = true;
const { Pool } =pg; // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

function getAccommodationById(id, callback){
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  //var queryString = "SELECT * FROM accommodations WHERE aid_type='" + type +"'";
  var queryString = "SELECT * FROM accommodations WHERE id='" + id + "'";
  console.log("Query: " + queryString);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}
function getAllAccommodations(callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  var queryString = "SELECT * FROM accommodations";
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })

}

function getStudentAccommodations(id, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  //var queryString = "SELECT * FROM accommodations WHERE aid_type='" + type +"'";
  var queryString = "SELECT * FROM accommodations WHERE student_id='" + id + "'";
  console.log("Query: " + queryString);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}

function getAllAccommodationsByID(id, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  //var queryString = "SELECT * FROM accommodations WHERE aid_type='" + type +"'";
  var queryString = "SELECT * FROM accommodations WHERE id='" + id + "'";
  console.log("Query: " + queryString);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}
//getAccommodationByType
function getAccommodationByType(type, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  var queryString = "SELECT a.id, a.student_id, a.description, a.type, s.fname, s.lname, s.grade FROM accommodations AS a, students AS s WHERE a.student_id = s.id AND a.type='" + type + "'";
  //var queryString = "SELECT * FROM accommodations WHERE type='" + type + "'";
  console.log("Query: " + queryString);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}

function updateAccommodation(req, callback){
  const pool = new Pool({connectionString: connectionString});
  console.log("Request:" + req);
  var query = req.query;
  let type = query.type;
  let description = query.description;
  let studentID = query.studentID;
  let id = query.aID;

  var params = {id: id, type: type, description: description, studentID: studentID};
  console.log("Update accommodation, ID:" + id);
  //var queryString = "INSERT INTO students(fName, lName, grade, has_iep, has_504) VALUES ('"+ fName +"','" + lName +"', " + grade + ", '"+ has_IEP +"', '"+ has_504 +"' )";

  //var queryString = "UPDATE accommodations SET type='"+ type +", description='"+ description +"' WHERE id='" + id + "'";
  var queryString = "UPDATE ACCOMMODATIONS SET type='"+ type +"', description='"+ description +"' WHERE id='" + id + "'";

  console.log("Query string: " + queryString);
  //var results = {id:id, name:"Michael"};
  //callback(null, results);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,params);
  })
}

module.exports = {
  getAllAccommodations: getAllAccommodations,
  getAccommodationByType: getAccommodationByType,
  getAccommodationById: getAllAccommodationsByID,
  getStudentAccommodations: getStudentAccommodations,
  updateAccommodation: updateAccommodation
}
