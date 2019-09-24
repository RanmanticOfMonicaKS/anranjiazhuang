const express =require('express');

const app = express();

const mySql = require('mysql');

const conn  = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node'
});

//调用查询方法
const sql = 'select * from users';
conn.query(sql,(err,result) => {
    if(err) return console.log('获取数据失败'+err.message);
    console.log(result);
})
