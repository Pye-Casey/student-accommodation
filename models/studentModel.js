pg = require("pg");
pg.defaults.ssl = true;
const { Pool } =pg; // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

// Establish a new connection to the data source specified the connection string.
//const pool = new Pool({connectionString: connectionString});

function getAllStudents(callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  var queryString = "SELECT * FROM students";
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })

}

function getStudentById(id, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  var queryString = "SELECT * FROM students WHERE id='" + id + "'";
  console.log("Query string: " + queryString);
  //var results = {id:id, name:"Michael"};
  //callback(null, results);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}

function insertNewStudent(name, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  // insert a new student
  var results = {success:true};
  callback(null, results);
}

function updateStudent(req, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  console.log("Request:" + req);
  var query = req.query;
  let fName = query.fName;
  let lName = query.lName;
  let has_504 = query.has_504;
  let has_IEP = query.iep;
  let grade = query.grade;
  let id = query.id;
  if (!has_504) {
    has_504 = false;
  }
  if (!has_IEP) {
    has_IEP = false;
  }

  var params = {fName: fName, lName: lName, grade: grade, has_IEP: has_IEP, has_504: has_504};
  console.log("Update student, fname:" + fName);
  //var queryString = "INSERT INTO students(fName, lName, grade, has_iep, has_504) VALUES ('"+ fName +"','" + lName +"', " + grade + ", '"+ has_IEP +"', '"+ has_504 +"' )";

  var queryString = "UPDATE STUDENTS SET fname='"+ fName +"', lname='"+ lName +"', has_iep='"+ has_IEP +"', has_504='"+ has_504 +"', grade='"+ grade +"' WHERE id='" + id + "'";
  console.log("Query string: " + queryString);
  //var results = {id:id, name:"Michael"};
  //callback(null, results);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,params);
  })

}

function deleteStudent(req, callback) {
  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});
  var query = req.query;
  let fName = query.fName;
  let lName = query.lName;
  let has_504 = query.has_504;
  let has_IEP = query.iep;
  let grade = query.grade;
  let id = query.id;
  var params = {fName: fName, lName: lName};

  var queryString = "DELETE FROM students WHERE id='" + id + "'";
  console.log("Query string: " + queryString);
  //var results = {id:id, name:"Michael"};
  //callback(null, results);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null, params);
  })

}

module.exports = {
  getAllStudents: getAllStudents,
  getStudentById: getStudentById,
  insertNewStudent: insertNewStudent,
  updateStudent: updateStudent,
  deleteStudent: deleteStudent
}
