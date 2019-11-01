// ==UserScript==
// @name         智慧树
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  ???
// @author       xhh
// @match        *://study.zhihuishu.com/learning/videoList*
// @icon         https://assets.zhihuishu.com/icon/favicon.ico
// @grant        none
// ==/UserScript==

window.onload = function(){
    setTimeout(fun,2000);
}
function fun(){
    var myinterval = null;
	
    myinterval = setInterval(function(){
		//check progress
		var pro=document.getElementsByClassName("progressbar_box_tip")[0].innerText;
		var pronum=pro.substring(12,pro.length-2);
		if(pronum=="100"){
			nextchap();
		}
		//check chall
        if(document.getElementsByClassName('wrap_popboxes')[0]!=null){
			ans();
        }
    }, 50);
}
function nextchap(){
	var cur=document.getElementsByClassName("current_play")[0];
	var next=cur.nextElementSibling;
	while(next.getAttribute("class")!="clearfix video children"){
		next=next.nextElementSibling;
	}
	next.click();
}
function ans(){
	var anslist=document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName('answerOption');
	var ansnum=anslist.length;
	var type="";
	if(anslist[0].getAttribute('_type')!=null){
		type=anslist[0].getAttribute('_type')
	}
	else{
		type=anslist[0].getAttribute('type')
	}
	switch(type){
		case "radio":
			for(var i = 0; i < ansnum; i++){
				anslist[i].getElementsByTagName('input')[0].click();
				if(document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName('exam_correct')[0]!=null){
					document.getElementsByClassName('popbtn_cancel')[0].click();
					break;
				}
			}
			break;
		case "checkbox":
			for(var j=1;j<Math.pow(2,ansnum);j++){
				var test="0".repeat(ansnum-j.toString(2).length)+j.toString(2)
				for(var k = 0; k < ansnum; k++){
					if(test[k]=="1"){
						anslist[k].getElementsByTagName('input')[0].click();
					}
				}
				if(document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName('exam_correct')[0]!=null){
					document.getElementsByClassName('popbtn_cancel')[0].click();
					break;
				}
				clearcheck();
			}
			break;
		default:
			break;
	}
}
function clearcheck(){
	var anslist=document.getElementById("tmDialog_iframe").contentWindow.document.getElementsByClassName('answerOption');
	var ansnum=anslist.length;
	for(var i = 0; i < ansnum; i++){
		anslist[i].getElementsByTagName('input')[0].checked=false;
	}
}
