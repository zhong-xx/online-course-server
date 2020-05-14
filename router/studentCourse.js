const express = require('express');
const router = express.Router();
const StudentCourse = require('../model/StudentCourse');
const Course = require('../model/Course');
const Teacher = require('../model/Teacher');

const mongoose = require('mongoose');

router.post('/addStudentCourse', (req, res) => {
    StudentCourse.findOne({ student_id: req.body.id, course_id: req.body.courseId})
                .then((data) => {
                    if(data) {
                        return res.json({
                            code: '0001',
                            msg: '该课程已在你的课程中'
                        })
                    }
                    StudentCourse.create({ student_id: req.body.id, course_id: req.body.courseId})
                    .then(()=> {
                        Course.updateOne({_id: req.body.courseId}, { $inc:{selected_quantity:1} })
                                .then(()=> {
                                    // console.log('1')
                                })
                        return res.json({
                            code: '0000',
                            msg: '添加课程成功'
                        })
                    })
                    .catch(()=>{
                        return res.json({
                            code: '0001',
                            msg: '添加课程失败'
                        })
                    })
                })
})

router.get('/getStudentCourse', (req, res) => {
    StudentCourse.find({ student_id: req.query.id })
                .populate('course_id')
                .select('-_id course_id')
                .then(data => {
                    let result = [];
                    for(let item of data) {
                        result.push(item.course_id)
                    }
                    res.json({
                        code: '0000',
                        msg: '获取该学生课程成功',
                        data: result
                    })
                })
})

router.post('/deleteStudentCourse', (req, res) => {
    StudentCourse.findOneAndDelete({ 
                    student_id: req.body.id, 
                    course_id: req.body.courseId
                })
                .then(()=> {
                    Course.updateOne({_id: req.body.courseId}, { $inc:{selected_quantity:-1} })
                                .then(()=> {
                                    // console.log('1')
                                })
                    res.json({
                        code: '0000',
                        msg: '删除课程成功'
                    })
                })
})

// 获取某个教师的所有学生
router.get('/getStudents', (req, res) => {
    Teacher.findOne({_id: req.query.teacherId})
            .select('-_id name')
            .then(data => {
                Course.find({teacher: data.name})
                        .select('_id name')
                        .then(course => {
                            let result = [];
                            let len = course.length;
                            for(let index in course) {
                                let ret = StudentCourse.find({course_id: course[index]._id})
                                            .populate('student_id', '-_id name')
                                            .select('student_id course_id grade isTest')
                                result.push(ret)
                            }
                            Promise.all(result)
                                    .then(values => {
                                        return res.json({
                                            code: '0000',
                                            msg: '获取该教师所有学生成功',
                                            data: {
                                                course,
                                                values
                                            }
                                        })
                                    })
                        })
            })

    
})

// 修改学生成绩
router.post('/updateGrade', (req, res) => {
    let gradePoint;
    switch (true) {
        case req.body.grade < 60:
            gradePoint = 0;
            break;
        case req.body.grade > 60:
            gradePoint = 1+ (req.body.grade - 60)*0.1;
    }
    gradePoint = Math.floor(gradePoint*100)/100;
    StudentCourse.findOneAndUpdate({_id: req.body.id}, {grade: req.body.grade,grade_point: gradePoint, isTest: 1})
                .then(()=> {
                    return res.json({
                        code: '0000',
                        msg: '修改学生成绩成功'
                    })
                })
})

// 获取学生成绩
router.get('/getStudentGrade', (req, res) => {
    StudentCourse.find({student_id: req.query.studentId, isTest: 1})
                    .populate('course_id', '-_id name')
                    .select('-_id course_id grade grade_point')
                    .then(data => {
                        return res.json({
                            code: '0000',
                            msg: '获取学生成绩成功',
                            data
                        })
                    })
})

module.exports = router;