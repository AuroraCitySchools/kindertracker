var Roster = require('../models/roster.js');
var Student = require('../models/student.js');

module.exports = function(teacher_sis_id) {
	// Get all students belonging to teacher
	// creating an array of StudentIDs and Names
	studentInfo = [];
	return Roster.find(
		{StaffCode: teacher_sis_id}, 
		{StudentNumber: true, _id: false}
	).exec()
	.then(function(arrayOfStudents){
		console.dir("Array of Nums: " + arrayOfStudents);
		// Get a name for each student number
		return Promise.all(arrayOfStudents.map(function(student) {
			return Student.findOne(
				{StudentNumber: student.StudentNumber}, 
				{FirstName: true, LastName: true, _id: false, StudentNumber: true}
			).exec();
		}));
	})
	.catch(function(error) {
		console.log("Error getting student numbers from roster: " + error);
	})
	.then(function(results) {
		// We are sorting by last name before sending this out
		results.sort(function(a, b) {
			if (a.LastName < b.LastName)
	    	return -1;
	  	if (a.LastName > b.LastName)
	    	return 1;
	  	return 0;
		});
		return results;
	})
	.catch(function(error) {
		console.error("Error getting student names: " + error);
	})
}