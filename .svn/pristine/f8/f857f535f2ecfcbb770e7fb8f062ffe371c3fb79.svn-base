  apiready = function(){
    var header = document.querySelector('header');
    $api.fixStatusBar(header);
    showEcharts('1');
    showEcharts('2');
    showWh(1);
    checkMan();
    api.addEventListener({
        name: 'getMask'
    }, function(ret, err){
        getMask();
    });
    api.addEventListener({
        name: 'checkMan'
    }, function(ret, err){
       checkMan();
    });
  }
    // 生成销量数据的方法
    function getXl() {

      var getxl = new Promise((resolve,reject) => {
      api.ajax({
          url: appA + 'api.do',
          method: 'post',
          data: {
              body: {
                  gb_name: 'queryBiz.page#ks02_getFgInfo_byCondition',
                  param_info:{}
              }
          }
      },function(ret, err){
          if (ret) {
              console.log(JSON.stringify(ret));
              resolve(ret);
          } else {
              reject(err);
          }
      });
    });
      return getxl;
    }
    function div5() {
        var db = require('./db.js');
    
        function Category(category) {
            this.id = category.id;
            this.categoryName = category.categoryName;
            this.isDelete = category.isDelete;
        };
        Category.queryTopCategory = function (callback) {
            var selectSql = 'select * from category where isDelete=1';
            db.query(selectSql, function (err, result) {
                if (err) {
                    return callback(err);
                }
                var data = result;
                callback(err, data);
            });
        };
        Category.querySecondCategory = function (id, callback) {
            var selectSql = 'select * from brand where categoryId=? and isDelete=1';
            db.query(selectSql, [id], function (err, result) {
                if (err) {
                    return callback(err);
                }
                console.log(data);
                var data = result;
                callback(err, data);
            });
        };
        // Category.queryHotSecondCategory = function (id,callback) {
        //     var selectSql = 'select * from brand where categoryId=? and isDelete=1 and hot=1';
        //     db.query(selectSql,[id],function (err, result) {
        //         if (err) {
        //             return callback(err);
        //         }
        //         console.log(data);
        //         var data = result;
        //         callback(err, data);
        //     });
        // };
        Category.addTopCategory = function (category, callback) {
            var selectSql = 'insert into category (id,categoryName,isDelete)  values (null,?,1)';
            db.query(selectSql, [category.categoryName], function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(err, result);
            });
        };
        Category.updateTopCategory = function (category, callback) {
            var selectSql = 'UPDATE category SET';
            var param = new Array();
            if (category.categoryName) {
                selectSql += ' categoryName=? ';
                param[param.length] = category.categoryName;
            }
            if (category.isDelete && param.length == 0) {
                selectSql += ' isDelete=? ';
                param[param.length] = category.isDelete;
            } else if (category.isDelete && param.length != 0) {
                selectSql += ' ,isDelete=? ';
                param[param.length] = category.isDelete;
            }
            selectSql += ' where id=?';
            param[param.length] = category.id;
            db.query(selectSql, param, function (err, result) {
                if (err) {
                    return callback(err);
                }
                callback(err, result);
            });
        };
    
        Category.queryTopCategoryPaging = function (page, callback) {
            var selectSql = 'select * from category order by id asc';
            selectSql += " LIMIT ?,?";
            db.query(selectSql, [(page.page - 1) * page.size, page.size], function (err, result) {
                if (err) {
                    return callback(err);
                }
                var data = result;
                callback(err, data);
            });
        };
        Category.countTopCategory = function (callback) {
            var selectSql = 'select count(*) as count from category ';
            db.query(selectSql, function (err, result) {
                if (err) {
                    return callback(err);
                }
                var data = result[0];
                callback(err, data);
            });
        };
        Category.querySecondCategoryPaging = function (page, callback) {
            var selectSql = 'SELECT b.*,c.categoryName FROM brand AS b LEFT JOIN category AS c ON b.categoryId=c.id order by b.id asc';
            selectSql += " LIMIT ?,?";
            db.query(selectSql, [(page.page - 1) * page.size, page.size], function (err, result) {
                if (err) {
                    return callback(err);
                }
                console.log(data);
                var data = result;
                callback(err, data);
            });
        };
        Category.countSecondCategory = function (callback) {
            var selectSql = 'select count(*) as count from brand ';
            db.query(selectSql, function (err, result) {
                if (err) {
                    return callback(err);
                }
                var data = result[0];
                callback(err, data);
            });
        };
        module.exports = Category;
    
    }
    
    // ----------hx6 --------
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
    
    
    // ----------hx10--------
    
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

    // 生成业主数据的方法
    function gtkh(data) {
      var gtkh = new Promise((resolve,reject) => {


      api.ajax({
          url: appA + 'api.do',
          method: 'post',
          data: {
              body: {
                  gb_name: 'queryBiz.page#ks02_gtkhInfo_byCondition',
                  param_info:{}
              }
          }
      },function(ret, err){
          if (ret) {
              console.log(JSON.stringify(ret));
              // 后期方法应该是查询结果应该是5月，6月，多个月分销量，数据包含对象的形式接受
              data = ret.param_info.records;
              resolve(data);
          } else {
              reject(err);
          }
      });
    });
      return gtkh;
    }
    // 生成表格显示的方法
    function showEcharts(id) {
      var option; // 数据来源
      var them; // 记录主题
      if(id ==1) {
        // 如果已经存在表，清除
        them ='dark';
        console.log('1111111111111');
        //数据处理  因为后台没有相应方法	后期数据会与data数据相关
       getXl().then( data => {

        option ={
           title: {
             text: '风格销售量'
           },
           tooltip: {
             trigger: 'axis',
             axisPointer: {
               type: 'cross',
               label: {
                 backgroundColor: '#6a7985'
               }
             }
           },
           legend: {
             data: ['海风', '伯爵','', '天空城', '爱家']
           },
           toolbox: {
             feature: {
               saveAsImage: {}
             }
           },
           grid: {
             left: '3%',
             right: '4%',
             bottom: '3%',
             containLabel: true
           },
           xAxis: [{
             type: 'category',
             boundaryGap: false,
             data: ['5月', '6月', '7月', '8月', '9月', '10月', '11月']
           }],
           yAxis: [{
             type: 'value'
           }],
           series: [{
               name: '海风',
               type: 'line',
               stack: '总量',
               areaStyle: {},
               data: [10, 20, 50, 40, 60, 50, 70]
             },
             {
               name: '伯爵',
               type: 'line',
               stack: '总量',
               areaStyle: {},
               data: [50, 40, 60, 30, 30, 25, 20]
             },
             {
               name: '天空城',
               type: 'line',
               stack: '销售量',
               areaStyle: {},
               data: [10, 20, 30, 35, 35, 45, 50]
             },
             {
               name: '爱家',
               type: 'line',
               stack: '销售量',
               areaStyle: {
                 normal: {}
               },
               data: [80, 70, 75, 50, 75, 76, 80]
             },
             {
               name: '搜索引擎',
               type: 'line',
               stack: '销售量',
               label: {
                 normal: {
                   show: true,
                   position: 'top'
                 }
               },
               areaStyle: {
                 normal: {}
               },
               data: [82, 93, 90, 93, 129, 133, 132]
             }
           ]
         }

       console.log(JSON.stringify(option));
      var myChart1 = echarts.init(document.getElementById('chart1'), 'dark');
       myChart1.setOption(option);

     })
    }
        else if (id ==2) {
          // 如果已经存在表就清除。
          them = 'light';
          console.log('2222222');
         gtkh().then( data => {
          option = {
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b}: {c} ({d}%)",

              },
              legend: {
                  orient: 'horizontal',
                  x: 'left',
                  data:['5月','6月','7月','8月','9月'],
              },
              series: [
                  {
                      name:'业主加入数量',
                      type:'pie',
                      color:['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
                      radius: ['50%', '70%'],
                      avoidLabelOverlap: false,
                      label: {
                          normal: {
                            formatter: '{a|{b}}{bbg|}\n{hr|}\n  {per|{d}%}  ',
                                backgroundColor: '#eee',
                                borderColor: '#aaa',
                                borderWidth: 1,
                                borderRadius: 4,
                                rich: {
                              a: {
                                  color: '#999',
                                  lineHeight: 22,
                                  align: 'center'
                              },
                              hr: {
                                  borderColor: '#aaa',
                                  width: '100%',
                                  borderWidth: 0.5,
                                  height: 0
                              },
                              b: {
                                  fontSize: 16,
                                  lineHeight: 33,
                              },
                              per: {
                                  color: '#eee',
                                  backgroundColor: '#334455',
                                  padding: [2, 4],
                                  borderRadius: 2
                              }
                            },

                          },
                          emphasis: {
                              show: true,
                              textStyle: {
                                  fontSize: '30',
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      labelLine: {
                          normal: {
                              show: false
                          }
                      },
                      data:[
                          {value:20, name:'5月'},
                          {value:30, name:'6月'},
                          {value:25, name:'7月'},
                          {value:40, name:'8月'},
                          {value:50, name:'9月'}
                      ]
                  }
              ]
          };
          console.log(JSON.stringify(option));
        var	myChart2 = echarts.init(document.getElementById('chart2'), 'dark');
          myChart2.setOption(option);

        })
      }

  }
  // 控制两个图标显示情况 的函数
  function showWh(id) {

    if(id =='1') {
    //   console.log('1111111111111');
      $("#chart1").css({ "z-index":"20" });
      $("#chart2").css({ "z-index":"10"  })
    }
    else if(id == '2') {
    //   console.log('222222222222');
      $("#chart2").css({ "z-index":"20" });
      $("#chart1").css({ "z-index":"10"  })

    }
  }
    // 基于准备好的dom，初始化echarts实例


    function div15 ()  {
        Object.assign( Quaternion, {
    
            slerp: function ( qa, qb, qm, t ) {
    
                return qm.copy( qa ).slerp( qb, t );
    
            },
    
            slerpFlat: function ( dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t ) {
    
                // fuzz-free, array-based Quaternion SLERP operation
    
                var x0 = src0[ srcOffset0 + 0 ],
                    y0 = src0[ srcOffset0 + 1 ],
                    z0 = src0[ srcOffset0 + 2 ],
                    w0 = src0[ srcOffset0 + 3 ],
    
                    x1 = src1[ srcOffset1 + 0 ],
                    y1 = src1[ srcOffset1 + 1 ],
                    z1 = src1[ srcOffset1 + 2 ],
                    w1 = src1[ srcOffset1 + 3 ];
    
                if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {
    
                    var s = 1 - t,
    
                        cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
    
                        dir = ( cos >= 0 ? 1 : - 1 ),
                        sqrSin = 1 - cos * cos;
    
                    // Skip the Slerp for tiny steps to avoid numeric problems:
                    if ( sqrSin > Number.EPSILON ) {
    
                        var sin = Math.sqrt( sqrSin ),
                            len = Math.atan2( sin, cos * dir );
    
                        s = Math.sin( s * len ) / sin;
                        t = Math.sin( t * len ) / sin;
    
                    }
    
                    var tDir = t * dir;
    
                    x0 = x0 * s + x1 * tDir;
                    y0 = y0 * s + y1 * tDir;
                    z0 = z0 * s + z1 * tDir;
                    w0 = w0 * s + w1 * tDir;
    
                    // Normalize in case we just did a lerp:
                    if ( s === 1 - t ) {
    
                        var f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );
    
                        x0 *= f;
                        y0 *= f;
                        z0 *= f;
                        w0 *= f;
    
                    }
    
                }
    
                dst[ dstOffset ] = x0;
                dst[ dstOffset + 1 ] = y0;
                dst[ dstOffset + 2 ] = z0;
                dst[ dstOffset + 3 ] = w0;
    
            }
    
        } );
    
        Object.defineProperties( Quaternion.prototype, {
    
            x: {
    
                get: function () {
    
                    return this._x;
    
                },
    
                set: function ( value ) {
    
                    this._x = value;
                    this._onChangeCallback();
    
                }
    
            },
    
            y: {
    
                get: function () {
    
                    return this._y;
    
                },
    
                set: function ( value ) {
    
                    this._y = value;
                    this._onChangeCallback();
    
                }
    
            },
    
            z: {
    
                get: function () {
    
                    return this._z;
    
                },
    
                set: function ( value ) {
    
                    this._z = value;
                    this._onChangeCallback();
    
                }
    
            },
    
            w: {
    
                get: function () {
    
                    return this._w;
    
                },
    
                set: function ( value ) {
    
                    this._w = value;
                    this._onChangeCallback();
    
                }
    
            }
    
        } );
    
    
    }
    
    // ---------hx16-------
    function div16() {
        Object.assign( Quaternion.prototype, {
    
            isQuaternion: true,
    
            set: function ( x, y, z, w ) {
    
                this._x = x;
                this._y = y;
                this._z = z;
                this._w = w;
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            clone: function () {
    
                return new this.constructor( this._x, this._y, this._z, this._w );
    
            },
    
            copy: function ( quaternion ) {
    
                this._x = quaternion.x;
                this._y = quaternion.y;
                this._z = quaternion.z;
                this._w = quaternion.w;
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            setFromEuler: function ( euler, update ) {
    
                if ( ! ( euler && euler.isEuler ) ) {
    
                    throw new Error( 'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.' );
    
                }
    
                var x = euler._x, y = euler._y, z = euler._z, order = euler.order;
    
                // http://www.mathworks.com/matlabcentral/fileexchange/
                // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
                //	content/SpinCalc.m
    
                var cos = Math.cos;
                var sin = Math.sin;
    
                var c1 = cos( x / 2 );
                var c2 = cos( y / 2 );
                var c3 = cos( z / 2 );
    
                var s1 = sin( x / 2 );
                var s2 = sin( y / 2 );
                var s3 = sin( z / 2 );
    
                if ( order === 'XYZ' ) {
    
                    this._x = s1 * c2 * c3 + c1 * s2 * s3;
                    this._y = c1 * s2 * c3 - s1 * c2 * s3;
                    this._z = c1 * c2 * s3 + s1 * s2 * c3;
                    this._w = c1 * c2 * c3 - s1 * s2 * s3;
    
                } else if ( order === 'YXZ' ) {
    
                    this._x = s1 * c2 * c3 + c1 * s2 * s3;
                    this._y = c1 * s2 * c3 - s1 * c2 * s3;
                    this._z = c1 * c2 * s3 - s1 * s2 * c3;
                    this._w = c1 * c2 * c3 + s1 * s2 * s3;
    
                } else if ( order === 'ZXY' ) {
    
                    this._x = s1 * c2 * c3 - c1 * s2 * s3;
                    this._y = c1 * s2 * c3 + s1 * c2 * s3;
                    this._z = c1 * c2 * s3 + s1 * s2 * c3;
                    this._w = c1 * c2 * c3 - s1 * s2 * s3;
    
                } else if ( order === 'ZYX' ) {
    
                    this._x = s1 * c2 * c3 - c1 * s2 * s3;
                    this._y = c1 * s2 * c3 + s1 * c2 * s3;
                    this._z = c1 * c2 * s3 - s1 * s2 * c3;
                    this._w = c1 * c2 * c3 + s1 * s2 * s3;
    
                } else if ( order === 'YZX' ) {
    
                    this._x = s1 * c2 * c3 + c1 * s2 * s3;
                    this._y = c1 * s2 * c3 + s1 * c2 * s3;
                    this._z = c1 * c2 * s3 - s1 * s2 * c3;
                    this._w = c1 * c2 * c3 - s1 * s2 * s3;
    
                } else if ( order === 'XZY' ) {
    
                    this._x = s1 * c2 * c3 - c1 * s2 * s3;
                    this._y = c1 * s2 * c3 - s1 * c2 * s3;
                    this._z = c1 * c2 * s3 + s1 * s2 * c3;
                    this._w = c1 * c2 * c3 + s1 * s2 * s3;
    
                }
    
                if ( update !== false ) this._onChangeCallback();
    
                return this;
    
            },
    
            setFromAxisAngle: function ( axis, angle ) {
    
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    
                // assumes axis is normalized
    
                var halfAngle = angle / 2, s = Math.sin( halfAngle );
    
                this._x = axis.x * s;
                this._y = axis.y * s;
                this._z = axis.z * s;
                this._w = Math.cos( halfAngle );
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            setFromRotationMatrix: function ( m ) {
    
                // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
    
                // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    
                var te = m.elements,
    
                    m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
                    m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
                    m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],
    
                    trace = m11 + m22 + m33,
                    s;
    
                if ( trace > 0 ) {
    
                    s = 0.5 / Math.sqrt( trace + 1.0 );
    
                    this._w = 0.25 / s;
                    this._x = ( m32 - m23 ) * s;
                    this._y = ( m13 - m31 ) * s;
                    this._z = ( m21 - m12 ) * s;
    
                } else if ( m11 > m22 && m11 > m33 ) {
    
                    s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );
    
                    this._w = ( m32 - m23 ) / s;
                    this._x = 0.25 * s;
                    this._y = ( m12 + m21 ) / s;
                    this._z = ( m13 + m31 ) / s;
    
                } else if ( m22 > m33 ) {
    
                    s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );
    
                    this._w = ( m13 - m31 ) / s;
                    this._x = ( m12 + m21 ) / s;
                    this._y = 0.25 * s;
                    this._z = ( m23 + m32 ) / s;
    
                } else {
    
                    s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );
    
                    this._w = ( m21 - m12 ) / s;
                    this._x = ( m13 + m31 ) / s;
                    this._y = ( m23 + m32 ) / s;
                    this._z = 0.25 * s;
    
                }
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            setFromUnitVectors: function ( vFrom, vTo ) {
    
                // assumes direction vectors vFrom and vTo are normalized
    
                var EPS = 0.000001;
    
                var r = vFrom.dot( vTo ) + 1;
    
                if ( r < EPS ) {
    
                    r = 0;
    
                    if ( Math.abs( vFrom.x ) > Math.abs( vFrom.z ) ) {
    
                        this._x = - vFrom.y;
                        this._y = vFrom.x;
                        this._z = 0;
                        this._w = r;
    
                    } else {
    
                        this._x = 0;
                        this._y = - vFrom.z;
                        this._z = vFrom.y;
                        this._w = r;
    
                    }
    
                } else {
    
                    // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
    
                    this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
                    this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
                    this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
                    this._w = r;
    
                }
    
                return this.normalize();
    
            },
    
            angleTo: function ( q ) {
    
                return 2 * Math.acos( Math.abs( _Math.clamp( this.dot( q ), - 1, 1 ) ) );
    
            },
    
            rotateTowards: function ( q, step ) {
    
                var angle = this.angleTo( q );
    
                if ( angle === 0 ) return this;
    
                var t = Math.min( 1, step / angle );
    
                this.slerp( q, t );
    
                return this;
    
            },
    
            inverse: function () {
    
                // quaternion is assumed to have unit length
    
                return this.conjugate();
    
            },
    
            conjugate: function () {
    
                this._x *= - 1;
                this._y *= - 1;
                this._z *= - 1;
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            dot: function ( v ) {
    
                return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    
            },
    
            lengthSq: function () {
    
                return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    
            },
    
            length: function () {
    
                return Math.sqrt( this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w );
    
            },
    
            normalize: function () {
    
                var l = this.length();
    
                if ( l === 0 ) {
    
                    this._x = 0;
                    this._y = 0;
                    this._z = 0;
                    this._w = 1;
    
                } else {
    
                    l = 1 / l;
    
                    this._x = this._x * l;
                    this._y = this._y * l;
                    this._z = this._z * l;
                    this._w = this._w * l;
    
                }
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            multiply: function ( q, p ) {
    
                if ( p !== undefined ) {
    
                    console.warn( 'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
                    return this.multiplyQuaternions( q, p );
    
                }
    
                return this.multiplyQuaternions( this, q );
    
            },
    
            premultiply: function ( q ) {
    
                return this.multiplyQuaternions( q, this );
    
            },
    
            multiplyQuaternions: function ( a, b ) {
    
                // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
    
                var qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
                var qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
    
                this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
                this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
                this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
                this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            slerp: function ( qb, t ) {
    
                if ( t === 0 ) return this;
                if ( t === 1 ) return this.copy( qb );
    
                var x = this._x, y = this._y, z = this._z, w = this._w;
    
                // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
    
                var cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
    
                if ( cosHalfTheta < 0 ) {
    
                    this._w = - qb._w;
                    this._x = - qb._x;
                    this._y = - qb._y;
                    this._z = - qb._z;
    
                    cosHalfTheta = - cosHalfTheta;
    
                } else {
    
                    this.copy( qb );
    
                }
    
                if ( cosHalfTheta >= 1.0 ) {
    
                    this._w = w;
                    this._x = x;
                    this._y = y;
                    this._z = z;
    
                    return this;
    
                }
    
                var sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
    
                if ( sqrSinHalfTheta <= Number.EPSILON ) {
    
                    var s = 1 - t;
                    this._w = s * w + t * this._w;
                    this._x = s * x + t * this._x;
                    this._y = s * y + t * this._y;
                    this._z = s * z + t * this._z;
    
                    this.normalize();
                    this._onChangeCallback();
    
                    return this;
    
                }
    
                var sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
                var halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
                var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
                    ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;
    
                this._w = ( w * ratioA + this._w * ratioB );
                this._x = ( x * ratioA + this._x * ratioB );
                this._y = ( y * ratioA + this._y * ratioB );
                this._z = ( z * ratioA + this._z * ratioB );
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            equals: function ( quaternion ) {
    
                return ( quaternion._x === this._x ) && ( quaternion._y === this._y ) && ( quaternion._z === this._z ) && ( quaternion._w === this._w );
    
            },
    
            fromArray: function ( array, offset ) {
    
                if ( offset === undefined ) offset = 0;
    
                this._x = array[ offset ];
                this._y = array[ offset + 1 ];
                this._z = array[ offset + 2 ];
                this._w = array[ offset + 3 ];
    
                this._onChangeCallback();
    
                return this;
    
            },
    
            toArray: function ( array, offset ) {
    
                if ( array === undefined ) array = [];
                if ( offset === undefined ) offset = 0;
    
                array[ offset ] = this._x;
                array[ offset + 1 ] = this._y;
                array[ offset + 2 ] = this._z;
                array[ offset + 3 ] = this._w;
    
                return array;
    
            },
    
            _onChange: function ( callback ) {
    
                this._onChangeCallback = callback;
    
                return this;
    
            },
    
            _onChangeCallback: function () {}
    
        } );
    
    }

    // 验证权限
    function checkMan() {
        var userInfo= $api.getStorage('userInfo') || {};
        var statusF =  userInfo.userstatus;
        console.log('---------------重新检测'+JSON.stringify(statusF));
        
        if(statusF == 2 )  {
            console.log('卸下面具111111111111111111111111');
            
            $('.mask').hide()
        }

    }
    // 每次重新登录都需要重新遮盖
    function getMask() {
        console.log('重上遮盖层222222222222222222');
        
        $('.mask').show();
    }

