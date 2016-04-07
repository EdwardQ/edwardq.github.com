'use strict'
function rnd(m,n){
	return Math.floor(Math.random()*(n-m)+m);	
}
function toFive(n){
	var num=''+n;
	while(num.length<5){
		num='0'+num;	
	}
	return num;	
}
function Sprite(img){
	this.img=img;
	this.w=0;
	this.h=0;
	this.sx=0;
	this.sy=0;
	this.x=0;
	this.y=0;
	this.speed=0;	
}
Sprite.prototype.move=function(){
	this.x-=this.speed;	
};
Sprite.prototype.draw=function(gd){
	gd.drawImage(
		this.img,
		this.sx,this.sy,this.w,this.h,
		this.x,this.y,this.w,this.h
	);	
};
Sprite.prototype.collTest=function(obj2){
	var l1=this.x;
	var t1=this.y;
	var r1=this.x+this.w;
	var b1=this.y+this.h;
	var l2=obj2.x;
	var t2=obj2.y;
	var r2=obj2.x+obj2.w;
	var b2=obj2.y+obj2.h-10;
	if(!(l1>r2-12||r1<l2+12||b1<t2+16||t1>b2)){
		return true;	
	}
};

function Dino(img,type){
	Sprite.call(this,img);
	this._size=[
		null,
		{w:44,h:43,sy:4,sx:765,y:95},
		{w:59,h:30,sy:19,sx:941,y:112}
	];
	this.w=this._size[type].w;
	this.h=this._size[type].h;
	this.sy=this._size[type].sy;
	this.y=this._size[type].y;
	this.x=25;
	this.sx=this._size[type].sx;
	this.count=0;	
	this.dir=1;
	this.type=type;
}
Dino.prototype=new Sprite();
Dino.prototype.constructor=Dino;
Dino.prototype.jump=function(){
	if(this.y>=95)return;
	this.sx=677;
	this.y+=this.dir*(5-this.y)/3;
	if(Math.floor(this.y)==5){
		this.dir=-1;
	}
	if(this.y>=95){
		this.y=95;
		this.sx=765;
		this.dir=1;
	}
};
Dino.prototype.running=function(){
	if(this.y<95)return;
	if(this.x<=25){
		this.x+=4;
	}
	this.count++;
	if(this.type==1){
		this.sx=this.count&2?765:809;	
	}else if(this.type==2){
		this.sx=this.count&2?941:1000;		
	}
};

function Line(img){
	Sprite.call(this,img);
	this.y=127;
	this.w=600;
	this.h=12;
	this.sx=2;
	this.sy=54;	
	this.speed=6;
}
Line.prototype=new Sprite();
Line.prototype.constructor=Line;


function Enemy(img,type){
	Sprite.call(this,img);
	var n=rnd(2,4);
	this._kind=[
		null,
		{w:17,h:35,sx:228+rnd(0,6)*17,sy:2,y:106},
		{w:25,h:50,sx:332+rnd(0,4)*25,sy:2,y:91},
		{w:17*n,h:35,sx:228+rnd(0,(4-n))*17*n,sy:2,y:106},
		{w:25*n,h:50,sx:332+rnd(0,(4-n))*25*n,sy:2,y:91},
		{w:75,h:50,sx:407,sy:2,y:91},
		{w:42,h:36,sx:136,sy:6,y:102},
		{w:42,h:36,sx:136,sy:6,y:77},
		{w:42,h:36,sx:136,sy:6,y:52}
	];
	this.count=0;
	this.type=type;
	this.speed=6;
	this.x=600;
	this.w=this._kind[type].w;
	this.h=this._kind[type].h;
	this.sx=this._kind[type].sx;
	this.sy=this._kind[type].sy;
	this.y=this._kind[type].y;

}
Enemy.prototype=new Sprite();
Enemy.prototype.constructor=Enemy;
Enemy.prototype.flying=function(){
	if(this.type<6)return;
	this.count++;
	this.sx=this.count%2?136:182;
};

function Score(img){
	Sprite.call(this,img);
	this.w=10;
	this.h=13;
	this.y=10;
	this._size=[
		484,494,504,514,524,534,544,554,564,574,584,594
	];
	this._dis=[
		534,545,556,567,578,434,445
	];	
}
Score.prototype=new Sprite();
Score.prototype.constructor=Score;

function Clouds(img){
	Sprite.call(this,img);
	this.w=46;
	this.h=13;
	this.x=600;
	this.sx=86;
	this.sy=2;
	this.speed=1;	
}
Clouds.prototype=new Sprite();
Clouds.prototype.constructor=Clouds;


