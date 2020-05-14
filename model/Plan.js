const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new mongoose.Schema({
    major: {
        type: String,
        required: [true, '请选择专业']
    },
    course_id: {
        type: Schema.Types.ObjectId,
        required: [true, '请选择课程'],
        ref: 'course'
    }
})

const Plan = mongoose.model('plan', planSchema);

module.exports = Plan;