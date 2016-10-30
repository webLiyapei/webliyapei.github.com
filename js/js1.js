domReady(function(){
	var oLoad=document.querySelector('.load');
	var oContent=document.querySelector('.content');
	var oLoading=document.querySelector('.loading2');
	var oNav=document.querySelector('.nav');
	var aNav_btn=document.querySelectorAll('.nav li');
	var oClouds=document.querySelector('.nav span');
	var oMain_page=document.querySelector('.content .main_page');
	
//加载页---------------------------------------------------------------------------

	var aImg=document.querySelectorAll('img');
	var imgN=0;
	for(var i=0;i<aImg.length;i++){
		(function(i){
			aImg[i].onload=function(){
				imgN++;
			}
		})(i);
		
	}
	setTimeout(function(){
		oLoading.style.width=340+'px';
	},0);
	
	oLoading.addEventListener('transitionend',function(){
		move(oLoad,{
			'opacity':0
		},{
			'duration':300,
			'type':'linear',
			'complete': function(){
				oLoad.style.display='none';
				oContent.style.display='block';
				setTimeout(function(){
					conOk=true;
				},600);
				move(oContent,{
					'opacity':1
				},{
					'duration':300,
					'type':'linear'	
				})
			}
		});
	},false);
//滚轮----------------------------------------------------------------------
//判断滚动距离正负 和幅度 	count++;
	var winH=document.documentElement.clientHeight;
	window.onresize=function(){
		winH=document.documentElement.clientHeight;
	};
	var skillUl=document.querySelector('.skill ul');
	var home_d1=document.querySelector('.home .dong1');
	var home_d2=document.querySelector('.home .dong2');
	var home_d3=document.querySelector('.home .dong3');
	
	var aD=document.querySelectorAll('.dong1,.dong2,.dong3');
	home_d1.style.animation='run 0.5s forwards linear';
	home_d2.style.animation='run2 0.5s forwards linear';
	home_d3.style.animation='run 0.5s forwards linear';
	
	var aEul=document.querySelector('.effect .box');
	
	var contentImg=document.querySelector('.content .contentI');
 	var conH=0;
	var conOk=false;
	addWheel(oContent,function(bDown){
		if(conOk){
			conOk=false;
			if(bDown){
				conH++;
				if(conH>=4){
					conH=4;	
				}
				if(conH==1){
					sanD();
				}else{
					for(var i=0;i<effect_Li.length;i++){
						effect_Li[i].style.transition='1s all ease';
						effect_Li[i].style.transform='rotateY(0) translateZ(0)';
					}
				}
				setTimeout(function(){
					conOk=true;		
				},1000);
			}else{
				conH--;
				if(conH<=0){
					conH=0;	
				}
				if(conH==1){
					sanD();
				}else{
					for(var i=0;i<effect_Li.length;i++){
						effect_Li[i].style.transition='1s all ease';
						effect_Li[i].style.transform='rotateY(0) translateZ(0)';
					}
				}
				setTimeout(function(){
					conOk=true;		
				},1000);
			}
		};
		
		oMain_page.style.transform ='transLateY('+-conH*winH+'px)';
		origin=oClouds.style.left=aNav_btn[conH].offsetLeft;
		Elastic(oClouds,origin);
		switch(conH){
			case 0:
				contentImg.src='img/content3.jpg';
				break;
			case 1:
				contentImg.src='img/content3.jpg';
				break;
			case 2:
				contentImg.src='img/content1.jpg';
				break;
			case 3:
				contentImg.src='img/content1.jpg';
				break;
			default:
				contentImg.src='img/content2.jpg';
				break;
		}
		
	})
	function dong(classD){
		for(var i=0;i<aD.length;i++){
			aD[i].style.animation='run3 0.1s forwards linear';
		}
		document.querySelector(classD+' .dong1').style.animation='run 0.5s forwards linear';
		document.querySelector(classD+' .dong2').style.animation='run2 0.5s forwards linear';
		document.querySelector(classD+' .dong3').style.animation='run 0.5s forwards linear';
	}
	oMain_page.addEventListener('transitionend',function(){
		switch(conH){
			case 0:
				for(var i=0;i<aD.length;i++){
					aD[i].style.animation='run3 0.5s forwards linear';
				}
				home_d1.style.animation='run 0.5s forwards linear';
				home_d2.style.animation='run2 0.5s forwards linear';
				home_d3.style.animation='run 0.5s forwards linear';
				break;
			case 1:
			
				skillUl.style.transform='translateY('+(-(winH/2+200))+'px)';
				dong('.effect');		
				break;
			case 2:
				dong('.skill');
				skillUl.style.transform='translateY('+(winH/2+200)+'px)';
				break;
			case 3:
				dong('.static');
				skillUl.style.transform='translateY('+(winH+400)+'px)';
				break;
			default:
				dong('.contact');
				break;
		}
	},false);
	
//导航栏--------------------------------------------------------------------
	var bOk=true;
	var origin=0;
	for(var i=0; i<aNav_btn.length; i++){
		aNav_btn[i].index=i;
		aNav_btn[i].onmouseover=function(){
			Elastic(oClouds,this.offsetLeft);
			bOk=true;
		}
		
		aNav_btn[i].onclick=function(){
			origin=oClouds.style.left=this.offsetLeft;
			bOk=false;
			conH=this.index;
			oMain_page.style.transform ='transLateY('+-conH*winH+'px)';
		}
		
		aNav_btn[i].onmouseout=function(){
			if(bOk){
				Elastic(oClouds,origin);	
			}
		}
	}
//技能----------------------------------------
	(function(){
		var arr=['l','on','r','r2','','l2'];	
		var oR=document.querySelector('.skill .pre');
		var oL=document.querySelector('.skill .next');
		var aLi=document.querySelectorAll('.skill li');
		var bOk=true;
		
		oR.onclick=function(){
			if(!bOk) return;
			bOk=false;
			arr.unshift(arr.pop());
			
			for(var i=0;i<arr.length;i++){
				aLi[i].className=arr[i];
			}	
			setTimeout(function(){
				bOk=true;	
			},500);
			var oN=document.querySelector('.skill .on');
			oN.addEventListener('transitionend',function(ev){bReady=true;},false);
		}
		oL.onclick=function(){
			if(!bOk) return;
			bOk=false;
			arr.push(arr.shift());
			for(var i=0;i<arr.length;i++){
				aLi[i].className=arr[i];
			}	
			setTimeout(function(){
				bOk=true;	
			},500);
			var oN=document.querySelector('.skill .on');
			oN.addEventListener('transitionend',function(ev){bReady=true;},false);
		}
		
	})();

//效果----------------------------------------------
	var oBox=document.querySelector('.effect .box');
	var effect_Li=oBox.children;

	function sanD(){
		var n=11;
		var d=360/n;
		for(var i=0;i<n;i++){
			effect_Li[i].style.transition='0.5s all ease '+(n-i)*160+'ms';
			effect_Li[i].style.transform='rotateY('+i*d+'deg) translateZ(400px)';
		}
	
		var Y=0;
	
		var speedY=0;
	
		var lastY=0;
		var timer=null;
		
		oBox.onmousedown=function(ev){
	
			var disY=ev.clientX-Y;
			document.onmousemove=function(ev){
				Y=ev.clientX-disY;
	
				change(Y/8);
		
				speedY=ev.clientX-lastY;
	
				lastY=ev.clientX;
			}
			document.onmouseup=function(ev){
				document.onmousemove=null;
				document.onmouseup=null;
				clearInterval(timer);
				timer=setInterval(function(){
					speedY*=0.9;
	
					Y+=speedY;
	
					change(Y/8);
				},30);
			}
			return false;
		}
		
		function change(Y){
			oBox.style.transform='perspective(1600px)';
			for(var i=0;i<effect_Li.length;i++){
				effect_Li[i].style.transition='none';
				effect_Li[i].style.transform='rotateY('+(i*d+Y)+'deg) translateZ(400px)';
				var opV=Math.abs(Math.abs(i*d+Y)%360-180)/180;
				if(opV<=0.5){
					opV=0.5;	
				}
				effect_Li[i].style.opacity=opV;
				
			}
		}	
	}
	
})