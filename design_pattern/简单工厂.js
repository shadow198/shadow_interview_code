// 篮球基类
var BasketBall = function(){
    this.intro = '篮球盛行于美国';
}
BasketBall.prototype = {
    getMember: function() {
        console.log('每个队伍需要五个队员')
    },
    getBallSize: function() {
        console.log('篮球很大')
    }
}

//  足球基类
var Football = function() {
    this.intro = '足球在世界范围内很流行'
}
Football.prototype ={
    getMember: function() {
        console.log('每个队伍需要11名队员')
    },
    getBallsize: function() {
        console.log('足球很大')
    }
}

var SportFactory = function(name) {
    switch (name) {
        case 'NBA':
            return new BasketBall();
            break;
        case 'wordCup': 
            return new Football();
        default:
            break;
    }
}


// 实际应用
function createPop(type,text) {
    var o = new Object();
    o.content = text;
    o.show = function() {
        // 显式方法
    }
    if (type === 'alert') {
        // 警示框差异部分
    }
    if (type === 'prompt') {
        // 提示框差异部分
    }
    if (type === 'confirm') {
        // 确认框差异部分
    }
    return o;

}