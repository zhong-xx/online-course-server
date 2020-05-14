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
// [{major: '软件工程', courseList: ['dskf', '12354']}]
router.get('/getPlanMessage', (req, res) => {
    Plan.find()
        .select('-_id')
        then(data => {
            let planList = [];
            for(let item of data) {
                if(isExist(item)) {
                    for(let value of planList) {
                        if(value.major === item.major) {
                            value.courseList.push(item.course_id)
                        }
                    }
                }
            }

            function isExist(item) {
                for(let value of planList) {
                    if(value.major === item.major) {
                        return true;
                    }
                }
                return false;
            }
        })
})



module.exports = router;