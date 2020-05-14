const express = require('express');
const router = express.Router();

router.post('/managerLogin', (req, res) => {
    req.session.type = 'manager';
    res.json({
        code: '0000',
        msg: '管理员登录成功'
    })
})

router.get('/getUserType', (req, res) => {
    if(req.session.type) {
        return res.json({
            code: '0000',
            msg: '获取用户类型成功',
            data: req.session.type
        })
    }
    return res.json({
        code: '0001',
        msg: '用户还未登录'
    })
})

module.exports = router;