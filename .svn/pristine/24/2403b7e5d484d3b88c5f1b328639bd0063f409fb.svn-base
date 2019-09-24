// 引入express模块
const express = require('express');

//调用express 创建服务器
const app = express();

// 条用app.get()方法来监听用户的请求，并制定舰艇的url地址和处理函数

app.get('/',(req,res) => {
    // 照样能使用原生http中的res.end 方法

    // 当时使用使用express方法更加方便和人性化
    res.send('你好， 世界。');
})

// 04 开启接口监听
app.listen(3000,'127.0.0.1',()=>{
    console.log('Server running at http://127.0.0.1:3000');
    
})