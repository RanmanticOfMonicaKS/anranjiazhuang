var current_page = 0;
var pagesize = 3;
var maxPage;

apiready = function () {
    $(".noMore").hide();
    // 第一次执行渲染模板，且得到最大页数
    showPageDd().then(tempData => {
        goToTemp(tempData);
        getMaxPage(tempData);
        editClick();
    });
    getMore();
}
//  --------hx1---------
function div1() {
    var express = require("express");

    //引入http包
    var http = require("http");

    //引入xml2js包
    var xml2js = require("xml2js");
    //创建xml->js的对象
    var parser = new xml2js.Parser({
        explicitArray: false
    });
    //创建js->xml的对象
    var builder = new xml2js.Builder({
        rootName: "xml",
        cdata: true,
        headless: true
    });

    //2. 创建express实例
    var app = express();

    //3. 设置路由
    app.get("/", function (req, res) {
        // console.log("有人来请求了！！");
        //当配置了微信公众号的服务器URL之后，微信服务器会向当前地址发送一个校验请求
        //校验请求是一个get请求，参数中携带了一个echostr
        //我们需要将这个echostr原样返回给微信服务器，返回成功之后，校验成功，开发者配置生效

        //1. express中获取get请求的参数
        console.log(req.query);

        //2. 将请求参数中的echostr原样返回给 微信服务器即可通过验证
        res.send(req.query.echostr);
    })

    //添加post的路由，处理微信服务器转发过来的用户的消息
    app.post("/", function (req, res) {
        // console.log("用户发送消息了");
        //1. 获取post请求中的内容

        var bufferList = [];
        req.on("data", function (chunk) {
            bufferList.push(chunk);
        })

        req.on("end", function () {
            var result = Buffer.concat(bufferList);
            //将获取到的微信服务器发来的消息数据 使用 xml2js转成js对象
            parser.parseString(result.toString(), function (err, msgObj) {

                //声明一个变量，用来保存我们最终要回复给用户的消息
                var msg = "";
                console.log(msgObj);
                //拿到用户的消息之后，通过请求图灵机器人，获取回复内容，将回复内容响应给微信服务器
                //1. 构建请求参数对象
                var data = JSON.stringify({
                    "key": "45d48e2340de40168a1e4a9d76319901",
                    "info": msgObj.xml.Content,
                    "userid": msgObj.xml.FromUserName
                })

                //2. 创建请求对象
                var req = http.request({
                    method: "POST",
                    host: "www.tuling123.com",
                    protocal: "http://",
                    port: "80",
                    path: "/openapi/api",
                    headers: {
                        "Content-Type": 'application/json',
                        "Content-Length": Buffer.byteLength(data)
                    }
                }, function (response) {

                    var bufferList = [];
                    response.on("data", function (chunk) {
                        bufferList.push(chunk);
                    })

                    response.on("end", function () {
                        var result = Buffer.concat(bufferList);
                        //result就是图灵机器人返回来的回复消息
                        msg = JSON.parse(result).text;

                        //将最终要回复给用户的消息，响应给微信服务器
                        //这个消息，也是以xml格式的数据进行发送的

                        //响应给微信服务器的数据中也包含如下几个参数：
                        //ToUserName: '哪个用户发消息来的',
                        //FromUserName: '写自己公众号的id',
                        //CreateTime: 消息的发送时间,
                        //MsgType: 'text',
                        //Content: '要回复给用户的消息'

                        //创建一个回复消息的对象
                        var returnMsg = {
                            ToUserName: msgObj.xml.FromUserName,
                            FromUserName: msgObj.xml.ToUserName,
                            CreateTime: +new Date(),
                            MsgType: "text",
                            Content: msg
                        }

                        //将回复消息对象转换成xml格式的数据，响应给微信服务器
                        res.send(builder.buildObject(returnMsg));
                    })
                })

                //将请求的参数发送给图灵服务器
                req.write(data);
            })
        })
    })


    //4. 开启监听
    app.listen(9999, function () {
        console.log("服务器已经启动:http://wechatitcast.free.ngrok.cc/")
    })
}


