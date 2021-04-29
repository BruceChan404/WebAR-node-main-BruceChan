const trainer = require('./featTrainer');
const jsfeat = require('./jsfeat');
const fs = require('fs');
const path = require('path');
const standardPatternArray = require('./standardPattern');
const stan = standardPatternArray;

function matchFeaturePoings(features){
    let good = 0;
    let pin = 0;
    let res = 0;
    let standardPatternLevels = 0;
    const feature = features;
    // console.log(features);
    let i=1;

for(let pattern of stan){
    console.log(`------------第${i}次开始------------`);
    // console.log(typeof pattern);
    let matchedPoints = trainer.matchPattern(feature.descriptors, pattern.descriptors); //特征点匹配
    let result = trainer.findTransform(matchedPoints, feature.keyPoints, pattern.keyPoints); //计算仿射矩阵
    // console.log(`第${i}次的result.transform是${result.transform}`);
    // console.log(`第${i}次的result.goodMatch是${result.goodMatch}`);
    // console.log(pattern);
    if(result!=undefined){
        console.log(`                    匹配${result.goodMatch}个`);

        if(result.goodMatch>good)
        {
            good=result.goodMatch;
            pin = i;
            res = result;
            standardPatternLevels = pattern.levels;
        }
    }
    else{
       console.log(`                   匹配0个`);
    }
    console.log(`------------第${i}次结束------------`);
    i++;
}

if (res.goodMatch<8){
    pin=0;
    res=0;
}
if(res){
console.log(`res.transform是`,res.transform.data);
let [a,b,c,d,e,f]=res.transform.data;
var data =[a,b,c,d,e,f];
console.log(data);
console.log(`pin=${pin}`);
}
else{
    res=0;
var data=0;
    standardPatternLevels=0;
}

if(pin==1)
{console.log(`匹配结果：小鳄鱼抽烟`);}
if(pin==2)
{console.log(`匹配结果：小鳄鱼锤子`);}
if(pin==3)
{console.log(`匹配结果：小梁`);}
if(pin==4)
{console.log(`匹配结果：小鳄鱼舔狗`);}
let sendBack = {res,pin,standardPatternLevels,data};
return sendBack;
}

module.exports= matchFeaturePoings;