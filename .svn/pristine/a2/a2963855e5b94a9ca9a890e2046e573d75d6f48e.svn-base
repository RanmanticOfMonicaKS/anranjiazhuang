const fs = require('fs');
// 1 参数1 复制的文件路径， 参数2 目标文件路径  参数3 失败回到函数
/* fs.copyFile('./2.text','./3.txt', err => {
    if(err) return console.log('复制文件失败：'+ err.message);
    console.log('复制文件成功');
}) */
// 传统文件复制方法，1   读取文件 ，  2 写入文件
fs.readFile('./2.txt','utf-8',function(err,data){
    if(err) return console.log('文件读出失败：'+err.message);
    console.log(data);//   111
    // 写入文件
    fs.writeFile('./2.txt',data, err => {
        if(err) return console.log('文件复制失败：'+err.message);
        console.log('文件复制成功');
        
    })
})