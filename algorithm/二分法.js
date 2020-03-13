/**
 * !  前提是有序列表
 * 1. 选择中间值
 * 2. 如果选择的是待搜搜的值,算法结束并返回
 * 3. 如果待搜索的值比选中值要小,则返回步骤1并在选中值左边的子数组中寻找
 * 4. 如果待搜索值比选中值要大,则返回步骤1并在选中值右边的子数组中寻找
 */
var quickSort = function(arr) {
  // 检查元素个数,如果小于等于1,就返回
  if (arr.length <= 1) {
    return arr;
  }
  // 选择基准,并将其与原数组分离,在定义两个空数组,用来存放一左一右的两个子集
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  // 遍历数组,小于基准的元素放入左边的子集,大于基准的放入右边的子集
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
};
var test_arr = [85, 25, 63, 45, 17, 31, 96, 50];

function binSearch(arr,data){
  var arr = quickSort(arr);
  //要查找的元素列表
  let low = 0;
  let len = arr.length;
  //范围缩小开始循环
  while (low <= len){
    //获取该列表的中间元素
    let mid = Math.floor((low+len)/2);

    /**
     * 取出元素判断和传入数进行对比，如果小于进行加1循环，大于进行减1循环
     * 直到循环出当前下标告知元素所在位置
     */
    if(arr[mid] < data){
      low = mid + 1
    }else if(arr[mid] > data){
      len = mid - 1;
    }else{
        return mid
    }
  }
  //没找到返回-1
  return -1;
}

console.log(binSearch(test_arr, 85))