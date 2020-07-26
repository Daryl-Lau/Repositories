
/* 
桶排序是计数排序的升级版。
它利用了函数的映射关系，高效与否的关键就在于这个映射函数的确定。
桶排序 (Bucket sort)的工作的原理：
  假设输入数据服从均匀分布，将数据分到有限数量的桶里，每个桶再分别排序（有可能再使用别的排序算法或是以递归方式继续使用桶排序进行排）。

算法描述
  设置一个定量的数组当作空桶；
  遍历输入数据，并且把数据一个一个放到对应的桶里去；
  对每个不是空的桶进行排序；
  从不是空的桶里把排好序的数据拼接起来。 

算法分析
桶排序最好情况下使用线性时间O(n)，桶排序的时间复杂度，取决与对各个桶之间数据进行排序的时间复杂度，
因为其它部分的时间复杂度都为O(n)。很显然，桶划分的越小，各个桶之间的数据越少，排序所用的时间也会越少。但相应的空间消耗就会增大。 
*/

/* 
举个易于理解的例子：
一组数字，9,3,4,0,2,8,5,1,7,6,11,10,18,15,17,12,16,13,19,14
我们把这组数字分组编号成10个桶装起来，但怎么编号分组呢？
这里我们利用数字范围来对数字进行分桶。
首先，最大数减去最小数，获取这组数字的取值范围，然后，我们让这个取值范围除以桶数，获取一个桶的取值范围，
既然知道一个桶的取值范围，那么，通过对比每个数字占用多少个桶，我们就可以获取这个数字所对应的桶的编号了。
（换一句话说，就是每个数字占用多少个取值范围，这里的桶其实就是数字的取值范围的具体化东西）


利用上面的例子做解释：
上面的最大值是19，最小值是0，所以这组数的取值范围是：19-0=19。
我们要用10个桶来分装这组数字，则一个桶的取值范围是：19 / 10 = 1.9。
所以，一个桶的取值范围就是：1.9。

知道了这些之后，我们怎么知道每个数字所对应的桶的编号呢？
我们让每个数字减去最小值再除以一个桶的取值范围就可以获得这个数字所对应的桶编号了，为什么这么说呢？
因为我们就是利用数值范围来分桶的，所以理所当然的也是获取每个数字的取值范围来分桶的编号，而最小值就是我们的取值标准，
当然是要每个数字都减去它才能准确的获取每个数的取值范围了。

根据上面的解释，那么，第一个数字的桶编号就是：(9-0) / 1.9 = 4.7368·······
当然为了确保编号为整数，我们必须给编号取整，这里我们是向上取整，所以第一个数：9的桶编号就是5啦。
其他的数字获取桶编号都是同样的原理，这里就不再重复叙述了。
*/



var cask = function (arr, caskCount) {
  //不是数组，返回false
  if (toString.call(arr) != '[object Array]') {
    return false;
  }
  //获取数组的长度
  var len = arr.length;
  if (len <= 1) {
    return arr;//长度小于等于1不用排序
  }
  var list = [],//装桶的桶，用它来控制存储桶的编号
    result = [],//返回的结果
    max = arr[0],
    min = arr[0];
  //默认桶的个数为10
  var caskCount = parseInt(caskCount) > 0 ? parseInt(caskCount) : 10;
  //获取数组的最大值和最小值
  for (var i = 1; i < len - 1; i++) {
    max = arr[i] <= max ? max : arr[i];
    min = arr[i] >= min ? min : arr[i];
  }
  //分成caskCount个桶，桶所占用的范围
  var range = (max - min) / caskCount;
  for (var i = 0; i < len; i++) {
    //桶的数值减去最小数 min 获取的是桶占用的范围，再除以一个桶的范围，就是获取对应的桶编号
    var index = Math.floor((arr[i] - min) / range);
    //桶里是否有值，有值则进行排序
    if (list[index]) {//用数组模拟桶
      //获取桶最后一个值的下标 
      var k = list[index].length - 1;
      //桶最后的值大于要插进来的值，所以要把这个值插到桶的前面去，但不知道这个值要插入到前面的哪个位置，所以，就只能对比排序了
      //对桶进行排序
      while (k >= 0 && list[index][k] > arr[i]) {
        //桶前面的数字放到后面去
        list[index][k + 1] = list[index][k];//第一个k+1为新增的桶
        //小的提前一个位置
        //list[index][k] = arr[i];
        k--;
      }
      //不用排序的，直接加在桶的最后面
      list[index][k + 1] = arr[i];
    } else {
      //没有值则生成桶，并把值放到对应的桶中
      list[index] = [];
      list[index][0] = arr[i];
    }
  }
  //合并桶
  var n = 0;
  while (n <= caskCount) {
    if (list[n]) {
      result = result.concat(list[n]);
    }
    n++;
  }
  return result;
}


var arr = [9, 3, 4, 0, 2, 8, 5, 1, 7, 6, 11, 10, 18, 15, 17, 12, 16, 13, 19, 14];
console.time();
console.log((cask(arr, 10)));
console.timeEnd();