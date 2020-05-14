const express = require('express');
const router = express.Router();

const Student = require('../model/Student');
const StudentCourse = require('../model/StudentCourse.js');

router.post('/studentLogin', (req, res) => {
    Student.findOne({studentID: req.body.studentId, password: req.body.password})
            .then(data=> {
                if(data === null) {
                    return res.json({
                        code: '0001',
                        msg: '账号或密码错误'
                    })
                }
                req.session.id = data._id;
                req.session.type = 'student';
                return res.send({
                    code: '0000',
                    msg: '登录成功',
                    data: {
                        id: data._id,
                        type: 'student'
                    }
                })
            })
})

router.post('/studentRegister', (req, res) => {
    Student.findOne({studentID: req.body.studentId})
            .then(result => {
                if(result === null) {
                    Student.create({name: req.body.name, 
                        studentID: req.body.studentId,
                        password: req.body.password,
                        college: req.body.college,
                        class: req.body.class,
                        major: req.body.major,
                        phoneNumber: req.body.phoneNumber,
                        mailBox: req.body.mailBox
                    })
                    .then(()=> {
                        return res.send({
                            code: '0000',
                            msg: '注册成功'
                        });
                    })
                    .catch(error => {
                        if(error.errors === null) 
                            return ;
                        for(let index in error.errors) {
                            return res.send({
                                code: '0001',
                                msg: error.errors[index].message
                            })
                        }
                    })
                } else {
                    return res.send({
                        code: '0001',
                        msg: '该学号已注册'
                    });
                }
            })
})

router.get('/getStudentsMessage', (req, res) => {
    Student.find()
            .select('_id name studentID password college class major phoneNumber mailBox')
            .then(data => {
                return res.json({
                    code: '0000',
                    msg: '获取学生信息成功',
                    data: data
                });
            })
})

router.get('/getStudentMessage', (req, res) => {
    Student.findOne({_id: req.query.id})
            .then(data => {
                return res.json({
                    code: '0000',
                    msg: '获取某学生信息成功',
                    data: data
                });
            })
})

router.post('/updateStudentMessage', (req, res) => {
    Student.updateOne({_id: req.body.id},
        {   name: req.body.name, 
            studentID: req.body.studentId,
            password: req.body.password,
            college: req.body.college,
            class: req.body.class,
            major: req.body.major,
            phoneNumber: req.body.phoneNumber,
            mailBox: req.body.mailBox
        })
        .then(()=> {
            res.json({
                code: '0000',
                msg: '学生信息修改成功'
            })
        })
})

//删除学生 
router.post('/deleteStudent', (req, res) => {
    Student.findOneAndDelete({_id: req.body.studentId})
            .then(()=> {
                StudentCourse.deleteMany({student_id: req.body.studentId})
                            .then(()=> {
                                return res.json({
                                    code: '0000',
                                    msg: '删除学生成功'
                                })
                            })
            })
})

module.exports = router;