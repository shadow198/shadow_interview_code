// 1. 执行栈和时间队列

// 1. JavaScript代码执行的时候回将不同的变量存于不同的位置: 堆存放对象, 栈存放处理类型的变量,已经对象的指针

// 2.在调用一个方法时,js会生成一个与方法对于的执行环境context,又叫执行上下文,这个执行环境中存放方法的私有作用域,上层作用域指向,方法的参数,这个作用域定义的变量,以及这个作用域的this对象

// 3. 由于js是单线程,同一时间只能执行一个方法,于是这些方法被排队在一个单独的地方.这个地方被称为执行栈





console.log('1主线程');					//整体script作为第一个宏任务进入主线程
setTimeout(function() {				//setTimeout，其回调函数被分发到宏任务Event Queue（执行规则：从上到下排序，先进先执行）中
    console.log('2宏任务');
    process.nextTick(function() {
        console.log('3宏任务里面的微任务');
    })
    new Promise(function(resolve) {
        console.log('4微任务');
        resolve();
    }).then(function() {
        console.log('5微任务')
    })
})
process.nextTick(function() {	//process.nextTick()其回调函数被分发到微任务Event Queue中
    console.log('6微任务');
})
new Promise(function(resolve) {		//Promise，new Promise直接执行，输出7
    console.log('7微任务');
    resolve();
}).then(function() {
    console.log('8微任务')			//then被分发到微任务Event Queue中,排在process.nextTick微任务后面。
})
setTimeout(function() {			//setTimeout，其回调函数被分发到宏任务Event Queue中,排在前面的setTimeout后面
    console.log('9宏任务');
    process.nextTick(function() {
        console.log('10宏任务里面的微任务');
    })
    new Promise(function(resolve) {
        console.log('11微任务');
        resolve();
    }).then(function() {
        console.log('12微任务')
    })
})
