    var headerH;
    apiready = function () {
        api.parseTapmode();
        showFg();
        goToText(0);
    }
    // 3d展示间
    function showFg() {
        var coverFlow = api.require('coverFlow');
        var paths =[
            'image/1.jpg',
            'image/2.jpg',
            'image/3.jpg',
            'image/4.jpg'
            ];
        coverFlow.open({
            x: 0,
            y: 0,
            w: api.winWidth,
            h: .5 * api.frameHeight,
            bgColor: '#59493f',
            paths: [
            'widget://'+paths[0],
            'widget://'+paths[1],
            'widget://'+paths[2],
            'widget://'+paths[3]
            ],
            fixedOn: api.frameName
        }, function (ret, err) {
            if (ret) {
                console.log(JSON.stringify(ret));
                $('.main').css({ "background-image":"url(../"+paths[ret.index] +")" });
                goToText(ret.index);
            } else {
                alert(JSON.stringify(err));
            }
        });
    }

    function goToText(index) {
        api.execScript({
                    frameName: 'fg_detail_text',
                    script:'gogogo('+ JSON.stringify(index)  +');'
                });
        api.openFrame({
                    name: 'fg_detail_text',
                    url: 'fg_detail_text.html',
                    bounces: false,
                    rect: {
                        x: 0,
                        y: 0.5 * api.winHeight,
                        w: 'auto',
                        h: 'auto'
                    },
                    animation:{
                        type:'move-in',
                        subType:"from_bottom",
                        duration:2000
                    },
                    pageParam:index,
                    reload:false
                });
               
    }
    
    // -------------hx10 ------------
function div10() {
    var db = require('./db.js');


    function User(user) {
        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.mobile = user.mobile;
        this.isDelete = user.isDelete;
    };
    User.queryUser = function (page, callback) {
        var selectSql = 'select * from user ';
        selectSql += " LIMIT ?,?";
        db.query(selectSql, [(page.page - 1) * page.size, page.size], function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result;
            callback(err, data);
        });
    };
    User.queryUserMessage = function (id, callback) {
        var selectSql = 'select * from user where id=?';
        db.query(selectSql, [id], function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result[0];
            callback(err, data);
        });
    };

    User.updateUser = function (user, callback) {
        var selectSql = 'UPDATE user SET isDelete =? WHERE id=?';
        db.query(selectSql, [parseInt(user.isDelete), user.id], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    User.countUser = function (callback) {
        var selectSql = 'SELECT count(id) as count FROM user ';
        db.query(selectSql, function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result[0];
            callback(err, data);
        });
    };
    User.getUserById = function (id, callback) {
        var selectSql = 'select * from user where id = ?';
        db.query(selectSql, [id], function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result[0];
            callback(err, data);
        });
    };
    User.getUserByName = function (username, callback) {
        var selectSql = 'select * from user where username = ?';
        db.query(selectSql, [username], function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result;
            callback(err, data);
        });
    };
    User.getUserByMobile = function (mobile, callback) {
        var selectSql = 'select * from user where mobile = ?';
        db.query(selectSql, [mobile], function (err, result) {
            if (err) {
                return callback(err);
            }
            var data = result;
            callback(err, data);
        });
    };
    User.addUser = function (user, callback) {
        var selectSql = 'insert into user (id,username,password,mobile,isDelete)  values (null,?,?,?,?)';
        db.query(selectSql, [user.username, user.password, user.mobile, user.isDelete], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    User.updatePassword = function (id, password, callback) {
        var selectSql = 'UPDATE user SET password =? WHERE id=?';
        db.query(selectSql, [password, id], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    module.exports = User;

}

