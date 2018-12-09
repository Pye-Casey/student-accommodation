const accommodationModel = require("../models/accommodationModel.js")

function getAccommodations(req,res){
    console.log("Getting list of Accommodations");

    accommodationModel.getAllAccommodations(function(error, results){
      res.json(results);
    });

}

function getAccommodationById(req,res) {
  // get a Accommodation by id
  var id = req.query.id;
  console.log("Getting Accommodation by id:" + id);

  accommodationModel.getAccommodationById(id, function(error, results) {
    res.json(results);
  });

}


function getAccommodationByType(req,res) {
  // get a Accommodation by id
  var type = req.query.type;
  console.log("Getting Accommodation by type:" + type);

  accommodationModel.getAccommodationByType(type, function(error, results) {
    res.json(results);
  });

}

function postAccommodation(req, res) {
  accommodationModel.insertNewAccommodation(name, function(error, results) {
    res.json(results);
  });
} 

module.exports = {
  getAccommodations: getAccommodations,
  getAccommodationById: getAccommodationById,
  getAccommodationByType: getAccommodationByType,
  postAccommodation: postAccommodation
};
