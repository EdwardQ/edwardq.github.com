'use strict'
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',fn,false);	
	}else{
		document.addEventListener('onreadyStatechange',function(){
			if(document.readyState=='complete'){
				fn();	
			}	
		},false);	
	}	
}
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);	
	}else{
		obj.attachEvent('on'+sEv,fn);	
	}	
}
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);	
	}else{
		obj.detachEvent('on'+sEv,fn);	
	}	
}
function d2a(n){
	return n*Math.PI/180;	
}
function a2d(n){
	return n*180/Math.PI;	
}
function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);	
}
function loadImages(json,fn){
	var total=0;
	var loaded=0;
	var result={};
	for(var name in json){
		total++;
		var oImg=new Image();
		oImg.src=json[name];
		result[name]=oImg;
		oImg.onload=function(){
			loaded++;
			if(loaded==total){
				fn(result);	
			}	
		};	
	}
}
function toSix(n){
	var str='0'+n;
	while(str.length<6){
		str='0'+str;	
	}
	return str;	
}
function fnWheel(obj,fn){
	if(navigator.userAgent.indexOf('Firefox')!=-1){
		addEvent(obj,'DOMMouseScroll',fnDir);		
	}else{
		addEvent(obj,'mousewheel',fnDir);
	}	
	function fnDir(ev){
		var oEvent=ev||event;
		var Down=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
		fn&&fn(Down);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;	
	}
}
function getByClass(obj,sClass){
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(sClass);	
	}else{
		var aEle=obj.getElementsByTagName('*');
		var resutl=[];
		var re=new RegExp('\\b'+sClass+'\\b');
		for(var i=0;i<aEle.length;i++){
			if(aEle[i].search(re)!=-1){
				result.push(aEle[i]);	
			}	
		}
		return result;	
	}	
}
function TransitionEnd(obj,fn){
	var called=false;
	function callBack(){
		if(!called){
			fn();
			called=true;	
		}	
	}
	addEvent(obj,'transitionend',function(){
		callBack();
		setTimeout(callBack,1000);	
	});	
}



