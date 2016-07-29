var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teacherSchema = new Schema(
  {
    name:  [{first: String, last: String}],
    sis_id: String,
    email: String,
    isAdmin: Boolean,
    lastLogin: String
  }
);

//Compiles the model
var Teacher = mongoose.model('Teacher', teacherSchema);

//makes the user model availible to other modules
module.exports = Teacher;