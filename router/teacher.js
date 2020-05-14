const express = require('express');
const router = express.Router();

const Teacher = require('../model/Teacher.js');
const Course = require('../model/Course.js');
const StudentCourse = require('../model/StudentCourse.js');

router.post('/teacherLogin', (req, res) => {
    Teacher.findOne({teacherID: req.body.teacherId, password: req.body.password})
            .then(data=> {
                if(data === null) {
                    return res.json({
                        code: '0001',
                        msg: '账号或密码错误'
                    })
                }
                req.session.id = data._id;
                req.session.type = 'teacher';
                return res.send({
                    code: '0000',
                    msg: '登录成功',
                    data: {
                        id: data._id,
                        type: 'teacher'
                    }
                })
            })
})

router.post('/teacherRegister', (req, res) => {
    Teacher.findOne({teacherID: req.body.teacherId})
            .then(result => {
                if(result === null) {
                    Teacher.create({
                        name: req.body.name, 
                        teacherID: req.body.teacherId,
                        password: req.body.password,
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

router.get('/getTeachersMessage', (req, res) => {
    Teacher.find()
            .select('-__v')
            .then(data => {
                return res.json({
                    code: '0000',
                    msg: '获取教师信息成功',
                    data: data
                });
            })
})

router.get('/getTeacherMessage', (req, res) => {
    Teacher.findOne({_id: req.query.id})
            .then(data => {
                return res.json({
                    code: '0000',
                    msg: '获取某教师信息成功',
                    data: data
                });
            })
})

router.post('/updateTeacherMessage', (req, res) => {
    Teacher.updateOne({_id: req.body.id},
        {   
            name: req.body.name, 
            teacherID: req.body.teacherId,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            mailBox: req.body.mailBox
        })
        .then(()=> {
            res.json({
                code: '0000',
                msg: '教师信息修改成功'
            })
        })
})

// 删除教师
router.post('/deleteTeacher', (req, res) => {
    Teacher.findOneAndDelete({_id: req.body.teacherId})
            .then((data)=> {
                Course.findOneAndDelete({teacher: data.name})
                        .then(data=> {
                            StudentCourse.findOneAndDelete({course_id: data._id})
                                        .then(()=> {
                                            return res.json({
                                                code: '0000',
                                                msg: '删除教师成功'
                                            })
                                        })
                        })
            })
})

module.exports = router;