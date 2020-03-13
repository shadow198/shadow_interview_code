// 找到数据结构中的最小值并将其放在第一位,接着找到第二小的值并将其放到第二位,以此类推
selectionSort = function(array) {
  var length = array.length;
  var indexMin;
  for (var i = 0; i < length - 1; i++) {
    indexMin = i;
    for (var j = i; j < length; j++) {
      // 当前最小值比比较数大,则替换最小值下标为当前值得索引值
      if (array[indexMin] > array[j]) {
        indexMin = j;
      }
    }
    // 
    if (i != indexMin) {
      swap(array, i, indexMin);
    }
  }
};

var swap = function swap(array, index1, index2) {
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
};

var arr = [1,3,29,11,45,55,53,65,12,13]




selectionSort(arr)
console.log(arr.toString());