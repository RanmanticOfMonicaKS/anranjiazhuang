    var current_page = 0;
    var pagesize = 3;
    var maxPage;
    var temp_data;

    apiready = function () {
        $api.fixStatusBar($api.dom('header'));

        $(".noMore").hide();
        // 第一次执行渲染模板，且得到最大页数
        getAllData().then(tempData => {
            temp_data = tempData;
            console.log(JSON.stringify(tempData));

            tempData = tempData.filter(item => item.khstatus == '0');
            goToTemp(tempData);

        });
        showPageKh().then(tempData => {
            getMaxPage(tempData);
        });
        goToKhEdit();
        getMore();
        // 这样优化是不行的，应该在页面还没有显示的时候请求，数据，否则编辑按钮出来之后，用户点击是无法拿到数据的
    }

    // 获取用户id并跳转到编辑页面
    function goToKhEdit() {
        // 事件委托
        $(".tempList").on('click', '.edit', function () {

            var id = $(this).data('index');
            console.log('1111111' + JSON.stringify(id));

            console.log(JSON.stringify(temp_data) + '---' + JSON.stringify(id));
            var pageParam = temp_data.filter(item => item.id == id); // [{ id:... }]
            console.log(JSON.stringify(pageParam));
            api.openFrame({
                name: 'updateKh',
                url: 'updateKh.html',
                bounces: false,
                rect: {
                    x: 0,
                    y: 0,
                    w: 'auto',
                    h: 'auto'
                },
                relaod: true,
                pageParam: pageParam
            });

        })

    }
    // 更好的做法，显然是在单条数据筛选的时候，在前端做处理。
    function getAllData() {
        console.log('进入getAllData');

        var promise = new Promise((resolve, reject) => {
            api.ajax({
                url: appA + 'api.do',
                method: 'post',
                timeout: 30,
                dataType: 'json',
                returnAll: false,
                data: {
                    body: {
                        gb_name: 'queryBiz.list#ks02_getKhInfo_byCondition',
                        param_info: {}
                    }
                }
            }, function (ret, err) {
                if (ret && ret.param_info) {
                    temp_data = ret.param_info.records;
                    resolve(temp_data)
                } else {
                    api.alert({
                        msg: ('错误码：' + err.code + '；错误信息：' + err.msg + '网络状态码：' + err
                            .statusCode)
                    });
                    reject(err);
                };
            });

        })
        return promise;
    }

    function showPageKh() {
        console.log('showPageKh');
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
                        gb_name: 'queryBiz.page#ks02_getKhInfo_byCondition',
                        param_info: {
                            pagesize,
                            current_page: ++current_page
                        }
                    }
                }
            }, function (ret, err) {
                if (ret) {
                    console.log(JSON.stringify(ret));
                    var tempData = {
                        data: ret.param_info
                    };
                    /*              var arrText = doT.template($("#tempList").text());
                                    $(".tempList").append(arrText(temp_data));
                                    // 渲染完毕，调用上色方法
                                    getCol();
                                    editRad(); // 圆角
                                    //100ms之后再次渲染，避免渲染模板小号 不是这个问题 */

                    resolve(tempData);
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
                $(".noMore").show();
                api.refreshHeaderLoadDone();
                return;
            }

            showPageKh().then(tempData => {

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

    function singleKh(khparam) {
        console.log(JSON.stringify(khparam) + '---11111');

        var param_info = Number(khparam.khparam) ? {
            khId: Number(khparam.khparam)
        } : {
            khName: khparam.khparam
        }
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
                    gb_name: 'queryBiz.list#ks02_getKhInfo_byCondition',
                    param_info
                }
            }
        }, function (ret, err) {
            if (ret) {
                api.hideProgress();
                var tempData = {
                    data: ret.param_info
                };
                // 得到所有数据，在这边前端进行筛选把
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
        $('.temp_item').css({
            "z-index": "1"
        })
    }
    // 页面上点击时，让li显示在上方，避免遮挡
    function liUP() {
        $('.temp_item').on('click', function () {
            $(this).css({
                "z-index": "999"
            });
        })
    }

    function div14() {
        function Vector2( x, y ) {
    
            this.x = x || 0;
            this.y = y || 0;
    
        }
    
        Object.defineProperties( Vector2.prototype, {
    
            "width": {
    
                get: function () {
    
                    return this.x;
    
                },
    
                set: function ( value ) {
    
                    this.x = value;
    
                }
    
            },
    
            "height": {
    
                get: function () {
    
                    return this.y;
    
                },
    
                set: function ( value ) {
    
                    this.y = value;
    
                }
    
            }
    
        } );
    
        Object.assign( Vector2.prototype, {
    
            isVector2: true,
    
            set: function ( x, y ) {
    
                this.x = x;
                this.y = y;
    
                return this;
    
            },
    
            setScalar: function ( scalar ) {
    
                this.x = scalar;
                this.y = scalar;
    
                return this;
    
            },
    
            setX: function ( x ) {
    
                this.x = x;
    
                return this;
    
            },
    
            setY: function ( y ) {
    
                this.y = y;
    
                return this;
    
            },
    
            setComponent: function ( index, value ) {
    
                switch ( index ) {
    
                    case 0: this.x = value; break;
                    case 1: this.y = value; break;
                    default: throw new Error( 'index is out of range: ' + index );
    
                }
    
                return this;
    
            },
    
            getComponent: function ( index ) {
    
                switch ( index ) {
    
                    case 0: return this.x;
                    case 1: return this.y;
                    default: throw new Error( 'index is out of range: ' + index );
    
                }
    
            },
    
            clone: function () {
    
                return new this.constructor( this.x, this.y );
    
            },
    
            copy: function ( v ) {
    
                this.x = v.x;
                this.y = v.y;
    
                return this;
    
            },
    
            add: function ( v, w ) {
    
                if ( w !== undefined ) {
    
                    console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
                    return this.addVectors( v, w );
    
                }
    
                this.x += v.x;
                this.y += v.y;
    
                return this;
    
            },
    
            addScalar: function ( s ) {
    
                this.x += s;
                this.y += s;
    
                return this;
    
            },
    
            addVectors: function ( a, b ) {
    
                this.x = a.x + b.x;
                this.y = a.y + b.y;
    
                return this;
    
            },
    
            addScaledVector: function ( v, s ) {
    
                this.x += v.x * s;
                this.y += v.y * s;
    
                return this;
    
            },
    
            sub: function ( v, w ) {
    
                if ( w !== undefined ) {
    
                    console.warn( 'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
                    return this.subVectors( v, w );
    
                }
    
                this.x -= v.x;
                this.y -= v.y;
    
                return this;
    
            },
    
            subScalar: function ( s ) {
    
                this.x -= s;
                this.y -= s;
    
                return this;
    
            },
    
            subVectors: function ( a, b ) {
    
                this.x = a.x - b.x;
                this.y = a.y - b.y;
    
                return this;
    
            },
    
            multiply: function ( v ) {
    
                this.x *= v.x;
                this.y *= v.y;
    
                return this;
    
            },
    
            multiplyScalar: function ( scalar ) {
    
                this.x *= scalar;
                this.y *= scalar;
    
                return this;
    
            },
    
            divide: function ( v ) {
    
                this.x /= v.x;
                this.y /= v.y;
    
                return this;
    
            },
    
            divideScalar: function ( scalar ) {
    
                return this.multiplyScalar( 1 / scalar );
    
            },
    
            applyMatrix3: function ( m ) {
    
                var x = this.x, y = this.y;
                var e = m.elements;
    
                this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
                this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];
    
                return this;
    
            },
    
            min: function ( v ) {
    
                this.x = Math.min( this.x, v.x );
                this.y = Math.min( this.y, v.y );
    
                return this;
    
            },
    
            max: function ( v ) {
    
                this.x = Math.max( this.x, v.x );
                this.y = Math.max( this.y, v.y );
    
                return this;
    
            },
    
            clamp: function ( min, max ) {
    
                // assumes min < max, componentwise
    
                this.x = Math.max( min.x, Math.min( max.x, this.x ) );
                this.y = Math.max( min.y, Math.min( max.y, this.y ) );
    
                return this;
    
            },
    
            clampScalar: function ( minVal, maxVal ) {
    
                this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
                this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
    
                return this;
    
            },
    
            clampLength: function ( min, max ) {
    
                var length = this.length();
    
                return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );
    
            },
    
            floor: function () {
    
                this.x = Math.floor( this.x );
                this.y = Math.floor( this.y );
    
                return this;
    
            },
    
            ceil: function () {
    
                this.x = Math.ceil( this.x );
                this.y = Math.ceil( this.y );
    
                return this;
    
            },
    
            round: function () {
    
                this.x = Math.round( this.x );
                this.y = Math.round( this.y );
    
                return this;
    
            },
    
            roundToZero: function () {
    
                this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
                this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
    
                return this;
    
            },
    
            negate: function () {
    
                this.x = - this.x;
                this.y = - this.y;
    
                return this;
    
            },
    
            dot: function ( v ) {
    
                return this.x * v.x + this.y * v.y;
    
            },
    
            cross: function ( v ) {
    
                return this.x * v.y - this.y * v.x;
    
            },
    
            lengthSq: function () {
    
                return this.x * this.x + this.y * this.y;
    
            },
    
            length: function () {
    
                return Math.sqrt( this.x * this.x + this.y * this.y );
    
            },
    
            manhattanLength: function () {
    
                return Math.abs( this.x ) + Math.abs( this.y );
    
            },
    
            normalize: function () {
    
                return this.divideScalar( this.length() || 1 );
    
            },
    
            angle: function () {
    
                // computes the angle in radians with respect to the positive x-axis
    
                var angle = Math.atan2( this.y, this.x );
    
                if ( angle < 0 ) angle += 2 * Math.PI;
    
                return angle;
    
            },
    
            distanceTo: function ( v ) {
    
                return Math.sqrt( this.distanceToSquared( v ) );
    
            },
    
            distanceToSquared: function ( v ) {
    
                var dx = this.x - v.x, dy = this.y - v.y;
                return dx * dx + dy * dy;
    
            },
    
            manhattanDistanceTo: function ( v ) {
    
                return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );
    
            },
    
            setLength: function ( length ) {
    
                return this.normalize().multiplyScalar( length );
    
            },
    
            lerp: function ( v, alpha ) {
    
                this.x += ( v.x - this.x ) * alpha;
                this.y += ( v.y - this.y ) * alpha;
    
                return this;
    
            },
    
            lerpVectors: function ( v1, v2, alpha ) {
    
                return this.subVectors( v2, v1 ).multiplyScalar( alpha ).add( v1 );
    
            },
    
            equals: function ( v ) {
    
                return ( ( v.x === this.x ) && ( v.y === this.y ) );
    
            },
    
            fromArray: function ( array, offset ) {
    
                if ( offset === undefined ) offset = 0;
    
                this.x = array[ offset ];
                this.y = array[ offset + 1 ];
    
                return this;
    
            },
    
            toArray: function ( array, offset ) {
    
                if ( array === undefined ) array = [];
                if ( offset === undefined ) offset = 0;
    
                array[ offset ] = this.x;
                array[ offset + 1 ] = this.y;
    
                return array;
    
            },
    
            fromBufferAttribute: function ( attribute, index, offset ) {
    
                if ( offset !== undefined ) {
    
                    console.warn( 'THREE.Vector2: offset has been removed from .fromBufferAttribute().' );
    
                }
    
                this.x = attribute.getX( index );
                this.y = attribute.getY( index );
    
                return this;
    
            },
    
            rotateAround: function ( center, angle ) {
    
                var c = Math.cos( angle ), s = Math.sin( angle );
    
                var x = this.x - center.x;
                var y = this.y - center.y;
    
                this.x = x * c - y * s + center.x;
                this.y = x * s + y * c + center.y;
    
                return this;
    
            }
    
        } );
    
        /**
         * @author mikael emtinger / http://gomo.se/
         * @author alteredq / http://alteredqualia.com/
         * @author WestLangley / http://github.com/WestLangley
         * @author bhouston / http://clara.io
         */
    
        function Quaternion( x, y, z, w ) {
    
            this._x = x || 0;
            this._y = y || 0;
            this._z = z || 0;
            this._w = ( w !== undefined ) ? w : 1;
    
        }
    
    
    
    }
    

