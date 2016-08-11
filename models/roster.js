var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rosterSchema = new Schema(
  {
    StudentNumber: Number,
    StaffCode: Number,
    TeacherName: String
  }
);

//Compiles the model
var Roster = mongoose.model('Roster', rosterSchema);

//makes the user model availible to other modules
module.exports = Roster;