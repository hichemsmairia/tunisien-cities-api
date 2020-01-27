const mongoose = require ('mongoose') ;
const citySchema = mongoose.Schema({
  _id : mongoose.Types.ObjectId,
  "city": String,
  "admin": String, 
  "country": String,
  "population_proper": Number,
  "iso2": String,
  "capital": String,
  "lat": Number,
  "lng": Number,
  "population": Number
}) ;
module.exports = mongoose.model('City',citySchema) ;
