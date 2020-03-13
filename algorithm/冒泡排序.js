
var bubbleSort = function(array) {
    var length = array.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length -1; j++) {
            if (array[j] > array[j+1]) {
                swap(array,j,j+1)
            }
        }
    }
}

var swap = function swap(array,index1,index2){
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
}
var arr = [1,3,29,11,45,55,53,65,12,13]
bubbleSort(arr)
console.log(arr)