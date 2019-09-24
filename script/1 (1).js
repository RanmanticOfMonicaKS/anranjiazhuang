//01  开启文件系统模块 且适应常量定义
// const fs =  require('fs');
//02   调用fs上的，读取文件方法 readFile
// fs.readFile() 参数1 文件相对路径path  参数2 编码形式 默认buffer 参数3 读取失败的回到函数 ，如果成功返回null 如果失败返回失败对象 回调函数2个参数 err data

// 先看成功的例子
/* fs.readFile('./1.txt',function(err,data){
    console.log(err);//  null
    // 根据返回结果，输出
    if(err) { return console.log('读取文件失败'+err.message )};
    console.log(data); //  <buffer 31 31 31>
})  */
fs.readFile('./2.text', 'utf8', function(err, data) {
    if (err) {
        return console.log('读取文件失败:' + err.message)
    };
    console.log(data);
});
const fs = require('fs');
fs.readFile('2.text', 'utf-8', (err, data) => {
    if (err) return console.log('读取失败：' + err.message);
    console.log(data);
})
