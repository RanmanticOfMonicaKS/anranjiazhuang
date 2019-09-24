const fs = require('fs');
fs.stat('./2.text',(err,stats) => {
    if(err) return console.log('查看文件信息失败：'+err.message);
    console.log(stats);   
})