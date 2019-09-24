// 静态托管，能够将真个文件夹进行托管，是浏览器能够
// 托管的时候，先到先得。
const express = require('express');
const app = express();
// app.get('./',(req,res) => {
    // })
    // 后面部分用中间件来进行处理,代替app.get 
    // 注册中间件，利用处理函数在整个路由过程中，对数据进行处理。express自带的中间件
app.use('/NBA',express.static('views'));// 是浏览器能够直接访问，views文件夹中的页面，就是用来处理，代替get请求，处理网站中的静态文件的请求
app.listen(3000,() => {
    console.log('Server running at http://127.0.0.1:3000');
    // 02 app.use 中间量的时候，可以加入第二个参数：虚拟路径，可以当做一个表示，要求用户必须加上’类似于前缀含义的虚拟路径‘ 比如我可以在上面这个路径，要求用户加入我网站的表示NBA 在访问views下面文件，必须在前面加上NBA
})