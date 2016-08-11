var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema(
  {
    email: String,
    firstname: String,
    lastname: String,
    sis_id: String,
    isAdmin: Boolean,
    lastLogin: String
  }
);

//Compiles the model
var Teacher = mongoose.model('Teacher', teacherSchema);

//makes the user model availible to other modules
module.exports = Teacher;