  
var items = document.getElementById('items');    // 图片集
var points = document.getElementsByClassName('point');  // 点
var goPrevBtn = document.getElementById('goPrevBtn');   // 前按钮
var goNextBtn = document.getElementById('goNextBtn');   // 后按钮

var index = 0;      // 指示当前索引
var timeID;         // 定义定时器标识
var timeSet = 0;    // 重置定时计时


// -----------------------------【无缝滚动！！】-----------------------------

var count = items.children.length;          // 记录items原本的子元素图片个数
var firstPic = items.children[0];           // 获取到第一张图片
var clonePic = firstPic.cloneNode(true);    // 创建一个副本
items.appendChild(clonePic);                // 把它添加到items中

// -------------------------------------------------------------------------

// 消除active类名
function clearActive() {
    for(var i = 0; i < points.length; i++) {
        points[i].className = 'point';
    }
}

// 标记index
function tagActive() {
    clearActive();
    points[index].className = 'point active';
}

// -------------------------------------------------------------------------

// 开启自动切换图片
autoSwitch();

function autoSwitch() {
    timeID = setInterval(function(){
        timeSet++;
        
        // 2秒翻页
        if(timeSet == 2){
            goNext();
        }
    },1000);
}

// -------------------------------------------------------------------------


// 实现点击 "point" 显示对应图片
for(var i = 0; i < points.length; i++) {

    points[i].addEventListener('click', function() {
        var pointIndex = this.getAttribute('data-index');
        index = pointIndex;
        
        tagActive();
        ainmate(items, "left", -800*index, 300);    // 点击跳转 速度要稍快
        timeSet = 0;
    });
}


// -------------------------------------------------------------------------


goPrevBtn.addEventListener('click', function() {
    goPrev();
})

goNextBtn.addEventListener('click', function() {
    goNext();
})

// 向前
function goPrev() {

    if (index == 0) {       //【无缝滚动！！】
        index = count;      // 并重新标记index
        items.style.left = "-4000px";   // 修改ul的坐标，重新显示首张图片 
    }

    index--;
    points[index].click();

    timeSet = 0;
}

// 向后
function goNext() {

    if(index == count){     //【无缝滚动！！】
        index = 0;                  // 并重新标记index
        items.style.left = "0px";   // 修改ul的坐标，重新显示首张图片
    }

    index++;    // 使索引自增 翻页

    if(index < count){
        ainmate(items, "left", -800*index, 200, tagActive());
    }else{                   //【无缝滚动！！】
        ainmate(items, "left", -800*index, 200, clearActive());
        points[0].className = 'point active';
    }

    timeSet = 0;
}



// -------------------------------------------------------------------------

/*  =========== 动画函数 =================
 * 	obj: 执行动画的对象
 * 	attr: 指定样式执行动画 (如：left top width height)
 * 	finish: 结束目标值 (正右负左)
 * 	speed: 动画速度 (可设定正负值)
 *  callback: 回调函数
 *  ======================================= */
function ainmate(obj, attr, finish, speed, callback) {

    // 执行前先判断 页面上是否只有一个定时器在执行动画 不然会出现冲突 防止多次点击出现闪烁情况
    if (obj.timeID) {
        clearInterval(obj.timeID);
        timeID = null;
    }

    var nowValue = parseInt(getStyle(obj, attr));   // 获取指定对象的指定样式当前值

    // 获取指定对象的样式值（兼容IE）
    function getStyle(obj, name) {
        if(window.getComputedStyle)
            return getComputedStyle(obj, null)[name];
        else 
            return obj.currentStyle[name];
    }

    // 判断速度的正负值 
    if(nowValue > finish) {
		speed = -speed;
    }
    
    // 启动定时器执行动画
    obj.timeID = setInterval(function(){
        
        var oldValue = parseInt(getStyle(obj, attr));   // 旧值
        var newValue = oldValue + speed;                // 新值 (在旧值的基础上增加)
        
        // 判断newValue是否超出结束值
        if( (speed < 0 && newValue < finish) || (speed > 0 && newValue > finish) ) {
			newValue = finish;
        }
        
        obj.style[attr] = newValue + "px";  // 将新值设置给obj
        
        // 达到目标 关闭定时器
        if(newValue == finish) {
            clearInterval(obj.timeID);
            callback && callback();     // 动画执行完毕 调用回调函数
		}

    }, 30);
}