// JavaScript Document

//domReady
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function domReady(fn){
	if(document.addEventListener){
		addEvent(document,'DOMContentLoaded',function(){
			fn && fn();
		});
	}else{
		addEvent(document,'readystatechange',function(){
			if(document.readyState == 'complete'){
				fn && fn();
			}
		});
	}
}

//弹性运动
function Elastic(obj,iTarget){
	var l=obj.offsetLeft;
	var speed=0;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		speed+=(iTarget-obj.offsetLeft)/5;
		speed*=0.6;
		
		l+=speed;
		obj.style.left=parseInt(l)+'px';
		
		if(Math.abs(speed)<1){speed=0;}
		
		if(iTarget==parseInt(l) && speed==0){
			clearInterval(obj.timer);
			//alert('停止了');
		}
			
	},30);	
}
//时间绑定  兼容问题解决

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);	
	}
}
//调用方法	addEvent(document,'click',show);