// ==UserScript==
// @name         超星暂停
// @namespace    https://mooc1-1.chaoxing.com/
// @version      1.4
// @description  ???
// @author       xhh
// @match        *://mooc1-1.chaoxing.com/*
// @icon         https://www.chaoxing.com/favicon.ico
// @grant        none
// ==/UserScript==
var ansflag = true;
window.onload = function(){
    setTimeout(fun,2000);
}
window.alert = function(){
    return false;
}
function fun(){
    var myinterval = null;
    var myinterval1 = null;
    var myinterval2 = null;
    var myvideo = null;
    var mytree = null;
    var curclass = null;
    var iframe2 = window.top.document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online')[0].contentWindow;


    checkNotification();
    //提醒答题
    myinterval1 = setInterval(function(){
        //         console.log(iframe2.document.querySelector('.x-container'));
        if(iframe2.document.querySelector('.x-container')!=null){
            var ans=iframe2.document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
            if(ans!=null){
                clearInterval(myinterval1);
                ansflag=false;
                var opt = iframe2.document.getElementsByClassName('ans-videoquiz-opts')[0].getElementsByTagName('li');
                var optlen = opt.length;
                var myArray=new Array();
                //                 var casenum = 0;
                //                 for(var i = 1;i<(optlen+1);i++){
                //                     for(var j=0;j<C(optlen,i);j++){
                //                         myArray[casenum]=new Array(optlen);
                //                         //初始化数组
                //                         for(var k=0;k<optlen;k++){
                //                             myArray[casenum][k]=0;
                //                         }
                //                         if
                //                         casenum++;
                //                 }
                if(optlen==2){
                    myArray[0]=[1,0];
                    myArray[1]=[0,1];
                    myArray[2]=[1,1];
                }
                else if(optlen==4){
                    myArray[0]=[1,0,0,0];
                    myArray[1]=[0,1,0,0];
                    myArray[2]=[0,0,1,0];
                    myArray[3]=[0,0,0,1];
                    myArray[4]=[1,1,0,0];
                    myArray[5]=[1,0,1,0];
                    myArray[6]=[1,0,0,1];
                    myArray[7]=[0,1,1,0];
                    myArray[8]=[0,1,0,1];
                    myArray[9]=[0,0,1,1];
                    myArray[10]=[1,1,1,0];
                    myArray[11]=[1,1,0,1];
                    myArray[12]=[1,0,1,1];
                    myArray[13]=[0,1,1,1];
                    myArray[14]=[1,1,1,1];
                }
                for(var i = 0;i<myArray.length;i++){
                    if(optlen==2){
                        opt[0].getElementsByTagName('input')[0].checked=ans2(myArray[i][0]);
                        opt[1].getElementsByTagName('input')[0].checked=ans2(myArray[i][1]);
                    }
                    else if(optlen==4){
                        opt[0].getElementsByTagName('input')[0].checked=ans2(myArray[i][0]);
                        opt[1].getElementsByTagName('input')[0].checked=ans2(myArray[i][1]);
                        opt[2].getElementsByTagName('input')[0].checked=ans2(myArray[i][2]);
                        opt[3].getElementsByTagName('input')[0].checked=ans2(myArray[i][3]);
                    }
                    iframe2.document.getElementsByClassName('ans-videoquiz-submit')[0].click();
                    if(iframe2.document.querySelector('.x-container').querySelector('.ans-videoquiz-title')==null){
                        ansflag=true;
                        break;
                    }
                    sleep(3000);
                }
                //                 speakxhh();
                //                 noticexhh();
                //                 clearInterval(myinterval1);
            }
        }
    }, 50);

    myinterval = setInterval(function(){
        myvideo = iframe2.document.querySelector('video');
        //         console.log(myvideo);
        mytree = window.top.document.querySelector('#coursetree');
        curclass = window.top.document.querySelector('#coursetree').getElementsByClassName('currents')[0];
        var point = curclass.getElementsByClassName('roundpointStudent')[0].innerText;
        if(myvideo&&mytree){
            var poster = iframe2.document.querySelector('.vjs-poster');
            //             console.log(myvideo.currentTime+':'+myvideo.duration);
            if(isNaN(myvideo.duration)){
                poster.click();
            }
            else if(ansflag==false && myvideo.pause == false){
                poster.click();
            }
            else if(ansflag && myvideo.paused && (point == '2')){
                poster.click();
            }
            else if(point == '1'){
                var nnextclass = curclass.parentNode.nextElementSibling;
                if(nnextclass==null){//章节最后一课
                    var nnextchapter = curclass.parentNode.parentNode.nextElementSibling.querySelector('.ncells');
                    nnextchapter.querySelector('h4').querySelector('a').click();
                }
                else{
                    nnextclass.querySelector('h4').querySelector('a').click();
                }
            }
        }
    }, 50);
}

function checkNotification(){
    if (!("Notification" in window)) {
        alert("用chrome听网课");
    }
    else if (Notification.permission != 'grant') {
        Notification.requestPermission();
    }
}
function noticexhh(){
    var iframe2 = window.top.document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online')[0].contentWindow;
    var noticeinterval = setInterval(function(){
        var ans=iframe2.document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
        if(ans==null){
            ansflag=true;
            clearInterval(noticeinterval);
        }
        var notification = new Notification("答题了！");;
    }, 8000);
}

function speakxhh(){
    var iframe2 = window.top.document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online')[0].contentWindow;
    var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI("小灰灰提醒您：看题不做题，亲人两行泪");
    var n = new Audio(url);
    n.src = url;
    var speakinterval = setInterval(function(){
        var ans=iframe2.document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
        if(ans==null){
            clearInterval(speakinterval);
        }
        n.play();
    }, 5000);
}

function C(m,n){
    return factorial(m,n)/factorial(n,n);
}
function factorial(m,n){
    var num = 1;
    var count = 0;
    for(var i = m;i > 0;i--){
        if(count == n){
            break;
        }
        num = num * i;
        count++;
    }
    return num;
}
function ans2(a){
    if(a==1){
        return true;
    }
    else{
        return false;
    }
}
function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime){
            return;
        }
    }
}
