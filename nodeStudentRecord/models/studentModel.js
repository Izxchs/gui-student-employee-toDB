const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    course: {
        type: String,
        required: true,
        trim: true
    }
});

const Student = mongoose.model('students', studentSchema);

module.exports = Student;