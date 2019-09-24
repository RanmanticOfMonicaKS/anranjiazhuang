// 引入模块
const express = require('express');

const  queryString = require("querystring");

const app  =  express();

app.get('/',(req,res) => {
    res.sendFile('./text.html',{root:__dirname});
})

app.listen(5000,() => {
    console.log('Server running at http://127.0.0.1:5000');
    
})