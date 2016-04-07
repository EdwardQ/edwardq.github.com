'use strict'
function rnd(m,n){
	return parseInt(Math.random()*(n-m)+m);	
}
function setPos(obj){
	obj.div.style.left=obj.c*17+'px';
	obj.div.style.top=obj.r*17+'px';
	if(obj.type=='snake'){
		obj.div.className=obj.dir;	
	}
}
function createSnake(){
	var oNewDiv=document.createElement('div');
	oNewDiv.style.background='url(images/snake1.png) no-repeat';
	return oNewDiv;	
}
function getPos(obj){
	var l=0;
	var t=0;
	while(obj.offsetParent){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;	
	}
	return {left:l,top:t};	
}
function toScore(n){
	n+='';
	while(5-n.length){
		n='0'+n;	
	}
	return n;
}
window.onload=function(){
	var oBox=document.getElementById('box');
	var oPlay=document.getElementById('play');
	var oScore=document.getElementById('score');
	var oL=document.getElementById('level');
	var oLBox=document.getElementById('level_box');
	var oLBar=document.getElementById('level_bar');
	var oEBox=document.getElementById('e_level_box');
	var oEBar=document.getElementById('e_level_bar');
	var iScore=0;
	var oENum=1;
	var oLevel=0;
	var R=30;
	var C=35;
	var timer=null;
	var dir='r';
	var lastDir='r';
	var Restart=false;
	var aSnake=[];
	var aEat=[];
	var bOk=false;
	var oClose=document.getElementById('close');
	var oIntro=document.getElementById('introdution');
	oClose.onclick=function(){
		oIntro.style.display='none';	
	};
	function Game(fn){
		//init创建snake	
		aSnake=[];		//{c:c,r:r,div:oNew，dir:r}
		for(var i=0;i<3;i++){
			if(i==0){
				var oNew=createSnake();
				oNew.style.background='url(images/snake0.png) no-repeat';	
			}else{
				var oNew=createSnake();	
			}
			oBox.appendChild(oNew);
			aSnake[i]={c:8-i,r:3,div:oNew,dir:'r',type:'snake'};
			setPos(aSnake[i]);	
		}
		//创建吃的
		aEat=[];
		createEat();
	}
	Game();
	function createEat(){
		while(aEat.length<oENum){
			var c=rnd(0,35);
			var r=rnd(0,30);
			var bOk=true;
			for(var i=0;i<aSnake.length;i++){
				if(c==aSnake[i].c&&r==aSnake[i].r){
					bOk=false;	
				}	
			}
			for(var i=0;i<aEat.length;i++){
				if(c==aEat[i].c&&r==aEat[i].r){
					bOk=false;	
				}	
			}
			if(bOk){
				var oNew=document.createElement('div');
				oNew.className='eat';
				oBox.appendChild(oNew);
				aEat.push({c:c,r:r,div:oNew});	
			}
		}
		for(var i=0;i<aEat.length;i++){
			setPos(aEat[i]);
		}
	}
	function Run(){
			clearInterval(timer);
			timer=setInterval(function(){
				//eat
				for(var i=0;i<aEat.length;i++){
					if(aSnake[0].c==aEat[i].c&&aSnake[0].r==aEat[i].r){
						aEat[i].div.style.background='url(images/snake1.png) no-repeat';
						aEat[i].type='snake';
						aSnake.push(aEat[i]);
						aEat.splice(i,1);
						iScore+=5;
						oScore.innerHTML=toScore(iScore);
					}	
				}
				if(aEat.length==0){
					createEat();	
				}
				//蛇移动，后面跟着前面
				for(var i=aSnake.length-1;i>0;i--){
					aSnake[i].r=aSnake[i-1].r;
					aSnake[i].c=aSnake[i-1].c;
					aSnake[i].dir=aSnake[i-1].dir;
				}	
				(lastDir=='l'&&dir=='r')&&(dir='l');
				(lastDir=='r'&&dir=='l')&&(dir='r');
				(lastDir=='t'&&dir=='b')&&(dir='t');
				(lastDir=='b'&&dir=='t')&&(dir='b');
					
				switch(dir){
					case 'r':
						aSnake[0].c++;
						aSnake[0].dir='r';
						break;
					case 'l':
						aSnake[0].c--;
						aSnake[0].dir='l';
						break;
					case 't':
						aSnake[0].r--;
						aSnake[0].dir='t';
						break;
					case 'b':
						aSnake[0].r++;
						aSnake[0].dir='b';
						break;			
							
				}
				lastDir=dir;
				//撞墙
				if(aSnake[0].c<0||aSnake[0].c>34||aSnake[0].r<0||aSnake[0].r>29){
					clearInterval(timer);
					alert('~。~别撞墙哦');
					oPlay.innerHTML='START';
					Restart=true;
					bOk=false;
					return;
				}
				//撞自己
				for(var i=2;i<aSnake.length;i++){
					if(aSnake[0].c==aSnake[i].c&&aSnake[0].r==aSnake[i].r){
						clearInterval(timer);
						alert('￣3￣ 吃自己了!');
						oPlay.innerHTML='START';
						Restart=true;
						bOk=false;
						return;	
					}	
				}
				for(var i=0;i<aSnake.length;i++){
					setPos(aSnake[i]);	
				}
			},(7-oLevel)*20+40);
		}
	//键盘控制方向,键码为数字！！！
	document.onkeydown=function(ev){
		var oEvent=ev||event;
		switch(oEvent.keyCode){
			case 37:dir='l';break;
			case 38:dir='t';break;
			case 39:dir='r';break;
			case 40:dir='b';break;
			case 65:dir='l';break;
			case 87:dir='t';break;
			case 68:dir='r';break;
			case 83:dir='b';break;	
			case 32:
				oPlay.style.cssText='box-shadow:0 0px 0px #4de9e6,inset 0 0 15px #4de9e6; margin-top:5px;text-shadow:0 0 8px #4de9e6;';	
				break;		
		}
	};
	document.onkeyup=function(ev){
		var oEvent=ev||event;
		if(oEvent.keyCode==32){
			play();
			oPlay.style.cssText=''
				
		}	
	};	
	
	oPlay.onclick=play;
	
	function play(){
		if(bOk){
			clearInterval(timer);
			oPlay.innerHTML='START';
		}else{
			if(Restart){
				oBox.innerHTML='';
				oScore.innerHTML='00000';
				dir='r';
				lastDir='';
				iScore=0;
				Restart=false;
				Game();
				Run();
			}else{
				Run();
			}
			oPlay.innerHTML='PAUSE';	
		}
		bOk=!bOk;
	};
	
	oLBox.onclick=function(ev){
		var oEvent=ev||evnet;
		oLBar.style.left=oEvent.clientX-getPos(oLBox).left-oLBar.offsetWidth/2+'px';	
	};
	oLBar.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-oLBar.offsetLeft;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var l=oEvent.clientX-disX;
			if(l<0){
				l=0;	
			}
			if(l>oLBox.offsetWidth-oLBar.offsetWidth){
				l=oLBox.offsetWidth-oLBar.offsetWidth;	
			}
			oLBar.style.left=l+'px';	
		};	
		document.onmouseup=function(){
			oLevel=Math.ceil(oLBar.offsetLeft/25);
			document.onmousemove=null;
			document.onmouseup=null;
			oLBar.releaseCapture&&oLBar.releaseCapture();
		};
		oLBar.setCapture&&oLBar.setCapture();
		return false;
	};
	
	oEBox.onclick=function(ev){
		var oEvent=ev||event;
		oEBar.style.left=oEvent.clientX-getPos(oEBox).left-oEBar.offsetWidth/2+'px';	
	};
	oEBar.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-oEBar.offsetLeft;
		document.onmousemove=function(ev){
			var oEvent=ev||event;
			var l=oEvent.clientX-disX;
			if(l<0){
				l=0;	
			}
			if(l>oEBox.offsetWidth-oEBar.offsetWidth){
				l=oEBox.offsetWidth-oEBar.offsetWidth;	
			}
			oEBar.style.left=l+'px';	
		};	
		document.onmouseup=function(){
			oENum=Math.ceil(oEBar.offsetLeft/25)+1;
			document.onmousemove=null;
			document.onmouseup=null;
			oEBar.releaseCapture&&oEBar.releaseCapture();
		};
		oEBar.setCapture&&oEBar.setCapture();
		return false;
	};
};