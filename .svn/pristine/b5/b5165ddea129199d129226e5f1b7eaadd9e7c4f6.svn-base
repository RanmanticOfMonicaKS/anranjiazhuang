//引入express模块
const express = require('express');

const queryString = require('querystring');

//创建服务器
const app = express();

// 用自己的中间件来处理
app.use((req,res,next) => {
    let dataStr = '';
    req.on('data',chunk => {
        dataStr +=chunk;
    })
    // 监听数据接受结束。
    req.on('end',() => {
    
       // console.log(dataStr);//得到参数字符串
        // 对字符串进行处理 
        const obj = queryString.parse(dataStr);
        // 将数据独享挂载到 req上
        req.body = obj;
        console.log(obj);
        
        // ⭐⭐⭐ 放行，进入下一个中间件 在使用路由之前一定要记得啊 ，纠结了1个小时
        next();
    })   
})

// 这是路由级别的中间件
const router = express.Router();
// const router = require('./router.js');

router.post('/user',(req,res) => {
    
    res.send({msg:'解析成功',data:req.body});
})
//这是应用级别的中间件

// 用引入路由 模块的方式，没有问题，试一试，在页面中直接写入路由模块

app.use(router);
//开启服务器监听
app.listen(5000,() => {
console.log('Server running at http://127.0.0.1:5000');
})
