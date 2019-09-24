    var userPwd1; // 原密码
    var userPwd // 新密码
    apiready = function () {
        userPwd1 = api.pageParam.userpwd;
        // console.log(JSON.stringify(api.pageParam));   
        checkOldPwd();
    }

    // 关闭动画
    function closeFrame() {
        api.closeFrame({
        });
        api.setFrameAttr({
            name: 'main',
            
            hidden: false
        });
        
    }



    // 查询账号密码信息

    function checkOldPwd() {
        $(".pwd0").on('blur', function () {
            var pwd0 = $(this).val();
            if (userPwd1 !== pwd0) {
                return api.toast({
                    msg: '原密码输入不正确',
                    duration: 2000,
                    location: 'bottom'
                });
            }

        })
    }

    // 验证新密码前后两次是否正确
    function checkPwdSame() {
        $(".pwd2").on('blur', function () {
            var pwd2 = $(this).val();
            var pwd1 = $(".pwd1").val();
            if (pwd1.trim() == pwd2.trim() == '') {
                api.toast({
                    msg: '密码不能为空',
                    duration: 2000,
                    location: 'bottom'
                });
            }
            if (pwd1 !== pwd2) {
                return api.toast({
                    msg: '两次输入的密码不一致',
                    duration: 2000,
                    location: 'bottom'
                });
            }
        })
    }

    // 提交新密码 
    function submitNewPwd() {
         userPwd = $(".pwd2").val();
        api.ajax({
            url: appA+'gb/update.do',
            method: 'post',
            timeout: 30,
            dataType: 'json',
            returnAll:false,
            data:{
                body:{
                    tbname:'user_info',
                    id:1,
                    userPwd
                }
            }
        },function(ret,err){
            if (ret && ret.status =='1') {
                // TODO 
                console.log(JSON.stringify(ret));
                api.toast({
                    msg: '修改成功',
                    duration: 2000,
                    location: 'bottom'
                });
            } else {
                api.alert({
                    msg:('错误码：'+err.code+'；错误信息：'+err.msg+'网络状态码：'+err.statusCode)
                });
            };
        });
    }
    
    function div21() {
        var b  =  {
            manhattanDistanceTo: function ( v ) {
    
                return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );
        
            },
        
            setFromSpherical: function ( s ) {
        
                return this.setFromSphericalCoords( s.radius, s.phi, s.theta );
        
            },
        
            setFromSphericalCoords: function ( radius, phi, theta ) {
        
                var sinPhiRadius = Math.sin( phi ) * radius;
        
                this.x = sinPhiRadius * Math.sin( theta );
                this.y = Math.cos( phi ) * radius;
                this.z = sinPhiRadius * Math.cos( theta );
        
                return this;
        
            },
            setFromCylindrical: function ( c ) {
        
                return this.setFromCylindricalCoords( c.radius, c.theta, c.y );
        
            },
        
            setFromCylindricalCoords: function ( radius, theta, y ) {
        
                this.x = radius * Math.sin( theta );
                this.y = y;
                this.z = radius * Math.cos( theta );
        
                return this;
        
            },
        
            setFromMatrixPosition: function ( m ) {
        
                var e = m.elements;
        
                this.x = e[ 12 ];
                this.y = e[ 13 ];
                this.z = e[ 14 ];
        
                return this;
        
            },
        
            setFromMatrixScale: function ( m ) {
        
                var sx = this.setFromMatrixColumn( m, 0 ).length();
                var sy = this.setFromMatrixColumn( m, 1 ).length();
                var sz = this.setFromMatrixColumn( m, 2 ).length();
        
                this.x = sx;
                this.y = sy;
                this.z = sz;
        
                return this;
        
            },
        
            setFromMatrixColumn: function ( m, index ) {
        
                return this.fromArray( m.elements, index * 4 );
        
            },
        
            equals: function ( v ) {
        
                return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );
        
            }
        ,
            fromArray: function ( array, offset ) {
        
                if ( offset === undefined ) offset = 0;
        
                this.x = array[ offset ];
                this.y = array[ offset + 1 ];
                this.z = array[ offset + 2 ];
        
                return this;
            },
        
            toArray: function ( array, offset ) {
        
                if ( array === undefined ) array = [];
                if ( offset === undefined ) offset = 0;
        
                array[ offset ] = this.x;
                array[ offset + 1 ] = this.y;
                array[ offset + 2 ] = this.z;
        
                return array;
        
            },
        
            fromBufferAttribute: function ( attribute, index, offset ) {
        
                if ( offset !== undefined ) {
        
                    console.warn( 'THREE.Vector3: offset has been removed from .fromBufferAttribute().' );
        
                }
        
                this.x = attribute.getX( index );
                this.y = attribute.getY( index );
                this.z = attribute.getZ( index );
        
                return this;
        
            }
        
        } 
    
    
        function div22() {
            /**
         * @author alteredq / http://alteredqualia.com/
         * @author WestLangley / http://github.com/WestLangley
         * @author bhouston / http://clara.io
         * @author tschw
         */
        
        function Matrix3() {
        
            this.elements = [
        
                1, 0, 0,
                0, 1, 0,
                0, 0, 1
        
            ];
        
            if ( arguments.length > 0 ) {
        
                console.error( 'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.' );
        
            }
        
        }
        
        Object.assign( Matrix3.prototype, {
        
            isMatrix3: true,
        
            set: function ( n11, n12, n13, n21, n22, n23, n31, n32, n33 ) {
        
                var te = this.elements;
        
                te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
                te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
                te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;
        
                return this;
        
            },
        
            identity: function () {
        
                this.set(
        
                    1, 0, 0,
                    0, 1, 0,
                    0, 0, 1
        
                );
        
                return this;
        
            },
        
            clone: function () {
        
                return new this.constructor().fromArray( this.elements );
        
            },
        
            copy: function ( m ) {
        
                var te = this.elements;
                var me = m.elements;
        
                te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
                te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
                te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];
        
                return this;
        
            },
        
            setFromMatrix4: function ( m ) {
        
                var me = m.elements;
        
                this.set(
        
                    me[ 0 ], me[ 4 ], me[ 8 ],
                    me[ 1 ], me[ 5 ], me[ 9 ],
                    me[ 2 ], me[ 6 ], me[ 10 ]
        
                );
        
                return this;
        
            },
        
        })
    

        }
    }
    
