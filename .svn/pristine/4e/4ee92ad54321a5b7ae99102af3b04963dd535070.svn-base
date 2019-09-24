const express = require('express');

const app = express();

// 配置模板
// 1 使用app.set('view engine','模板引擎的名称'); 前面的view和views都固定写法
app.set('view engine','ejs');
// 2 设置模板页面的默认存放位置，app.set('views','模板页面的具体存目录')
app.set('views','./ejs-pages');// 注意路径，这是平级的

app.get('/',(req,res) => {
    // 注意是要调动res.render 函数来渲染页面 必须先配置模板引擎
    res.render('index.ejs',{name:'zs',age:18})
})

app.listen(4000,() => {
    console.log('Server running at http://127.0.0.1:4000');
    
})