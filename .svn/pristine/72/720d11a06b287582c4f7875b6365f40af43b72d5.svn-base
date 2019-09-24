// http://127.0.0.1:3001/user/10/zs
const express = require('express');

const app = express();

app.get('/user/:id/:name',(req,res) => {
    console.log(req.params);
    res.send(req.params)
})

app.listen(3001,() => {
    console.log('Server running at http://127.0.0.1:3001');
    
})