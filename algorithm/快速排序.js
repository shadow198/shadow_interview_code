/**
 * 1. 在数据集中,选择一个元素作为基准
 * 2. 所有小于基准的移到基准左边,所有大于基准的元素移到基准右边
 * 3. 对基准两边的两个子集,不断重复第一步和第二步,知道所有子集只剩下一个元素为止
 */

export var quickSort = function(arr) {
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
  console.log('arr',arr)
  console.log('left',left)
  console.log('right',right)
  console.log(quickSort(left).concat([pivot], quickSort(right)))
  return quickSort(left).concat([pivot], quickSort(right));
};
var test_arr = [85, 25, 63, 45, 17, 31, 96, 50];
console.log(quickSort(test_arr));