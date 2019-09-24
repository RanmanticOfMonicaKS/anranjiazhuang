const fs = require('fs');
fs.readdir('../node',function(err,files){
    if(err) return console.log('读取文件夹失败：'+err.message);
    console.log(files);
    // 以数组的形式，这哪是所有文间，可以以进行循环得到多个文件中额数据。
})