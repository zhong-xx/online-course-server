const express = require('express');
const router = express.Router();
const Plan = require('../model/Plan.js');

router.post('/addPlanMessage', (req, res) => {
    Plan.create({
        major: req.body.major,
        course_id: req.body.courseId
    })
    .then(()=> {
        return res.json({
            code: '0000',
            msg: '添加方案成功'
        })
    })
    .then(err => {
        if(err.errors === null) 
            return ;
        for(let index in err.errors) {
            return res.send({
                code: '0001',
                msg: err.errors[index].message
            })
        }
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