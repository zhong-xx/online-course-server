const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRouter = require('./router/student.js')
const teacherRouter = require('./router/teacher.js')
const courseRouter = require('./router/course.js')
const planRouter = require('./router/plan.js')
const otherRouter = require('./router/other.js')
const studentCourseRouter = require('./router/studentCourse.js')
const session = require('express-session');

const mongodbURI = require('./config/keys').mongodbURI;
mongoose.connect(mongodbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=> console.log('数据库连接成功'))
        .catch(()=> console.log('数据库连接失败'))
mongoose.set('useFindAndModify', false)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
        secret: '123456',
        cookie: {maxAge: 30*60*1000}
}))

app.use('/api/student', studentRouter);
app.use('/api/teacher', teacherRouter);
app.use('/api/course', courseRouter);
app.use('/api/plan', planRouter);
app.use('/api/studentCourse', studentCourseRouter);
app.use('/api/other', otherRouter);


app.listen(3001, () => {console.log('服务器开启成功')});

