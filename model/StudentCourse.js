const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentCourseSchema = new mongoose.Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'pupil'
    },
    course_id: {
        type: Schema.Types.ObjectId,
        ref: 'course'
    },
    grade: {
        type: Number,
        default: 0
    },
    grade_point: {
        type: Number,
        default: 0
    },
    isTest: {
        type: Number,
        default: 0
    }
})

const StudentCourse = mongoose.model('student_course', studentCourseSchema);

module.exports = StudentCourse;