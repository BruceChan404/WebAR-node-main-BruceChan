const PNGConstructor = require('./PNGConstructor');
const fs = require('fs') ; 
const path = require('path');
let a = fs.readFileSync('H:/BruceChan/node/images/图片1.png');
let b = fs.readFileSync('H:/BruceChan/node/images/图片1-迅捷PDF转换器.png');
// let pnga = PNGConstructor.PNGGenerator(a);
// let pngb = PNGConstructor.PNGGenerator(b);
console.log(a);