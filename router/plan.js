const express = require('express');
const router = express.Router();
const Plan = require('../model/Plan.js');
const Course = require('../model/Course.js');

router.get('/getCourseList', (req, res)=> {
    Course.find()
            .select('name')
            .then(data=> {
                data.forEach((item, index, arr)=> {
                    item.type = '';
                })
                res.json({
                    code: '0000',
                    mag: '获取所有课程成功',
                    data
                })
            })
})

// 添加方案
router.post('/addPlanMessage', (req, res) => {
    Plan.find({major: req.body.major})
        .then(data=> {
            if(data.length > 0) {
                return res.json({
                    code: '0001',
                    msg: '该专业已设定选课方案'
                })
            }
            let array = [];
            req.body.courseList.forEach(item=> {
                let result = Plan.create({
                    major: req.body.major,
                    course_id: item._id
                })
                array.push(result);
            })
            Promise.all(array)
                    .then(values=> {
                        return res.json({
                            code: '0000',
                            msg: '添加方案成功'
                        })
                    })
            
        })
})

// 获取方案信息
router.get('/getPlanMessage', (req, res) => {
    Plan.find()
        .populate('course_id', 'name')
        .select('-_id')
        .then(data => {
            let planList = [];
            let major = '';
            let length = -1;
            data.forEach((item)=> {
                if(item.major !== major) {
                    major = item.major;
                    planList.push({});
                    length++;

                    planList[length].major = major;
                    planList[length].courseList = item.course_id.name;
                }else {
                    planList[length].courseList = planList[length].courseList+ item.course_id.name;
                }
            })

            return res.json({
                code: '0000',
                msg: '获取方案信息成功',
                data: planList
            })
        })
})

// 删除方案
router.post('/deletePlan', (req, res) => {
    Plan.deleteMany({major: req.body.major})
        .then(()=> {
            return res.json({
                code: '0000',
                msg: '删除方案成功'
            })
        })
})



module.exports = router;