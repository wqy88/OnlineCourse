// ==UserScript==
// @name         超星暂停
// @namespace    https://mooc1-1.chaoxing.com/
// @version      999
// @description  ???
// @author       xhh
// @match        *://mooc1-1.chaoxing.com/*
// @icon         https://www.chaoxing.com/favicon.ico
// @grant        none
// ==/UserScript==

window.onload = function(){
    setTimeout(fun,2000);
}
function fun(){
    var myinterval = null;
    var myinterval1 = null;
    var myinterval2 = null;
    var myvideo = null;
    var mytree = null;
    var curclass = null;
    //提醒答题
    checkNotification();



    myinterval1 = setInterval(function(){

        if(document.querySelector('.x-container')!=null){
            var ans=document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
            if(ans!=null){
                speakxhh();
                noticexhh();
                clearInterval(myinterval1);
            }
        }
    }, 50);

    myinterval = setInterval(function(){
        myvideo = document.querySelector('video');
        mytree = window.top.document.querySelector('#coursetree');
        if(myvideo&&mytree){
            var poster = document.querySelector('.vjs-poster');
            //             console.log(myvideo.currentTime+':'+myvideo.duration);
            if(isNaN(myvideo.duration)){
                poster.click();
            }
            else if(myvideo.paused && (myvideo.duration - myvideo.currentTime > 10)){
                poster.click();
            }
            else if(myvideo.duration - myvideo.currentTime < 10){
                curclass = window.top.document.querySelector('#coursetree').getElementsByClassName('currents')[0];
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
    var noticeinterval = setInterval(function(){
        var ans=document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
        if(ans==null){
            clearInterval(noticeinterval);
        }
        var notification = new Notification("答题了！");;
    }, 5000);
}

function speakxhh(){
    var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI("小灰灰提醒您：看题不做题，亲人两行泪");
    var n = new Audio(url);
    n.src = url;
    var speakinterval = setInterval(function(){
        var ans=document.querySelector('.x-container').querySelector('.ans-videoquiz-title');
        if(ans==null){
            clearInterval(speakinterval);
        }
        n.play();
    }, 5000);
}
