// 引入express模块
const express = require('express'); // express对象

const path = require("path"); //路径对象
// 创建服务器
const app = express(); // 调用express对象，创建服务器
// 请求和返回数据处理
app.get('/',(req,res) => {
    // 一个参数，表示，文件的绝对路径 如要使用路径模块，进行拼接

    // res.sendFile(path.join(__dirname,'./index.html'));
    // res.sendFile()2个参数的写法，可以不写入绝对路径，但是要给出相对路径的相对对象。
    res.sendFile('./index.html',{root:__dirname})
})


app.listen(4000,() => {
    console.log('Server running at http://127.0.0.1:4000');
})
