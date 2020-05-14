const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '课程名不能为空']
    },
    type: {
        type: String,
        required: [true, '课程类型不能为空']
    },
    place: {
        type: String,
        required: [true, '课程地点不能为空']
    },
    credit: {
        type: Number,
        required: [true, '学分不能为空']
    },
    begin_week: {
        type: Number,
        required: [true, '开始周不能为空']
    },
    end_week: {
        type: Number,
        required: [true, '结束周不能为空']
    },
    book: {
        type: String,
        required: [true, '书籍不能为空']
    },
    teacher: {
        type: String,
        required: [true, '书籍不能为空']
    },
    quantity: {
        type: Number,
        required: [true, '总数量不能为空']
    },
    selected_quantity: {
        type: Number,
        default: 0
    }
}, { versionKey: false })

const Course = mongoose.model('course', courseSchema);

module.exports = Course;