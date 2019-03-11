####1.线性比例尺 scaleLinear()
domain域和range域可以是连续变化;
用来计算一个值根据比例尺对应的数据,一个值对应一个返回值,具体看代码
####2.序数比例尺 scaleOrinal
domain域和range域是离散的,也就是数组.返回值是定的,
一个范围内的值只对应一个返回值,具体看代码

scaleLinear的domain是数组 [min,max],
scaleOrinal的domain是数组 [1,2,3,4,5,6,7],需要列出所有
scaleBand同scaleOrinal
