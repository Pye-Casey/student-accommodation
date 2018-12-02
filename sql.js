module.exports = {

    create_student: (req, res) => {
		//let params = compute(req.query);
    let params = student_insert(req.query);
		res.render('pages/student_results', params);
    },

    create_accommodation: (req, res) => {
		//let params = compute(req.query);
    let params = accommodation_insert(req.query);
		res.render('pages/accommodation_results', params);
    },

    create_disability: (req, res) => {
		//let params = compute(req.query);
    let params = disability_insert(req.query);
		res.render('pages/disability_results', params);
    },

    get_students: (req, res) => {
    //  get_all_students();
		//let params = compute(req.query);
    get_all_students();
    //console.log("1.Res: " + res);
    //var row1 = res.rows[0];
    //console.log("2.Res row stringified: " + JSON.stringify(row1));
    //console.log("Res stringified: " + JSON.stringify(res));
		res.render('pages/all_student_results');
    },
};


function get_all_students() {
  pg = require("pg");
  pg.defaults.ssl = true;
  const { Pool } =pg; // This is the postgres database connection module.

  // This says to use the connection string from the environment variable, if it is there,
  // otherwise, it will use a connection string that refers to a local postgres DB
  const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});

  var queryString = "SELECT * FROM students";
  var result;
  // Query database
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()

    })



}

function disability_insert(query) {
  pg = require("pg");
  pg.defaults.ssl = true;
  const { Pool } =pg; // This is the postgres database connection module.

  // This says to use the connection string from the environment variable, if it is there,
  // otherwise, it will use a connection string that refers to a local postgres DB
  const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});

  // Get Data
  var studentID = query.studentID;
  var description = query.description;
  var type = query.type;

  var queryString = "INSERT INTO disability(student_id, description, type) VALUES ('"+ studentID +"','" + description +"', '" + type + "' )";
  var insertCorrectly;
  console.log("Query String: " + queryString);
  // Query database
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    insertCorrectly = true;
  })

  // Setup JSON object
	var params = {studentID: studentID, description: description, type: type, insertCorrectly: insertCorrectly};
	return params;
}

function accommodation_insert(query) {
  pg = require("pg");
  pg.defaults.ssl = true;
  const { Pool } =pg; // This is the postgres database connection module.

  // This says to use the connection string from the environment variable, if it is there,
  // otherwise, it will use a connection string that refers to a local postgres DB
  const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});

  // Get Data
  var studentID = query.studentID;
  var description = query.description;
  var type = query.type;

  var queryString = "INSERT INTO accommodations(student_id, description, type) VALUES ('"+ studentID +"','" + description +"', '" + type + "' )";
  var insertCorrectly;
  console.log("Query String: " + queryString);
  // Query database
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    insertCorrectly = true;
  })

  // Setup JSON object
	var params = {studentID: studentID, description: description, type: type, insertCorrectly: insertCorrectly};
	return params;
}

function student_insert(query) {
  pg = require("pg");
  pg.defaults.ssl = true;
  const { Pool } =pg; // This is the postgres database connection module.

  // This says to use the connection string from the environment variable, if it is there,
  // otherwise, it will use a connection string that refers to a local postgres DB
  const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";

  // Establish a new connection to the data source specified the connection string.
  const pool = new Pool({connectionString: connectionString});

  // Get Data
  var fName = query.fName;
  var lName = query.lName;
  var grade = query.grade;
  var has_IEP = query.iep;
  var has_504 = query.student504;
  var queryString = "INSERT INTO students(fName, lName, grade, has_iep, has_504) VALUES ('"+ fName +"','" + lName +"', " + grade + ", '"+ has_IEP +"', '"+ has_504 +"' )";
  var insertCorrectly;
  console.log("Query String: " + queryString);
  // Query database
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    insertCorrectly = true;
  })

  // Setup JSON object
	var params = {fName: fName, lName: lName, grade: grade, has_IEP: has_IEP, has_504: has_504, insertCorrectly: insertCorrectly};
	return params;
}
