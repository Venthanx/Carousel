var items = document.getElementsByClassName('item');    // 图片
var points = document.getElementsByClassName('point');  // 点
var goPrevBtn = document.getElementById('goPrevBtn');   // 前按钮
var goNextBtn = document.getElementById('goNextBtn');   // 后按钮

var index = 0;      // 指示当前索引

goPrevBtn.addEventListener('click', function() {
    goPrev();
})
goNextBtn.addEventListener('click', function() {
    goNext();
})


// 实现点击 "point" 显示对应图片
for(var i = 0; i < points.length; i++) {
    points[i].addEventListener('click', function() {
        var pointIndex = this.getAttribute('data-index');
        index = pointIndex;
        tagIndex();
        time = 0;
    })
}


// 标记index
var tagIndex = function() {
    clearActive();
    
    points[index].className = 'point active';
    items[index].className = 'item active';
}

// 消除active类名
var clearActive = function() {
    for(var i = 0; i < items.length; i++) {
        items[i].className = 'item';
    }
    for(var i = 0; i < points.length; i++) {
        points[i].className = 'point';
    }
}

// 向前
var goPrev = function() {
    if(index == 0) {
        index = 4;
    } else {
        index--;
    }
    tagIndex();
    time = 0;
}

// 向后
var goNext = function() {
    if(index < 4) {
        index++;
    } else {
        index = 0;
    }
    tagIndex();
    time = 0;
}


var time = 0;   // 重置定时计时

// 2000ms 跳转一次
setInterval(function() {
    time++;
    // console.log(time);
    if(time == 2){
        goNext();
        time = 0;
    }
}, 1000)