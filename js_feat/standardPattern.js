const trainer = require('./featTrainer');
const fs = require('fs');
// const PNG = require('pngjs').PNG;  // 引入PNG模块 便于读取长宽
const abc = require('./PNGConstructor');  //把abc写成别的，调用就也是别的,此处相当于abc=PNGGenerator 是另一个模块的代换

let imagePatternArray = new Array();   //创建Pattern的信息存放数组

let dirpath = __dirname+'/standard images/';   //读取图片的目录
let imgPath = fs.readdirSync(dirpath);         //读取图片目录下的文件 文件名以字符串的形式存在imgPath数组中
// console.log(imgPath); // [ 'stan.png', 'stan1.png', 'stan2.png', 'stan3.png' ]

for(let a of imgPath){                      // for(let 形参 of 数组) 的形式 形参就是数组中的元素

let stanImage1234 = fs.readFileSync(dirpath+a);  //<Buffer xxxxxxxxx>  //通过fs模块读取每个文件的Buffer
let imageobject = abc.PNGGenerator(stanImage1234);

//已弃用
// let pngimg = PNG.sync.read(stanImage1234);       //通过PNG.sync.read 读Buffer，将Buffer对象存储为PNG对象类型，便于使用PNG对象直接读取width height data
// let imageobject = {            //自己定义一个对象 找出getGrayScaleMat函数所需的三个参数，以一个对象的形式存储，这样就可以直接调用这个imageobject，因为PNG对象有很多属性 所以不能直接用getGrayScaleMat函数
//     width:pngimg.width,  
//     height:pngimg.height,
//     data:pngimg.data
//     };
//已弃用

let stanGrayScale1234 = trainer.getGrayScaleMat(imageobject);//计算灰度值
let pattern1234 = trainer.trainPattern(stanGrayScale1234);  //通过灰度值计算出Pattern
imagePatternArray.push(pattern1234);            //push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
}
console.log(imagePatternArray.length);
// console.log(imagePatternArray[0]);
module.exports = imagePatternArray; // 标准pattern数组输出


