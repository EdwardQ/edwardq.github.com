'use strict'
//解决transitionend执行多次
function TransitionEnd(obj,fn,duration){
	var called=false;
	function callBack(){
		if(!called){
			fn();
			called=true;	
		}	
	}
	obj.addEventListener('transitionend',function(){
		callBack();
		//通过setTimeout来补救windowphone中不触发事件的问题
		setTimeout(callBack,duration);	
	},false);	
}
function startMove(obj,fn){
	var rotate=-90;
	var dis=0;
	var speed=10;
	obj.timer=setInterval(function(){
		speed+=(dis-rotate)/8;
		speed*=0.8;
		rotate+=speed;
		obj.style.transform='perspective(1000px) rotateX('+rotate+'deg)';
		if(Math.round(speed)==0&&Math.round(rotate)==0){
			clearInterval(obj.timer);
			fn&&fn();	
		}
	},30);
		
}
window.onload=function(){
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var oUl=document.getElementById('ul1');
	var aP=document.getElementsByTagName('p');
	var aLi=oUl.children;
	var bOk=false;
	var arr=['l0','l1','l2','l3','l4','l5'];
	for(var i=3;i<aP.length-3;i++){
		(function(i){	
			setTimeout(function(){
				aP[i].style.opacity=1;
				startMove(aP[i]);	
			},i*150);
		})(i);
	}
	oPrev.onclick=function(){
		if(bOk)return;
		bOk=true;
		arr.push(arr.shift());
		var cur=0;
		var l5=0;
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.transition='1s all ease';
			if(arr[i]=='l0'){
				aLi[i].style.transition='none';
				var aP=aLi[i].children;
				for(var j=0;j<aP.length;j++){
					aP[j].style.transform='perspective(1000px) rotateX(-90deg)';
					aP[j].style.opacity='0';	
				}		
			}
			if(arr[i]=='l1'){
				cur=i;	
			}
			if(arr[i]=='l5'){
				l5=i;
			}
			aLi[i].className=arr[i];
		}
		TransitionEnd(aLi[l5],function(){
			aLi[l5].style.transition='none';
			var aP=aLi[l5].children;
			for(var j=0;j<aP.length;j++){
				aP[j].style.transform='perspective(1000px) rotateX(-90deg)';
				aP[j].style.opacity='0';	
			}			
		},1000);
		TransitionEnd(aLi[cur],function(){
			var aP=aLi[cur].children;
			for(var i=0;i<aP.length;i++){
				(function(i){
					setTimeout(function(){
						aP[i].style.opacity=1;
						startMove(aP[i],function(){
							bOk=false;	
						});	
					},i*100);	
				})(i);	
			}	
		},1000);
	};
	oNext.onclick=function(){
		if(bOk)return;
		bOk=true;
		arr.unshift(arr.pop());
		var cur=0;
		var l0=0;
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.transition='1s all ease';
			if(arr[i]=='l5'){
				aLi[i].style.transition='none';
				var aP=aLi[i].children;
				for(var j=0;j<aP.length;j++){
					aP[j].style.transform='perspective(1000px) rotateX(-90deg)';
					aP[j].style.opacity='0';	
				}	
			}
			if(arr[i]=='l4'){
				cur=i;
			}
			if(arr[i]=='l0'){
				l0=i;	
			}
			aLi[i].className=arr[i];
			
		}
		TransitionEnd(aLi[l0],function(){
			aLi[l0].style.transition='none';
			var aP=aLi[l0].children;
			for(var j=0;j<aP.length;j++){
				aP[j].style.transform='perspective(1000px) rotateX(-90deg)';
				aP[j].style.opacity='0';	
			}			
		},1000);
		TransitionEnd(aLi[cur],function(){
			var aP=aLi[cur].children;
			for(var i=0;i<aP.length;i++){
				(function(i){
					setTimeout(function(){
						aP[i].style.opacity=1;
						startMove(aP[i],function(){
							bOk=false;	
						});	
					},i*100);	
				})(i);	
			}
		},1000);
	};
};