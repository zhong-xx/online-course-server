const express = require('express');
const router = express.Router();

const Course = require('../model/Course.js');
const StudentCourse = require('../model/StudentCourse.js');
const Plan = require('../model/Plan.js');

router.get('/getCoursesMessage', (req, res) => {
    Course.find()
            .then(data => {
                res.json({
                    code: '0000',
                    msg: '获取课程信息成功',
                    data
                })
            })
})

router.post('/addCourseMessage', (req, res) => {
    Course.create({
        name: req.body.name,
        type: req.body.type,
        place: req.body.place,
        credit: req.body.credit,
        begin_week: req.body.beginWeek,
        end_week: req.body.endWeek,
        book: req.body.book,
        teacher: req.body.teacher,
        quantity: req.body.quantity
    })
    .then(() => {
        return res.send({
            code: '0000',
            msg: '课程设定成功'
        });
    })
    .catch(err => {
        for(let index in err.errors) {
            return res.json({
                code: '0001',
                msg: err.errors[index].message
            })
        }
    })
})

router.get('/getCourseMessage', (req, res) => {
    Course.findOne({_id: req.query.id})
            .then(data => {
                return res.json({
                    code: '0000',
                    msg: '获取某课程信息成功',
                    data: data
                });
            })
})

router.post('/updateCourseMessage', (req, res) => {
    Course.updateOne({_id: req.body.id},
        {   
            name: req.body.name,
            type: req.body.type,
            place: req.body.place,
            credit: req.body.credit,
            begin_week: req.body.beginWeek,
            end_week: req.body.endWeek,
            book: req.body.book,
            teacher: req.body.teacher,
            quantity: req.body.quantity
        })
        .then(()=> {
            res.json({
                code: '0000',
                msg: '课程信息修改成功'
            })
        })
})

// 删除课程
router.post('/deleteCourse', (req, res) => {
    Course.findOneAndDelete({_id: req.body.courseId})
            .then(()=> {
                StudentCourse.deleteMany({course_id: req.body.courseId})
                            .then(() => {
                                Plan.deleteMany({course_id: req.body.courseId})
                                    .then(()=> {
                                        return res.json({
                                            code: '0000',
                                            msg: '删除课程成功'
                                        })
                                    })
                            })
            })
})

module.exports = router;