// --------------hx2-----
function div2() {
    var db = require('./db.js');

    function Address(address) {
        this.id = address.id;
        this.userId = address.userId;
        this.address = address.address;
        this.addressDetail = address.addressDetail;
        this.isDelete = address.isDelete;
        this.recipients = address.recipients;
        this.postcode = address.postcode;
    };

    Address.addAddress = function (address, callback) {
        var selectSql = 'insert into address (id,userId,address,addressDetail,isDelete,recipients,postcode)  values (null,?,?,?,1,?,?)';
        db.query(selectSql, [address.userId, address.address, address.addressDetail, address.recipients, address.postcode], function (err, result) {
            console.log(err);
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    Address.updateAddress = function (address, callback) {
        var selectSql = 'UPDATE address SET  ';
        var param = new Array();
        if (address.address && param.length == 0) {
            selectSql += ' address=? ';
            param[param.length] = address.address;
        }
        if (address.addressDetail && param.length == 0) {
            selectSql += ' addressDetail=? ';
            param[param.length] = address.addressDetail;
        } else if (address.addressDetail && param.length != 0) {
            selectSql += ' ,addressDetail=? ';
            param[param.length] = address.addressDetail;
        }
        if (address.recipients && param.length == 0) {
            selectSql += ' recipients=? ';
            param[param.length] = address.recipients;
        } else if (address.recipients && param.length != 0) {
            selectSql += ' ,recipients=? ';
            param[param.length] = address.recipients;
        }
        if (address.postcode && param.length == 0) {
            selectSql += ' postcode=? ';
            param[param.length] = address.postcode;
        } else if (address.postcode && param.length != 0) {
            selectSql += ' ,postcode=? ';
            param[param.length] = address.postcode;
        }
        selectSql += ' WHERE id=? ';
        param[param.length] = address.id;
        db.query(selectSql, param, function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    Address.deleteAddress = function (id, callback) {
        var delSql = "UPDATE address SET isDelete =0 WHERE id =?";
        db.query(delSql, [id], function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    Address.queryAddress = function (userId, callback) {
        var selectSql = 'SELECT * FROM address WHERE userId=? AND isDelete=1';
        db.query(selectSql, [userId], function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    module.exports = Address;

}

// -----------hx3-------
function div3() {
    var db = require('./db.js');

    function Brand(brand) {
        this.id = brand.id;
        this.brandName = brand.brandName;
        this.categoryId = brand.categoryId;
        this.brandLogo = brand.brandLogo;
        this.isDelete = brand.isDelete;
        this.hot = brand.hot;
    };
    Brand.addSecondCategory = function (brand, callback) {
        var selectSql = 'insert into brand (id,brandName,categoryId,brandLogo,isDelete,hot)  values (null,?,?,?,1,?)';
        db.query(selectSql, [brand.brandName, brand.categoryId, brand.brandLogo, brand.hot], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    Brand.updateSecondCategory = function (brand, callback) {
        var selectSql = 'UPDATE brand SET';
        var param = new Array();
        if (brand.brandName) {
            selectSql += ' brandName=? ';
            param[param.length] = brand.brandName;
        }
        if (brand.categoryId && param.length == 0) {
            selectSql += ' categoryId=? ';
            param[param.length] = brand.categoryId;
        } else if (brand.categoryId && param.length != 0) {
            selectSql += ' ,categoryId=? ';
            param[param.length] = brand.categoryId;
        }
        if (brand.brandLogo && param.length == 0) {
            selectSql += ' brandLogo=? ';
            param[param.length] = brand.brandLogo;
        } else if (brand.brandLogo && param.length != 0) {
            selectSql += ' ,brandLogo=? ';
            param[param.length] = brand.brandLogo;
        }
        if (brand.isDelete && param.length == 0) {
            selectSql += ' isDelete=? ';
            param[param.length] = brand.isDelete;
        } else if (brand.isDelete && param.length != 0) {
            selectSql += ' ,isDelete=? ';
            param[param.length] = brand.isDelete;
        }
        if (brand.hot && param.length == 0) {
            selectSql += ' hot=? ';
            param[param.length] = brand.hot;
        } else if (brand.hot && param.length != 0) {
            selectSql += ' ,hot=? ';
            param[param.length] = brand.hot;
        }
        selectSql += ' where id=?';
        param[param.length] = brand.id;
        db.query(selectSql, param, function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };


    module.exports = Brand;

}

// -----------hx4-------
function div4() {
    var db = require('./db.js');

    function Cart(cart) {
        this.id = cart.id;
        this.userId = cart.userId;
        this.productId = cart.productId;
        this.num = cart.num;
        this.size = cart.size;
        this.isDelete = cart.isDelete;
    };

    Cart.addCart = function (cart, callback) {
        var selectSql = 'insert into cart (id,userId,productId,num,size,isDelete)  values (null,?,?,?,?,1)';
        db.query(selectSql, [cart.userId, cart.productId, cart.num, cart.size], function (err, result) {
            if (err) {
                return callback(err);
            }
            callback(err, result);
        });
    };
    Cart.updateCart = function (cart, callback) {
        var selectSql = 'UPDATE cart SET num =?,size=? WHERE id=?';
        db.query(selectSql, [cart.num, cart.size, cart.id], function (err, res) {
            console.log(res);
            if (err) {
                console.log(err);
                return callback(err);
            }
            callback(err, res);
        });
    }
    Cart.deleteCart = function (id, callback) {
        var idStr = "";
        for (var i = 0; i < id.length; i++) {
            if (i == 0) {
                idStr = idStr + id[i];
            } else {
                idStr = idStr + "," + id[i];
            }
        }

        var delSql = "UPDATE cart SET isDelete =0 WHERE id in (" + idStr + ")";
        db.query(delSql, function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    Cart.queryCartPaging = function (id, page, callback) {
        var selectSql = 'SELECT c.id,c.productId,c.num,c.size,p.proName,p.price,p.oldPrice,p.num as productNum,p.statu,p.size as productSize from cart as c left join product as p on c.productId=p.id where c.userId=?';

        selectSql += " LIMIT ?,?";
        db.query(selectSql, [id, (page.page - 1) * page.size, page.size], function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    Cart.queryCart = function (id, callback) {
        var selectSql = 'SELECT c.id,c.productId,c.num,c.size,p.proName,p.price,p.oldPrice,p.num as productNum,p.statu,p.size as productSize from cart as c left join product as p on c.productId=p.id where c.userId=? and c.isDelete = 1';
        db.query(selectSql, [id], function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res);
        });
    }
    Cart.countCart = function (id, callback) {
        var delSql = 'SELECT count(c.id) as count from cart as c left join product as p on c.productId=p.id where c.userId=?';
        db.query(delSql, [id], function (err, res) {
            if (err) {
                return callback(err);
            }
            callback(err, res[0]);
        });
    }
    module.exports = Cart;



}

// -----------hx5-------
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

function showPageDd() {
    console.log('showAllDd');
    // 拿到所有数据的方法
    var promise = new Promise((resolve, reject) => {
        api.ajax({
            url: appA + 'api.do',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                body: {
                    gb_name: 'queryBiz.page#ks02_getDdInfo_byCondition',
                    param_info: {
                        pagesize,
                        current_page: ++current_page
                    }
                }
            }
        }, function (ret, err) {
            if (ret) {
                console.log(JSON.stringify(ret));
                temp_data = {
                    data: ret.param_info
                };
                /*              var arrText = doT.template($("#tempList").text());
                                $(".tempList").append(arrText(temp_data));
                                // 渲染完毕，调用上色方法
                                getCol();
                                editRad(); // 圆角
                                //100ms之后再次渲染，避免渲染模板小号 不是这个问题 */
                resolve(temp_data);
            } else {
                // api.alert({
                //     msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                // });
                reject(err);
            };
        });
    })
    return promise;
}

function editClick() {
    $(".tempList").on('click', '.edit', function () {
        var id = $(this).data('index');
        console.log(JSON.stringify(temp_data) + '---' + JSON.stringify(id));
        var data = temp_data.data.records;
        var pageParam = data.filter(item => item.id == id); // [{ id:... }]
        console.log(JSON.stringify(pageParam));
        api.openFrame({
            name: 'updateDd',
            url: 'updateDd.html',
            bounces: false,
            rect: {
                x: 0,
                y: 0,
                w: 'auto',
                h: 'auto'
            },
            pageParam
        });
    })
}


function getMore() {
    api.setRefreshHeaderInfo({
        loadingImg: 'widget://image/refresh.png',
        bgColor: '#36D1A5',
        textColor: '#fff',
        textDown: '下拉刷新...',
        textUp: '松开刷新...'
    }, function (ret, err) {
        // 一开始下拉就要进行判断在执行后面的操作
        console.log(JSON.stringify(current_page) + '----' + JSON.stringify(maxPage));
        if (current_page >= maxPage) {
            // 让父页面的没有更多模块显示
            api.execScript({
                name: 'main_menu_dd',
                script: 'showNoMore();'
            });
            api.refreshHeaderLoadDone();
            return;
        }

        showPageDd().then(tempData => {

            console.log(JSON.stringify(tempData.data.total));

            goToTemp(tempData);

            api.refreshHeaderLoadDone();
        })



        //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
    });


}

// 生成模板的方法
function goToTemp(tempData) {
    var arrText = doT.template($("#tempList").text());
    $(".tempList").append(arrText(tempData));
    // 渲染完毕，调用上色方法
    getCol();
    editRad(); // 圆角
}

//计算最大页数
function getMaxPage(tempData) {

    maxPage = Math.ceil(tempData.data.total / pagesize);


    // 这样会每次都重新请求计算，在调用的时候，显然不合适
}

function singleDd(ddparam) {
    console.log(JSON.stringify(ddparam) + '---11111');
    var ddId = Number(ddparam.ddparam);
    $('.tempList').empty();
    api.showProgress({
        title: ' 正在查询',
        text: ' 请稍后',
        modal: true
    });

    api.ajax({
        url: appA + 'api.do',
        method: 'post',
        data: {
            body: {
                gb_name: 'queryBiz.list#ks02_getDdInfo_byCondition',
                param_info: {
                    ddId
                }
            }
        }
    }, function (ret, err) {
        if (ret) {
            console.log(ret);

            api.hideProgress();
            var tempData = {
                data: ret.param_info
            };
            if (tempData.data.count == 0) {
                return api.toast({
                    msg: '未找到与 ' + khparam.khparam + ' 相关的搜索结果',
                    duration: 2000,
                    location: 'bottom'
                });
            }
            // 添加page避免后面模板页面报错
            console.log(JSON.stringify(tempData));
            goToTemp(tempData);
        } else {
            alert(err.status + err.message);
        }
    });
}
// totop
function toTop() {
    document.body.scrollTop = 0;
}