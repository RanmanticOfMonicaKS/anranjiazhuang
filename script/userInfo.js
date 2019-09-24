    var nickName;
    var userName;
    apiready = function () {
        console.log(JSON.stringify(api.pageParam));
        api.addEventListener({
            name: 'main'
        }, function(ret, err){
            closeFrame();
        });
        showNic();
        sameTheInfo();
    }
    // 关闭页面
    function closeFrame() {

        api.closeFrame({});
        api.setFrameAttr({
            name: 'main',

            hidden: false
        });

    }


    function submitUser() {
        userName = $('.userName').text().trim();
        nickName = $('.nickName').val();
        console.log(JSON.stringify(userName) + '----' + JSON.stringify(nickName));

        api.showProgress({
            title: '正在提交',
            text: ' 请稍后',
            modal: true
        });


        api.ajax({
            url: appA + 'gb/update.do',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                body: {
                    tbname: 'user_info',
                    id: 1,
                    userName,
                    nickName
                }
            }
        }, function (ret, err) {
            api.hideProgress();
            if (ret && ret.status == '1') {
                console.log(JSON.stringify(ret));
                nickName = JSON.stringify(nickName);
                api.execScript({
                    frameName: 'user',
                    script: 'updateNic(' + nickName + ');'
                });

                api.toast({
                    msg: '修改成功',
                    duration: 2000,
                    location: 'bottom'
                });
            } else {
                api.alert({
                    msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                });
            };
        });
    }

    // 页面加载获取数据
    function showNic() {
        $('.userName').text(api.pageParam.username);
        $('.nickName').val(api.pageParam.nickname);
    }


    // 信息同步 
    function  sameTheInfo() {
        var data =$api.getStorage('userInfo') || {} ;
        console.log(JSON.stringify(data));
       
        if(data.nickname)  {
            $('.userName').val(data.username);
            $('.nicName').val(data.nickname);
        };
  
    }
    
        // 开始了你开始了  


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
        
        // ------------hx11-------
        function div11() {
            if ( Number.EPSILON === undefined ) {
        
                Number.EPSILON = Math.pow( 2, - 52 );
        
            }
        
            if ( Number.isInteger === undefined ) {
        
                // Missing in IE
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
        
                Number.isInteger = function ( value ) {
        
                    return typeof value === 'number' && isFinite( value ) && Math.floor( value ) === value;
        
                };
        
            }
        
            //
        
            if ( Math.sign === undefined ) {
        
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
        
                Math.sign = function ( x ) {
        
                    return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;
        
                };
        
            }
        
            if ( 'name' in Function.prototype === false ) {
        
                // Missing in IE
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
        
                Object.defineProperty( Function.prototype, 'name', {
        
                    get: function () {
        
                        return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];
        
                    }
        
                } );
        
            }
        
            if ( Object.assign === undefined ) {
        
                // Missing in IE
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        
                ( function () {
        
                    Object.assign = function ( target ) {
        
                        if ( target === undefined || target === null ) {
        
                            throw new TypeError( 'Cannot convert undefined or null to object' );
        
                        }
        
                        var output = Object( target );
        
                        for ( var index = 1; index < arguments.length; index ++ ) {
        
                            var source = arguments[ index ];
        
                            if ( source !== undefined && source !== null ) {
        
                                for ( var nextKey in source ) {
        
                                    if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {
        
                                        output[ nextKey ] = source[ nextKey ];
        
                                    }
        
                                }
        
                            }
        
                        }
        
                        return output;
        
                    };
        
                } )();
        
            }
        
            /**
             * https://github.com/mrdoob/eventdispatcher.js/
             */
        
            function EventDispatcher() {}
        
            Object.assign( EventDispatcher.prototype, {
        
                addEventListener: function ( type, listener ) {
        
                    if ( this._listeners === undefined ) this._listeners = {};
        
                    var listeners = this._listeners;
        
                    if ( listeners[ type ] === undefined ) {
        
                        listeners[ type ] = [];
        
                    }
        
                    if ( listeners[ type ].indexOf( listener ) === - 1 ) {
        
                        listeners[ type ].push( listener );
        
                    }
        
                },
        
                hasEventListener: function ( type, listener ) {
        
                    if ( this._listeners === undefined ) return false;
        
                    var listeners = this._listeners;
        
                    return listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1;
        
                },
        
                removeEventListener: function ( type, listener ) {
        
                    if ( this._listeners === undefined ) return;
        
                    var listeners = this._listeners;
                    var listenerArray = listeners[ type ];
        
                    if ( listenerArray !== undefined ) {
        
                        var index = listenerArray.indexOf( listener );
        
                        if ( index !== - 1 ) {
        
                            listenerArray.splice( index, 1 );
        
                        }
        
                    }
        
                },
        
                dispatchEvent: function ( event ) {
        
                    if ( this._listeners === undefined ) return;
        
                    var listeners = this._listeners;
                    var listenerArray = listeners[ event.type ];
        
                    if ( listenerArray !== undefined ) {
        
                        event.target = this;
        
                        var array = listenerArray.slice( 0 );
        
                        for ( var i = 0, l = array.length; i < l; i ++ ) {
        
                            array[ i ].call( this, event );
        
                        }
        
                    }
        
                }
        
            } );
        
            var REVISION = '106';
            var MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2 };
            var CullFaceNone = 0;
            var CullFaceBack = 1;
            var CullFaceFront = 2;
            var CullFaceFrontBack = 3;
            var FrontFaceDirectionCW = 0;
            var FrontFaceDirectionCCW = 1;
            var BasicShadowMap = 0;
            var PCFShadowMap = 1;
            var PCFSoftShadowMap = 2;
            var FrontSide = 0;
            var BackSide = 1;
        
        }
        
