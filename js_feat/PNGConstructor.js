//此模块的函数功能：输入一个PNG的Buffer（来自fs.readfile） 输出含width height data三个属性的 PNG对象 适配featTrainer.js的getGrayScaleMat函数参数
const PNG = require('pngjs').PNG;  
// class PNGGenerator{
//     constructor(){
//     }
  function PNGGenerator(a){ 
    let pngimg = PNG.sync.read(a);
    let imageObject = {       
        width:pngimg.width,  
        height:pngimg.height,
        data:pngimg.data
        };
        return imageObject
}
// }
// let BuffertoPNG = new PNGGenerator();
module.exports = {PNGGenerator};

