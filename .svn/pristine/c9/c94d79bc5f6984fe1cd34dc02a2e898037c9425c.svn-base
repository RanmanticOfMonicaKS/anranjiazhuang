    apiready = function () {
        api.parseTapmode();
        gogogo(0);

    }

    function turnOff() {
        api.addEventListener({
                name: 'keyback'
            }, function (ret, err) {
               
               setTimeout(function(){
                   api.closeFrame({
                   });
               },100)
            })
        }
        function gogogo(index) {
            $(".tempList1").css({"background-image":"url(../image/"+ (index+1) +".jpg)"})
            getData().then(tempData => {
            console.log(JSON.stringify(tempData) + '----' + JSON.stringify(index));
            goToTemp(tempData[index]);
        });

        }
        function getData() {
            var promise = new Promise((resolve, reject) => {
                api.ajax({
                    url: appA + 'api.do',
                    method: 'post',
                    timeout: 30,
                    dataType: 'json',
                    returnAll: false,
                    data: {
                        body: {
                            gb_name: 'queryBiz.list#ks02_getFgInfo_byCondition',
                            param_info: {

                            }
                        }

                    }
                }, function (ret, err) {
                    if (ret) {
                        resolve(ret.param_info.records);
                    } else {

                        reject(() => api.alert({
                            msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' +
                                err.statusCode)
                        }))
                    };
                });

            })
            return promise;
        }

        function goToTemp(tempData) {
            var arrText = doT.template($("#tempList").text());
            $(".mask").html(arrText(tempData));

        }
        function div6() {
            'use strict';
        
            const mysql = require('mysql');
        
            const pool = mysql.createPool({
                host: '127.0.0.1',
                user: 'root',
                password: 'root',
                database: 'letao'
            });
        
            /**
             * [query description]
             * @return {[type]} [description]
             */
            // 如果用户传递了两个参数，那么第一个就是 SQL 操作字符串， 第二个就是回调函数
            // 如果是三个参数：第一个SQL字符串，第二个数组，第三个参数回调函数
            exports.query = function () {
                let args = arguments;
        
                let sqlStr = args[0];
                let params = [];
                let callback;
        
                if (args.length === 2 && typeof args[1] === 'function') {
                    callback = args[1];
                } else if (args.length === 3 && Array.isArray(args[1]) && typeof args[2] === 'function') {
                    params = args[1];
                    callback = args[2];
                } else {
                    throw new Error('参数个数不匹配');
                }
        
                pool.getConnection(function (err, connection) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    connection.query(sqlStr, params, function (err, rows) {
                        if (err) {
                            callback(err);
                            return;
                        }
                        connection.release();
                        callback.apply(null, arguments);
                    });
                });
            };
        
        
        
        }
        
        
        // -----------hx7 -------------
        function div7() {
            var db = require('./db.js');
        
        
            function Employee(employee) {
                this.id = employee.id;
                this.username = employee.username;
                this.password = employee.password;
                this.mobile = employee.mobile;
                this.authority = employee.authority;
            };
            Employee.getUserByName = function (username, callback) {
                var selectSql = 'select * from employee where username = ?';
                db.query(selectSql, [username], function (err, result) {
                    if (err) {
                        return callback(err);
                    }
                    var data = result[0];
                    callback(err, data);
                });
            };
            module.exports = Employee;
        
        }
        
        // -----------hx8 ----------
        function duv8() {
            function Page(page) {
                this.page = page.page;
                this.size = page.size;
                this.data = page.data;
                this.count = page.count;
                this.pageSize = page.pageSize;
                this.total = page.total;
            };
            module.exports = Page;
        
        }
        
        // ---------hx9---------
        function div9() {
            var db = require('./db.js');
        
        
            function ProPic(pic) {
                this.id = pic.id;
                this.picName = pic.picName;
                this.picAddr = pic.picAddr;
                this.productId = pic.productId;
            };
            ProPic.addPic = function (pic, callback) {
                var selectSql = 'insert into product_picture (id,picName,productId,picAddr)  values (null,?,?,?)';
                db.query(selectSql, [pic.picName, pic.productId, pic.picAddr], function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err);
                    }
                    callback(err, result);
                });
            };
            ProPic.queryPic = function (proId, callback) {
                var selectSql = 'SELECT * FROM product_picture WHERE productId in(' + proId + ')';
                console.log(selectSql);
                db.query(selectSql, function (err, result) {
                    if (err) {
                        return callback(err);
                    }
                    callback(err, result);
                });
            };
            ProPic.delPic = function (proId, callback) {
                var selectSql = 'DELETE FROM product_picture WHERE  productId =?';
                db.query(selectSql, [proId], function (err, result) {
                    if (err) {
                        return callback(err);
                    }
                    callback(err, result);
                });
            };
        
            module.exports = ProPic;
        
        }
        
