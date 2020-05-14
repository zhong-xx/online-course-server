const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '名字不能为空'],
    },
    studentID: {
        type: String,
        required: [true, '名字不能为空']
    },
    password: {
        type: String,
        default: 'zfsoft123'
    },
    college: {
        type: String,
        required: [true, '请输入学院']
    },
    class: {
        type: String,
        required: [true, '请输入班级']
    },
    major: {
        type: String,
        required: [true, '请输入专业']
    },
    phoneNumber: {
        type: String,
        required: [true, '请输入电话号码']
    },
    mailBox: {
        type: String,
        required: [true, '请输入邮箱']
    }
},{ versionKey: false })

const Student = mongoose.model('pupil',studentSchema);

module.exports = Student;