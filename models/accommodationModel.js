pg = require("pg");
pg.defaults.ssl = true;
const { Pool } =pg; // This is the postgres database connection module.

// This says to use the connection string from the environment variable, if it is there,
// otherwise, it will use a connection string that refers to a local postgres DB
const connectionString = process.env.DATABASE_URL || "postgres://vigucocnphhjuq:7a59d50e80cdf485528e033bcc8b4716238208caef7ab616e66ddd2b3902b858@ec2-54-163-230-178.compute-1.amazonaws.com:5432/dd6spmeo50fh5i";


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
  //var queryString = "SELECT * FROM accommodations WHERE aid_type='" + type +"'";
  var queryString = "SELECT * FROM accommodations WHERE type='" + type + "'";
  console.log("Query: " + queryString);
  pool.query(queryString, (err, res) => {
    console.log(err, res)
    pool.end()
    callback(null,res);
  })
}


module.exports = {
  getAllAccommodations: getAllAccommodations,
  getAccommodationByType: getAccommodationByType,
  getAccommodationById: getAllAccommodationsByID
}
