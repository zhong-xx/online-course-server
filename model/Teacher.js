const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '名字不能为空'],
    },
    teacherID: {
        type: String,
        required: [true, '名字不能为空']
    },
    password: {
        type: String,
        default: 'zfsoft123'
    },
    phoneNumber: {
        type: String,
        required: [true, '请输入电话号码']
    },
    mailBox: {
        type: String,
        required: [true, '请输入邮箱'],
        email: [true, '邮箱格式不正确']
    }
},{ versionKey: false })

const Teacher = mongoose.model('teacher',teacherSchema);

module.exports = Teacher;