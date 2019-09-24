const express =require('express');

const app = express();

const mySql = require('mysql');

const conn  = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'node'
});

//调用新增方法
/* const user = {uname:'大黄',age:3,gender:'公'}
const sql ='insert into users set ?';
conn.query(sql,user,(err,result) => {
    if(err) return console.log('获取数据失败'+err.message);
    console.log(result);
}) */

// 修改数据库中的数据
const user  = {uname:'大红',age:5,gender:'母'};
const sql = 'update users set ? where id =?';
conn.query(sql,[user,user.id],(err,result) => {
    if(err)  return console.log('获取数据失败'+err.message);
    console.log(result);
}) 

