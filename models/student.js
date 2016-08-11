var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema(
  {
    StudentDTStamp: Date,
    LastName: String,
    FirstName: String,
    BirthMonth: Number,
    BirthDay: Number,
    BirthYear: Number,
    AgeYears: Number,
    AgeMonths: Number,
    StudentNumber: Number,
    SchoolYear: String,
    RecKindCamp: String
  }
);

//Compiles the model
var Student = mongoose.model('Student', studentSchema);

//makes the user model availible to other modules
module.exports = Student;