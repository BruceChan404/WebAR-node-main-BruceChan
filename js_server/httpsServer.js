const express = require('express');
const fs = require('fs') ; 
const https = require('https'); 
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PNGConstructor = require('../js_feat/PNGConstructor');
const trainer = require('../js_feat/featTrainer');
const matcher = require('../js_feat/feature');
let pp = path.join(__dirname,'..');
const num=23;
let i=1;
// 把bodyparser注册到app下
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: false}));
app.get('/', function(req, res) {
   let content = fs.readFileSync(pp+'/html_camera/webRTC.html',"utf-8");
  res.send(content);
});
app.get('/opencamera.js', function(req, res) {
  let content = fs.readFileSync(pp+'/js_camera/opencamera.js',"utf-8");
 res.send(content);
});
app.get('/jquery.js',function(req,res){
  let content = fs.readFileSync(pp+'/js_camera/jquery.js');
  res.send(content);
})
app.get('/1.mp4', function(req, res) {
  fs.stat(pp+'/js_feat/standard videos/1.mp4',(err,stats)=>{
    let [start,end]=getRange(req.headers['range'],stats)
    res.setHeader('Content-Range',`bytes ${start}-${end}/${stats.size}`)
    res.setHeader('Content-Type','video/mp4')
    res.setHeader('Content-Length',end==start?0:end-start+1)
    res.writeHead(206)
    fs.createReadStream(pp+'/js_feat/standard videos/1.mp4',{
      start:start,
      end:end
    }).pipe(res)
  })
  return
}
);
app.get('/2.mp4', function(req, res) {
  fs.stat(pp+'/js_feat/standard videos/2.mp4',(err,stats)=>{
    let [start,end]=getRange(req.headers['range'],stats)
    res.setHeader('Content-Range',`bytes ${start}-${end}/${stats.size}`)
    res.setHeader('Content-Type','video/mp4')
    res.setHeader('Content-Length',end==start?0:end-start+1)
    res.writeHead(206)
    fs.createReadStream(pp+'/js_feat/standard videos/2.mp4',{
      start:start,
      end:end
    }).pipe(res)
  })
  return
}
);
app.get('/3.mp4', function(req, res) {
  fs.stat(pp+'/js_feat/standard videos/3.mp4',(err,stats)=>{
    let [start,end]=getRange(req.headers['range'],stats)
    res.setHeader('Content-Range',`bytes ${start}-${end}/${stats.size}`)
    res.setHeader('Content-Type','video/mp4')
    res.setHeader('Content-Length',end==start?0:end-start+1)
    res.writeHead(206)
    fs.createReadStream(pp+'/js_feat/standard videos/3.mp4',{
      start:start,
      end:end
    }).pipe(res)
  })
  return
}
);


app.get('/10.10.100.24_key.txt', function(req, res) {
  let content = fs.readFileSync(pp+'/SSLcertificate/10.10.100.24_key.txt',"utf-8");
 res.send(content);
});
app.get('/10.10.100.24_ssl.crt', function(req, res) {
  let content = fs.readFileSync(pp+'/SSLcertificate/10.10.100.24_ssl.crt',"utf-8");
 res.send(content);
});

app.post('/image_post',(req,res)=>{
  console.time('test');
  let resultt=0;
  // let a= JSON.parse('req.body');
  // console.log(req.body);
  let data=req.body.a;
  let filter = data.replace(/^data:image\/\w+;base64,/, "");
  console.log('------------------');
  // console.log(filter);
  var filterbuffer = new Buffer.from(filter, 'base64');
  console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(filterbuffer));
  let imgpath = path.join(pp,'images','图片'+i.toString()+'.png');

  console.log(imgpath);
  fs.writeFile(imgpath,filterbuffer,function(err){//用fs写入文件
    if(err){
        console.log(err);
    }
    else{
       console.log('写入成功！');
//        //////////////////////////////////////
//       //  if(fs.readFileSync(imgpath)===filterbuffer)
//       // { console.log('1');}
//       // else{
//       //   console.log('0');
//       //   console.log(fs.readFileSync(imgpath));
//       //   console.log('------------------');
//       //   console.log(filterbuffer);}
    /////////////////////////////////////////
      i++; 
      let inputPNG = PNGConstructor.PNGGenerator(filterbuffer);
      let inputPNGgrayscale = trainer.getGrayScaleMat(inputPNG);
      let inputPattern = trainer.describeFeatures(inputPNGgrayscale);
      resultt = matcher(inputPattern);
      res.send(resultt);
      console.timeEnd('test');
      ///////////////////////////////
    }
  }
)
////////////////////////////////////////////
})
const privateKey = fs.readFileSync(pp+'/SSLcertificate/10.10.100.24_key.txt', 'utf8');
const certificate = fs.readFileSync(pp+'/SSLcertificate/10.10.100.24_ssl.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };
const httpsServer = https.createServer(credentials, app);
const SSLPORT = 8081;
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT)
})

function getRange(range,stats){
	var r=range.match(/=(\d+)-(\d+)?/)
	var start=r[1]
	var end=r[2]||stats.size-1
	return [parseInt(start),parseInt(end)];
}