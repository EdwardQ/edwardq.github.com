'use strict'
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
function d2a(n){
	return n*Math.PI/180;	
}
function a2d(n){
	return n*180/Math.PI;	
}
function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);	
}
function toSix(n){
	var str='0'+n;
	while(str.length<6){
		str='0'+str;	
	}
	return str;	
}

