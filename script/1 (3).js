const fs = require('fs');
fs.appendFile('2.text','我又会追加文件了',function(err){
    if(err) return console.log('追加文件失败'+err.message);
    console.log('文件追加成功'); 
})