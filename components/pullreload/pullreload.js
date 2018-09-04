require('./pullreload.css')

var isDragging = false;
var isThresholdReached = false;
var popStart = 0;
var threshold = 20;
var isend = true;
var isTop = true;

 //通过event获取高度，因为pc端和移动端不同，单独写一个方法来解决兼容问题
function getheight (event) {
  // pageY 文档坐标
  if (event.pageY === undefined && event.touches !== undefined) {
    // event.touches，多点触碰时的位置数组
    if (event.touches.length <= 0) {
      return false;
    }
    event.pageY = event.touches[event.touches.length - 1].pageY;
  }
  return event.pageY
}
//记录初始位置，判断是否位于顶端
function movestart (event) {
  // document.body.scrollTop 网页被卷去的高
  var top = document.body.scrollTop;
  if (top === 0) {
    isTop = true;
    document.addEventListener('mousemove',moving)
    document.addEventListener('touchmove',moving,{passive:false})
    document.addEventListener('mouseup',moveend)
    document.addEventListener('touchend',moveend)
  } else {
    isTop = false;
    document.removeEventListener('mousemove',moving)
    document.removeEventListener('touchmove',moving,{passive:false})
    document.removeEventListener('mouseup',moveend)
    document.removeEventListener('touchend',moveend)
    return;
  }
  if (!isend) {
    return;
  }
  isDragging = true;
  isThresholdReached = false;
  popStart = getheight(event);
}
 //检测滑动方向，进行相应的位移
function moving(event){
  if(isend && isTop && isDragging){
  event.stopImmediatePropagation();
  var offset = Math.floor(getheight(event) - popStart);
  if(offset>=0){
    event.preventDefault();
    if(offset>threshold){
      isThresholdReached = true;
      ptr.innerHTML = 'loading...';
    }else {
      isThresholdReached = false;
      ptr.innerHTML = '...';
    }
    var height = 41-offset;
    ptr.style.marginTop = '-' + (height>0?height:0) + 'px';
  }
  }
}
//检测是否达到下拉阈值，达到则进行回调，否则恢复初始状态
function moveend(){
  if(!isend || !isTop){
    return ;
  }
  if(isThresholdReached){
    isend = false;
    ptr.style.marginTop = '0px';
    callback().then(function(data){
      console.log(data);
      isend = true;
      ptr.style.marginTop = '-41px';
      ptr.innerHTML = '...';
    });
  }else {
    ptr.style.marginTop = '-41px';
  }
  isDragging = false;
  isThresholdReached = false;
}
var callback;

var pullReload = function(options){
  this.content = document.getElementById(options.content);
  this.ptr = document.getElementById('ptr');
  callback = options.callback || function(){return
    new Promise(function(resolve,reject){
      setTimeout(function(){
        resolve('no refresh');
      },1000);
    })
  };
   //绑定事件
  this.start = function(){
    this.content.addEventListener('mousedown',movestart);
    this.content.addEventListener('touchstart',movestart)
  }
   //移除事件
  this.remove = function(){
    this.content.removeEventListener('mousedown',movestart);
    this.content.removeEventListener('touchstart',movestart)
  }
  return this;
}

export default pullReload;