    // 判断是否存在传递参数，如果有，渲染到列表上

    var khStatus = 1;
    apiready = function () {
        $api.fixStatusBar($api.dom('header'));

        if(api.pageParam) {

        showPageparam();
        }
        api.parseTapmode();
        getCol();
        editRad();
    }
    //传递页面参数展示
    function showPageparam() {
        // 业主状态
        console.log(JSON.stringify( api.pageParam ));
        var data = api.pageParam;
        $('.aui-switch')[0].checked =Number(data[0].khstatus);
        $(".khName").val(data[0].khname);
        $(".ddId").val(data[0].ddid);
        $(".khAddress").val(data[0].khaddress);
        $(".khPhone").val(data[0].khphone);
        $(".fgName").val(data[0].fgname);
    }


    // 展示需要编辑的业主信息
    function toggleStatus() {
        khStatus = khStatus == 1 ? 0 : 1;
        var spanText = $(".khStatus").text();
        spanText = spanText == '意向业主' ? '已签待装业主' : '意向业主';
        $(".khStatus").text(spanText);
    }
    // 收集表单信息 并开始表单验证
    function getFromData() {
        var ddInfo = $('.ddInfo').serializeObject();
        console.log(JSON.stringify(ddInfo));
        if (!ddInfo.khName.length || ddInfo.khName.length > 12) {
            return api.toast({
                msg: '请输入正确的业主姓名',
                duration: 2000,
                location: 'top'
            });
        }
        if (!ddInfo.ddId) {
            return api.toast({
                msg: '请输入待装编号',
                duration: 2000,
                location: 'top'
            });
        }
        if (!ddInfo.khAddress) {
            return api.toast({
                msg: '请输入业主地址',
                duration: 2000,
                location: 'top'
            });
        }
        var tel_regexp = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
        if (!ddInfo.khPhone || !tel_regexp.test(ddInfo.khPhone)) {
            return api.toast({
                msg: '请输入正确的手机号',
                duration: 2000,
                location: 'top'
            });
        }
        var fgs = ['海风', '爱家', '伯爵', '天空城'];
        if (!ddInfo.fgName || !fgs.includes(ddInfo.fgName)) {
            return api.toast({
                msg: '请输入正确的装修风格',
                duration: 2000,
                location: 'top'
            });
        }

        //验证ddId唯一性 最后验证
        checkKhId(ddinfo.khId, ddinfo);

    }

    // 检查khid是否唯一的函数
    function checkKhId(ddId, ddinfo) {
        console.log(JSON.stringify(khId) + '----' + JSON.stringify(ddInfo));

        api.showProgress({
            title: '正在查询请稍后',
            text: '  请稍后',
            modal: true
        });

        api.ajax({
            url: appA + 'api.do',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                body: {
                    gb_name: "queryBiz.list#ks02_getDdInfo_byCondition",
                    param_info: {
                        ddId
                    },
                }
            }
        }, function (ret, err) {
            if (ret) {
                // TODO
                api.hideProgress();
                console.log(JSON.stringify(ret));
                if (ret.param_info.count == 1) {
                    api.toast({
                        msg: '业主id已存在，请重新输入',
                        duration: 2000,
                        location: 'top'
                    });
                    return;
                }
                addDd(ddInfo);
            } else {
                api.alert({
                    msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                });
            };
        });

    }
    // 添加业主函数
    function addDd(ddInfo) {
        var fgPrice;
        // var obj = {...ddInfo,gbname:'kh_info' }; 测试
        // console.log(JSON.stringify(obj));
        ddInfo.tbname = 'dd_info';
        var date = new Date();
        console.log(JSON.stringify(m));
        var m = date.getMonth()+1;
        ddInfo.khTime =  m+ '月';
        ddInfo.khStatus = khStatus;

        switch (ddInfo.fgName) {
            case '海风':
                fgPrice = '1000'
                break;
            case '伯爵':
                fgPrice = '1200'
                break;
            case '爱家':
                fgPrice = '1500'
                break;
            case '天空城':
                fgPrice = '800'
                break;

            default:
                break;
        }
        ddInfo.fgPrice = fgPrice;
        console.log('进入addkh' + JSON.stringify(ddInfo));
        api.ajax({
            url: appA + 'gb/save.do',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll: false,
            data: {
                body: ddInfo
            }
        }, function (ret, err) {
            if (ret) {
                console.log('进入回调');
                api.toast({
                msg: '添加成功',
                duration: 2000,
                location: 'bottom'
            });

                JSON.stringify(ret)
            } else {
                api.alert({
                    msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err.statusCode)
                });
            };
        });
    }
        // 开始了你开始了
        function div20() {
            var a = {
                clampLength: function ( min, max ) {
    
                    var length = this.length();
        
                    return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
        
                },
        
                floor: function () {
        
                    this.x = Math.floor( this.x );
                    this.y = Math.floor( this.y );
                    this.z = Math.floor( this.z );
        
                    return this;
        
                },
        
                ceil: function () {
        
                    this.x = Math.ceil( this.x );
                    this.y = Math.ceil( this.y );
                    this.z = Math.ceil( this.z );
        
                    return this;
        
                },
        
                round: function () {
        
                    this.x = Math.round( this.x );
                    this.y = Math.round( this.y );
                    this.z = Math.round( this.z );
        
                    return this;
        
                },
        
                roundToZero: function () {
        
                    this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
                    this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
                    this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );
        
                    return this;
        
                },
        
                negate: function () {
        
                    this.x = - this.x;
                    this.y = - this.y;
                    this.z = - this.z;
        
                    return this;
        
                },
        
                dot: function ( v ) {
        
                    return this.x * v.x + this.y * v.y + this.z * v.z;
        
                },
        
                // TODO lengthSquared?
        
                lengthSq: function () {
        
                    return this.x * this.x + this.y * this.y + this.z * this.z;
        
                }
        ,
                length: function () {
        
                    return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );
        
                },
        
                manhattanLength: function () {
        
                    return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
        
                },
        
                normalize: function () {
        
                    return this.divideScalar( this.length() || 1 );
        
                }
        ,
                setLength: function ( length ) {
        
                    return this.normalize().multiplyScalar( length );
        
                }
        ,
                lerp: function ( v, alpha ) {
        
                    this.x += ( v.x - this.x ) * alpha;
                    this.y += ( v.y - this.y ) * alpha;
                    this.z += ( v.z - this.z ) * alpha;
        
                    return this;
        
                }
        ,
                lerpVectors: function ( v1, v2, alpha ) {
        
                    return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );
        
                }
        ,
                cross: function ( v, w ) {
        
                    if ( w !== undefined ) {
        
                        console.warn( 'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
                        return this.crossVectors( v, w );
        
                    }
        
                    return this.crossVectors( this, v );
        
                }
        ,
                crossVectors: function ( a, b ) {
        
                    var ax = a.x, ay = a.y, az = a.z;
                    var bx = b.x, by = b.y, bz = b.z;
        
                    this.x = ay * bz - az * by;
                    this.y = az * bx - ax * bz;
                    this.z = ax * by - ay * bx;
        
                    return this;
        
                }
        ,
                projectOnVector: function ( vector ) {
        
                    var scalar = vector.dot( this ) / vector.lengthSq();
        
                    return this.copy( vector ).multiplyScalar( scalar );
        
                },
                projectOnPlane: function () {
        
                    var v1 = new Vector3();
        
                    return function projectOnPlane( planeNormal ) {
        
                        v1.copy( this ).projectOnVector( planeNormal );
        
                        return this.sub( v1 );
        
                    };
        
                }
        ,
                reflect: function () {
        
                    // reflect incident vector off plane orthogonal to normal
                    // normal is assumed to have unit length
        
                    var v1 = new Vector3();
        
                    return function reflect( normal ) {
        
                        return this.sub( v1.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );
        
                    };
        
                },
        
                angleTo: function ( v ) {
        
                    var theta = this.dot( v ) / ( Math.sqrt( this.lengthSq() * v.lengthSq() ) );
        
                    // clamp, to handle numerical problems
        
                    return Math.acos( _Math.clamp( theta, - 1, 1 ) );
        
                },
        
                distanceTo: function ( v ) {
        
                    return Math.sqrt( this.distanceToSquared( v ) );
        
                },
        
                distanceToSquared: function ( v ) {
        
                    var dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;
        
                    return dx * dx + dy * dy + dz * dz;
        
                }
    
            }
    
    }