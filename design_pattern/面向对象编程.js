// 封装
var Book = function(id,bookname,price){
    // 私有属性
    var num = 1;
    // 私有方法
    function checkId() {

    }
    // 特权方法
    this.getName = function(){};
    console.log(this)

    // 对象共有属性
    this.id = id;
    this.bookname = bookname;
    this.price = price;

    // 对象共有方法
    this.copy = function(){};

    // 构造器
    this.setName(name)
    this.setPrice(price)

    // 类静态共有属性
    Book.isChinese = true;
    // 类静态共有方法
    Book.resetTime = function(){};

    Book.prototype = {
        // 共有属性
        isJSBook: false,
        // 公有方法
        display: function(){}
    }
}

// 闭包实现
var Book1 = (function(){
    //  静态私有变量
    var bookNum = 0;
    // 静态私有方法
    function checkBook(name) {};
    // 返回构造函数
    function _book(newId,newName,newPrice) {
        // 私有变量
        var name,price;
        // 私有方法
        function checkID(id) {};
        // 特权方法
        this.getName = function(){};
        this.getPric = function(){};
        this.setName = function(){};
        this.setPrice = function(){};
        // 共有属性
        this.id = newId;
        // 共有方法
        this.copy = function(){};
        bookNum ++;
        if (bookNum > 100) {
            throw new Error('我们仅出版100本书');
        }
        this.setName(name);
        this.setPrice(price);
    }
    _book.prototype = {
        isJsBook: false,
        display: function(){}
    }
    return _book;
})();



// 继承
// 1. 类式继承

// 声明父类
function SuperClass(){
    this.supperValue = true;
};
// 为父类添加共有方法
SuperClass.prototype.getSuperValue = function(){
    return this.supperValue;
};
// 声明子类
function SubClass () {
    this.subValue = false;
}
// 继承父类
SubClass.prototype = new SuperClass();
// 为子类添加共有方法
SubClass.prototype.getSubValue = function(){
    return this.subValue;
}

// 组合继承(类式继承和构造函数组合,缺点实现子类继承时候调用了父类的构造函数,导致构造函数调用两次)

// 声明父类
function SuperClass1(name) {
    this.name = name;
    this.books = ['html','css','Javascript'];
}
// 父类原型共有方法
SuperClass1.prototype.getName = function(){
    console.log(this.name);
}
// 声明子类
function SubClass1(name,time) {
    SuperClass1.call(this, name);
    this.time = time;
}

SubClass1.prototype = new SuperClass1();
SubClass1.prototype.getTime = function(){
    console.log(this.time)
}


var instance_combo = new SuperClass1('js book', 2020);
instance_combo.books.push('设计模式');
console.log(instance_combo.books)

// 寄生组合式继承

// 寄生代码
function inheritObject(o) {
    function F() {}
    F.prototype = o;    
    return new F();
}

function inheritPrototype(subClass, superClass) {
    // 复制一份父类的原型副本保存在变量中
    var p = inheritObject(superClass.prototype);
    // 修正因为重写子类原型导致子类的constructor被修改
    p.constructor = superClass;
    // 设置子类的原型
    subClass.prototype = p;
}

// 定义父类
function SuperClass2(name) {
    this.name = name;
    this.colors = ['red','blue','green'];
}
// 定义父类原型方法
SuperClass2.prototype.getName  = function(){
    console.log(this.name);
}
// 定义子类
function SubClass2 (name,time) {
    // 构造函数继承
    SuperClass1.call(this,name);
    // 子类新增属性
    this.time = time;
}

// 寄生式继承父类原型
inheritPrototype(SubClass2,SuperClass2);
// 子类新增原型方法
SubClass2.prototype.getTime = function(){
    console.log(this.time)
}

// 创建两个测试方法
var instance1 = new SuperClass2('js book', 2014);
var instance2 = new SuperClass2('css book',2015);

instance1.colors.push('black');
console.log(instance1.colors);
console.log(instance2.colors);



var a = new Book1(1,'设计模式', 100);
console.log(a.getName)
// 也可以通过在类的原型上添加属性和犯法
// 1. Book.prototype.display = function(){}
// 2. Book.prototype = {
//     display: function(){};
// }

// 通过this添加的方法属性在当前对象上添加,通过prototype添加的指向其继承的属性,不会再次创建