document.addEventListener('DOMContentLoaded',function(){
	var oC=document.querySelector('#c1');
	var gd=oC.getContext('2d');
	var oCon=document.querySelector('.contain');
	var oImg=new Image();
	var timer=null;
	var t1=null;
	var t2=null;
	var t3=null;
	var t4=null;
	var t5=null;
	var bStart=false;
	var bOk=false;
	var restart=false;
	var HI=0;
	var oClose=document.getElementById('close');
	var oIntro=document.getElementById('introdution');
	oClose.onclick=function(){
		oIntro.style.display='none';	
	};
	oImg.src='images/dinosaur.png';
	oImg.onload=function(){
		gd.drawImage(
			oImg,
			40,5,44,44,
			0,95,44,44
		);	
		var again=new Sprite(oImg);
		again.w=34;
		again.h=30;
		again.sx=3;
		again.sy=3;
		again.x=283;
		again.y=76;
		
		var gameover=new Sprite(oImg);
		gameover.w=191;
		gameover.h=11;
		gameover.sx=484;
		gameover.sy=15;
		gameover.x=205;
		gameover.y=42;
		
		var dino=new Dino(oImg,1);
		dino.x=0;
		
		var aLine=[];
		var line=new Line(oImg);
		aLine.push(line);
		
		var aClouds=[];
		for(var i=0;i<3;i++){
			var clouds=new Clouds(oImg);
			clouds.x=600+rnd(i*200+rnd(0,100),i*200+rnd(0,100));
			clouds.y=rnd(30,60);	
			aClouds.push(clouds);
		}
		
		var aHI=[];
		for(var i=0;i<2;i++){
			var hi=new Score(oImg);
			hi.x=hi._dis[i+5];
			hi.sx=hi._size[i+10];
			aHI.push(hi);
		};
		document.onkeydown=function(ev){
			//空格32，↑38↓40
			if(bStart){
				if(restart){
					if(ev.keyCode==32||ev.keyCode==38){
						goOn();	
						restart=false;
					}
				}else{
					switch(ev.keyCode){
						case 32:
							if(dino.y<95)return;
							dino.y-=5;
							break;
						case 38:
							if(dino.y<95)return;
							dino.y-=5;
							break;
						case 40:
							if(dino.type==2)return;
							dino=new Dino(oImg,2);
							break;		
					}
				};
			}else{
				if(ev.keyCode==32||ev.keyCode==38){
					dino.y-=5;
					goOn();
					oCon.style.animation='info .4s ease-out .5s both';
					oCon.addEventListener('animationEnd',function(){
						oCon.style.cssText='width:600px;';
						bOk=true;
					},false);
					
				}
				bStart=true;	
			}
		};
		document.onkeyup=function(ev){
			if(ev.keyCode==40){
				dino=new Dino(oImg,1);	
			}		
		};
		oC.onclick=function(){
			if(restart){
				restart=false;
				goOn();	
			};
		};
		function goOn(){
			var iScore=0;
			var aEnemy=[];
			var oldX=0;
			var a=1;
			var b=4;
			clearTimeout(t1);
			t1=setTimeout(function(){
				for(var i=0;i<3;i++){
					var enemy=new Enemy(oImg,rnd(1,4));
					enemy.x=600+rnd(0+i*300,150+i*300);
					aEnemy.push(enemy);	
				}
				clearTimeout(t2);
				t2=setTimeout(function(){
					b=9;
				},20000);
			},2000);
			
			var aScore=[];
			for(var i=0;i<5;i++){
				var score=new Score(oImg);
				score.x=score._dis[i];
				score.sx=484;
				aScore.push(score);
					
			}
			clearInterval(timer);
			timer=setInterval(function(){
				gd.clearRect(0,0,oC.width,oC.height);
				for(var i=0;i<aClouds.length;i++){
					aClouds[i].draw(gd);
					aClouds[i].move();
					if(aClouds[i].x<-100){
						aClouds.splice(i,1);
						i--;
						var clouds=new Clouds(oImg);
						clouds.x=600+rnd(100,200);
						clouds.y=rnd(30,60);	
						aClouds.push(clouds);
					}	
				}
				for(var i=0;i<aLine.length;i++){
					aLine[i].draw(gd);
					if(bOk){
						aLine[i].move();
					};
					if(aLine.length<2){
						if(aLine[0].x<0){
							var line=new Line(oImg);
							line.x=600;
							line.sx=rnd(0,2)*600+2;
							aLine.push(line);
						}
					}
					if(aLine[0].x<-600){
						aLine.shift();
						i--;	
					}
				}
				if(aHI.length>2){
					for(var i=0;i<aHI.length;i++){
						aHI[i].draw(gd);	
					}	
				}
				
				for(var i=0;i<aEnemy.length;i++){
					aEnemy[i].draw(gd);
					aEnemy[i].move();
					if(aEnemy[i].x<-rnd(100,300)){
						oldX=aEnemy[2].x;
						aEnemy.splice(i,1);
						i--;
						var enemy=new Enemy(oImg,rnd(a,b));
						enemy.x=oldX+200+rnd(100,200);
						aEnemy.push(enemy);	
					}	
				}
				
				for(var i=0;i<aScore.length;i++){
					aScore[i].draw(gd);
					aScore[i].sx=aScore[i]._size[toFive(iScore).charAt(i)];
				}
				
				dino.draw(gd);
				dino.jump();
				
				//碰撞检测
				for(var i=0;i<aEnemy.length;i++){
					if(dino.collTest(aEnemy[i])){
						clearInterval(timer);
						gameover.draw(gd);
						again.draw(gd);
						if(iScore>HI){
							HI=iScore;
							aHI.length=2;
							for(var j=0;j<aScore.length;j++){
								aScore[j].x-=67;
								aHI.push(aScore[j]);	
							}
							gd.clearRect(434,10,86,11);
							for(var k=0;k<aHI.length;k++){
								aHI[k].draw(gd);	
							}	
						}
						setTimeout(function(){
							restart=true;	
						},300);
					}	
				}
			},17);
			clearInterval(t3);
			t3=setInterval(function(){
				dino.running();	
			},60);	
			clearInterval(t4);
			t4=setInterval(function(){
				for(var i=0;i<aEnemy.length;i++){
					aEnemy[i].flying();	
				}	
			},150);
			clearInterval(t5);
			t5=setInterval(function(){
				iScore++;
			},100);
		}
	};
	
},false);