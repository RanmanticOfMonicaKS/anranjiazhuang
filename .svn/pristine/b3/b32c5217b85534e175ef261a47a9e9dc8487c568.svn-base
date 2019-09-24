// const fs = require('fs');
/* fs.readFile('node/1.txt','utf8',(err,data) =>{
    if(err) return console.log('读取文件失败'+err.message);
    console.log(data,66666);
})
 */// 这里终端位置与文件位置一致能够正常，执行js并执行读取文件操作，
// 但是如果终端位置不一致，列如乐淘项目中，是在根目录打开终端，要执行，下一级或者下几级目录中的js文件时，就会发生路径不一致的情况


// 'D:\goodjob\08-node.js\1.txt'  会以终端为起点寻找文件，所以会出现问题
/* console.log(__dirname);
console.log(__filename);
//   ⭐ 如果不在上面从终端路径触发，添加文件地址的话 直接写成 1.txt,那么这里需要拼接上__dirname的地址才行
fs.readFile(__dirname+'/1.txt','utf-8',function(err,data){
    if(err) return console.log('读取失败：'+err.message);
    console.log(data); 
}) */


// ⭐ ⭐ 为了避免/\问题，这里有终极版 获取文件路径的办法
const fs= require("fs");
const path = require('path');
fs.readFile(path(__dirname,'./1.txt'),'utf-8',(err,data) => {
    if(err) return console.log('读取失败：'+err.message);
    console.log('文件读取成功');
    console.log(data);
    
    
})
