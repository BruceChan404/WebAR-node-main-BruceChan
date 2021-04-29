let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');



let flag=0;
let lastTransform=0;

let mVideo = document.createElement('video');

let vc = document.createElement('video');
let src1flag,src2flag,src3flag;
const src1 = "/1.mp4";
const src2 = "/2.mp4";
const src3 = "/3.mp4";
document.getElementById('button').onclick=openCamera;

function openCamera(){
    mVideo.play();
    let constraints = {
        audio : false,
        video :{height:"1000" ,width:"1000", facingMode: 'environment' }
    };
    let stream = navigator.mediaDevices.getUserMedia(constraints);
    stream.then((MediaStream)=>{
        vc.srcObject = MediaStream;
        vc.play();
    }).catch((PermissionDeniedError)=>{alert("can't get access")});
    takePhoto();
}
function takePhoto()
{
    // alert(`${video.clientHeight}x${video.clientWidth}`);

        ctx.drawImage(vc,0,0,500,500);
        let dataURL = canvas.toDataURL(); //dataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA'
        var a= dataURL;
        let b ={a};// b= {a:a}
        // alert(a.toString());
        $.ajax({  //ajax开始
            url:"/image_post",
            type:"POST",
            data:b,
            // processData: false, // 告诉jQuery不要去处理发送的数据
            // contentType: false, // 告诉jQuery不要去设置Content-Type请求头
            success: function (resultt) {
                // alert(`匹配结果：${data.pin}`);
                // ctx.drawImage('H:\\BruceChan\\node\\img.jpg',0,0);

                let result = resultt.res;
                if(resultt.pin==1){
                    if(mVideo.src!=src1flag){
                        video1();
                    }
                }
                if(resultt.pin==2){
                    if(mVideo.src!=src2flag){
                        video2();
                    }
                }
                if(resultt.pin==3){
                    if(mVideo.src!=src3flag){
                        video3();
                    }
                }

                function render() {
                    let state = drawVideo();
                    if (flag==0) {
                       
                      id=requestAnimationFrame(render);
  
                      
                    }
                  }
                flag=0;
                var id = requestAnimationFrame(render);   
                



                function drawVideo(){
                // cancelAnimationFrame(id);
                let transform = result && result.goodMatch > 8 ? result.transform : lastTransform;//大于八个匹配点 说明相机和标准图匹配上了 所以就要就把变换矩阵给回来 如果没有 就还是之前的
                if (transform) {
                ctx.save();// 保存canvas现在的状态为默认，也就是只有摄像头的状态
                // alert('haha1');
                // alert(resultt.data);
                // let [ a, c, e, b, d, f ] = resultt.data;    //仿射变换矩阵
                let [ a, c, e, b, d, f ] = resultt.data;
                // alert('haha');
                ctx.transform(a, b, c, d, e, f);
                let size = resultt.standardPatternLevels[ 0 ];
                ctx.drawImage(mVideo, 0, 0, mVideo.videoWidth, mVideo.videoHeight, 0, 0, size[ 0 ], size[ 1 ]);     //根据本次结果画视频在上面
                ctx.restore();// 还原到上次保存的默认状态
                lastTransform = transform;               //transform默认
                return 1;
                }
                else {
                    return 0;
                }
            }
        },
            error: function (data) {
                alert("上传失败");
                }
        }) //ajax结束
    setTimeout('takePhoto()',140);        // 40ms
    flag=1;

}
function video1(){
    mVideo.src=src1;
    src1flag=mVideo.src;
    mVideo.play();
}
function video2(){
    mVideo.src=src2;
    src2flag=mVideo.src;
    mVideo.play();
}
function video3(){
    mVideo.src=src3;
    src3flag=mVideo.src;
    mVideo.play();
}