const studentModel = require("../models/studentModel.js")

function getStudents(req,res){
    console.log("Getting list of students");

    studentModel.getAllStudents(function(error, results){
      res.json(results);
    });

}

function getStudentById(req,res) {
  // get a student by id
  var id = req.query.id;
  console.log("Getting student by id:" + id);

  studentModel.getStudentById(id, function(error, results) {
    res.json(results);
  });

}

function postStudent(req, res) {
  studentModel.insertNewStudent(name, function(error, results) {
    res.json(results);
  });
}

module.exports = {
  getStudents: getStudents,
  getStudentById: getStudentById,
  postStudent: postStudent
};
