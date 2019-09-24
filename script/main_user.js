  var data;


  apiready = function () {
    api.parseTapmode();
    // 不用手写波浪线了，简直 是作死
    getCol();
    clickLi();
    sameTheNic();
    api.addEventListener({
      name: 'sameTheNic'
    }, function (ret, err) {
      var data =$api.getStorage('userInfo') || {} ;
      console.log(JSON.stringify(data));
      if(!data.nickname)  $(".nic").text('未登录');
      if(data.nickname)  $(".nic").text(data.nickname);
      //  var frames = api.frames();
      //  console.log(JSON.stringify(frames));
      //  返回一个时间
      api.sendEvent({
        name: 'closeLogin',
        extra: '成了'
      });
       
    });
    // api.closeFrame({
    //   name: 'login'
    // });
  }
  // 头像部分 动态圆角 s
  function circle() {

    var width = api.frameWidth;
    console.log(JSON.stringify(width));

    $('.circle').css({
      'border-radius': width / 2 + 'px'
    })
  }
  // 给每一个li注册点击事件
  function clickLi() {
    // 隐藏main就没那么多的屁事儿了
      // 隐藏main就没那么多的屁事儿了
    
    
    $('.aui-list-item').on('click', function () {
      api.setFrameAttr({
        name: 'main',

        hidden: true
      });
      
      var url = $(this).data('url');
      var data =$api.getStorage('userInfo') || {} ;

      if(url != 'login') {
        if(!data.nickname)  {
          return api.confirm({
            title: '您还没有登录',
            msg: '是否立即登录',
            buttons:['确定', '取消']
          },function(ret,err){
            if(ret.buttonIndex == 1){
              api.openFrame({
                name: 'login',
                url: 'login.html',
                rect: {
                  x: 0,
                  y: 0,
                  w: 'auto',
                  h: 'auto'
                }
              });
            } else {
              api.setFrameAttr({
                name: 'main',
 
                hidden: false
              });
              
            }
          });
       };
      }
      // 点击子页面直接隐藏底部导航，没那么多事儿
      var animation = {

        type: "move-in", //动画类型（详见动画类型常量）
        subType: "from_left", //动画子类型（详见动画子类型常量）
        duration: 500 //动画过渡时间，默认300毫秒
      };
      var x = 50;
      var y = document.querySelector('main').offsetTop;
      var h = document.querySelector('.userInfo').offsetHeight;
      console.log(JSON.stringify(y) + '---' + JSON.stringify(h));
      if (url === 'login') {
        x = 0;
        y = 0;
        h = .25 * api.winHeight;
        animation = {

          type: "ripple", //动画类型（详见动画类型常量）
          subType: "from_left", //动画子类型（详见动画子类型常量）
          duration: 500 //动画过渡时间，默认300毫秒
        };
        /*    api.setFrameAttr({
             name: 'main',
            
             hidden: true
           });
            */
      };
      if(url ==='updatePwd') {
        api.openFrame({
        name: url,
        url: url + '.html',
        bounces: false,
        rect: {
          x: x,
          y: y,
          w: api.frameWidth - x,
          h: 8 * h
        },
        pageParam: data,
        animation
      });
      return;
      }
      api.openFrame({
        name: url,
        url: url + '.html',
        bounces: false,
        rect: {
          x: x,
          y: y,
          w: api.frameWidth - x,
          h: 4 * h
        },
        pageParam: data,
        animation
      });

      // 测试
      var frames = api.frames();
      console.log(JSON.stringify(frames));

      console.log('执行了setframeattr--------------');

    })
  }
  // 展开个人信息页 
  function updateNic(nickName) {
    console.log('进入nic' + JSON.stringify(nickName));

    $('.nic').text(nickName);
  }


  // 强制刷新，nickname同步
  function sameTheNic() {
    var data = $api.getStorage('userInfo') ||{};
    console.log(JSON.stringify(data));
    if(!data.nickname)  $(".nic").text('未登录');
    if(data.nickname)  $(".nic").text(data.nickname);

    var frames = api.frames();


  }

  // 如果没有登录，点击nic部分，能够跳转登录页
  function getToLoign() {
    if($('.nic').text()  === '未登录') {
      api.openFrame({
        name: 'login',
        url: 'login.html',
        rect: {
          x: 0,
          y: 0,
          w: 'auto',
          h: 'auto'
        }
      });
    }
    return;
  }

      // 开始了你开始了  
      function div17 () {
        /* @author mrdoob / http://mrdoob.com/
        * @author kile / http://kile.stravaganza.org/
        * @author philogb / http://blog.thejit.org/
        * @author mikael emtinger / http://gomo.se/
        * @author egraether / http://egraether.com/
        * @author WestLangley / http://github.com/WestLangley
        */
    
       function Vector3( x, y, z ) {
    
           this.x = x || 0;
           this.y = y || 0;
           this.z = z || 0;
    
       }
    
       Object.assign( Vector3.prototype, {
    
           isVector3: true,
    
           set: function ( x, y, z ) {
    
               this.x = x;
               this.y = y;
               this.z = z;
    
               return this;
    
           },
    
           setScalar: function ( scalar ) {
    
               this.x = scalar;
               this.y = scalar;
               this.z = scalar;
    
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
    
           setZ: function ( z ) {
    
               this.z = z;
    
               return this;
    
           },
    
           setComponent: function ( index, value ) {
    
               switch ( index ) {
    
                   case 0: this.x = value; break;
                   case 1: this.y = value; break;
                   case 2: this.z = value; break;
                   default: throw new Error( 'index is out of range: ' + index );
    
               }
    
               return this;
    
           },
    
           getComponent: function ( index ) {
    
               switch ( index ) {
    
                   case 0: return this.x;
                   case 1: return this.y;
                   case 2: return this.z;
                   default: throw new Error( 'index is out of range: ' + index );
    
               }
    
           },
    
           clone: function () {
    
               return new this.constructor( this.x, this.y, this.z );
    
           },
    
           copy: function ( v ) {
    
               this.x = v.x;
               this.y = v.y;
               this.z = v.z;
    
               return this;
    
           },
    
           add: function ( v, w ) {
    
               if ( w !== undefined ) {
    
                   console.warn( 'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
                   return this.addVectors( v, w );
    
               }
    
               this.x += v.x;
               this.y += v.y;
               this.z += v.z;
    
               return this;
    
           },
    
           addScalar: function ( s ) {
    
               this.x += s;
               this.y += s;
               this.z += s;
    
               return this;
    
           },
    
           addVectors: function ( a, b ) {
    
               this.x = a.x + b.x;
               this.y = a.y + b.y;
               this.z = a.z + b.z;
    
               return this;
    
           },
    
           addScaledVector: function ( v, s ) {
    
               this.x += v.x * s;
               this.y += v.y * s;
               this.z += v.z * s;
    
               return this;
    
           },
    
           sub: function ( v, w ) {
    
               if ( w !== undefined ) {
    
                   console.warn( 'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
                   return this.subVectors( v, w );
    
               }
    
               this.x -= v.x;
               this.y -= v.y;
               this.z -= v.z;
    
               return this;
    
           },
    
           subScalar: function ( s ) {
    
               this.x -= s;
               this.y -= s;
               this.z -= s;
    
               return this;
    
           },
    
           subVectors: function ( a, b ) {
    
               this.x = a.x - b.x;
               this.y = a.y - b.y;
               this.z = a.z - b.z;
    
               return this;
    
           },
    
    
     })
    }