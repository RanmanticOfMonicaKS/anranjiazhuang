// 开启文件系统模块
const fs = require('fs');

// 1 写入文件时， 如果对应路径没有该文件，会自动创建该文件
// 2 写入文件时，失败回到函数，只有一个参数err
// 3 写入文件时，会覆盖文件 第一个参数，路径，参数2 写入内容 ，参数3 失败回调函数
/* fs.writeFile('./2.text','我会写入文件了',function(err){
    if(err) { return console.log('写入文件失败'+err.message) };
    console.log('文件写入成功');
})
 */// 只有读取的时候，有data第二个参数， writeFile 第二个参数是写入内容会覆盖目标文件的之前得内容
fs.writeFile('./2.text','嘿嘿',err => {
    if(err) return console.log('写入失败:'+err.message);
    console.log('写入成功');
    
})
// 读取之后，在进行写入就可以进行复制了。
fs.readFile("2.text",'utf-8',function(err,data) {
    if(err) return console.log('文件读取失败:'+err.message);
    console.log(data);
    
})
