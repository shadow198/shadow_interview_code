function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]'
}
document.getElementById('box').innerText = isArray([1,2])

// 作用域安全的构造函数
function Person (name,age,job) {
    if (this instanceof Person) {
        this.name = name;
        this.age = age;
        this.job = job;
    } else {
        return new Person(name,age,job)
    }
}

var person1 = Person('wang',22,'Software Engineer');
alert(person1.name)

// 惰性载入函数
function createXHR() {
    if (typeof XMLHttpRequest != "undefined") {
        createXHR = function() {
            return new XMLHttpRequest();
        }
    } else if (typeof ActiveXObject != "undefined") {
        createXHR = function () {
            if (typeof arguments.callee.activeXString != "string") {
                var versions = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"], i ,len
            }
            for (let i = 0; i < array.length; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (error) {
                    
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        }
    } else {
        createXHR = function() {
            throw new Error ("NO XHR object available")
        }
    }
    return createXHR();
}
var xhr = createXHR();
console.log(xhr)

// 函数绑定
var handler = {
    message: 'Event handled',
    handleClick: function(event) {
        alert(this.message)
    }
}
var btn = document.getElementById('my-btn');
btn.addEventListener('click',function(event) {
    handler.handleClick(event)
})

// 通用绑定方法
function bind(fn,context) {
    return function() {
        return fn.apply(context,arguments)
    }
}
var handler1 = {
    message: 'Event Handled',
    handleClick: function (event) {
        alert(this.message + ':' + event.type)
    }
}
var btn1 = document.getElementById('my-btn1');
btn1.addEventListener('click',bind(handler1.handleClick,handler1))
// btn1.addEventListener('click', handler1.handleClick.bind(handler1))

// 函数柯里化(只传递给函数一部分参数来调用它,让它返回一个函数去处理剩下的参数)

// 基本原理
function add(num1,num2) {
    return num1 + num2;
}
function curriedAdd(num2) {
    return add(5,num2)
}

var curriedAdd = curry(add,5)
alert(curriedAdd(3))

// demo2
function multiply(a) {
    return (b) => {
        return (c) => {
            return  a * b * c
        }
    }
}
console.log(multiply(1)(2)(3));


// 通用方式(第一版)
function curry(fn) {
    var args = Array.prototype.slice.call(arguments,1);
    console.log('args', args)
    return function () {
        var innerArgs = Array.prototype.slice.call(arguments);
        console.log('innerArgs', innerArgs);
        var finalArgs = args.concat(innerArgs);
        console.log('finalArgs', finalArgs)
        return fn.apply(null,finalArgs);
    }
}

// 第二版
function curry2(fn,length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;
    return function() {
        if (auguments.length < length) {
            var combined = [fn].concat(slice.call(auguments));
            return curry2(curry.apply(this,combined),length-arguments.length);
        } else {
            return fn.apply(this,arguments)
        }
    }
}


// ES6版本
function curry_new (fn, ...args) {
    return (..._arg) => {
        return fn(...args, ..._arg)
    }
}


// 应用场景实例
function volume(l,h,w) {
    return l*h*w;
}

const hcy = curry_new(volume,100)
console.log(hcy)


// 防篡改对象
// 1. 不可控扩展对象(现有属性可以更改)
var person2 = {name: "shadow"}
Object.preventExtensions(person2);
person2.age = 29
console.log('person2:age', person2.age)  // undefined
console.log(Object.isExtensible(person2)) // 检测是否可以扩展

// 2.密封的对象(不可扩展,已有成员的configurable特性值为false)
var person3 = {name: 'wang'}
Object.seal(person3)
Object.isSealed(person3) // 检测是否被密封

// 3. 冻结对象(既不可扩展,又是密封,而且对象成员writable属性为false)
var person4 = {name: 'sss'}
Object.freeze(person4)
Object.isFrozen(person4) // 检测是否冻结

// 函数节流(持续触发事件,每个一段时间,只执行一次)

// 使用时间戳(立即执行,停止触发后没有办法再执行事件)
function throttle_timestap(func,wait) {
    var context, args;
    var previous = 0;
    return function() {
        var now =+new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context,args);
            previous = now;
        }
    }
}
function show () {
    console.log('test throttle')
}

// var test_throttle = throttle_timestap(show,4000)
// document.getElementById('my-btn2').addEventListener('click',test_throttle)

// 使用定时器(会在N秒后执行,停止触发后依然会再执行一次事件)
function throttle_timer(func,wait) {
    var timeout;
    return function() {
        context = this;
        args = arguments;
        if(!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context,args);
            },wait)
        }
    }
}

var test_throttle_timer = throttle_timer(show,4000)
document.getElementById('my-btn2').addEventListener('click',test_throttle_timer)


// 双剑合璧
function throllte_timestap_timer(func,wait) {
    var timeout,context,args,result;
    var previous = 0;

    var later = function() {
        previous = +new Data();
        timeout = null;
        func.apply(context,args);
    }

    var throttled = function() {
        var now = new Date();
        // 下次触发 func 剩余的时间
        var remaining = wait - (now - previous)
        context = this;
        args = arguments;
        // 如果没有剩余的事件或改变了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context,args);
        } else if (!timeout) {
            timeout = setTimeout(later,remaining);
        }
    }
    return throttled;
}

// 自定义事件
