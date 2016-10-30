	//事件绑定函数封装
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}

function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		bDown=oEvent.detail?oEvent.detail>0:oEvent.wheelDelta<0;
		/*
		if(fn){
			fn(bDown);
		}
		*/
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',wheel);
	}else{
		addEvent(obj,'mousewheel',wheel);
	}
}

/*
调用方法 传入 加滚动事件的对象 和function
addWheel(oDiv,function(bDown){
	if(bDown){
		oDiv.style.height = oDiv.offsetHeight+10+'px';
	}else{
		oDiv.style.height = oDiv.offsetHeight-10+'px';
	}
})
*/

