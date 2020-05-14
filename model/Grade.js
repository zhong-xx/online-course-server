const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gradeSchema = new mongoose.Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'pupil'
    },
    course_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'course'
    },
    grade: {
        type: Number,
        required: true
    },
    grade_point: {
        type: Number,
        required: true
    }
})

const Grade = mongoose.model('grade', gradeSchema);

module.exports = Grade;