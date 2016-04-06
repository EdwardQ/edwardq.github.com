'use strict'
function Sprite(img){
	this.img=img;
	this.w=0;
	this.h=0;
	this.sx=0;
	this.sy=0;
	this.sw=0;
	this.sh=0;
	this.x=0;
	this.y=0;
	this.speed=0;
	this.rotate=0;	
}
Sprite.prototype.move=function(){
	var speedX=Math.sin(d2a(this.rotate))*this.speed;
	var speedY=Math.cos(d2a(this.rotate))*this.speed;
	this.x+=speedX;
	this.y-=speedY;	
};
Sprite.prototype.draw=function(gd){
	this.sw=this.sw||this.w;
	this.sh=this.sh||this.h;
	gd.save();
	gd.translate(this.x,this.y);
	gd.rotate(d2a(this.rotate));
	gd.drawImage(
		this.img,
		this.sx,this.sy,this.sw,this.sh,
		-this.w/2,-this.h/2,this.w,this.h
	);	
	gd.restore();
};
function Cannon(imgs,type){
	Sprite.call(this,imgs['cannon'+type]);
	this._size=[
		null,
		{w:74,h:74},
		{w:74,h:76},
		{w:74,h:76},
		{w:74,h:83},
		{w:74,h:85},
		{w:74,h:90},
		{w:74,h:94}
	];
	this.w=this._size[type].w;
	this.h=this._size[type].h;
	this.type=type;	
}
Cannon.prototype=new Sprite();
Cannon.prototype.constructor=Cannon;
function Bullet(imgs,type){
	Sprite.call(this,imgs.bullet);
	this._size=[
		null,
		{w:24,h:26,x:86,y:0,r:2},
		{w:25,h:29,x:61,y:0,r:3},
		{w:27,h:31,x:32,y:35,r:6},
		{w:29,h:33,x:30,y:82,r:8},
		{w:31,h:35,x:31,y:0,r:10},
		{w:33,h:37,x:0,y:44,r:15},
		{w:30,h:44,x:0,y:0,r:20}
	];	
	this.w=this._size[type].w;
	this.h=this._size[type].h;
	this.sx=this._size[type].x;
	this.sy=this._size[type].y;
	this.speed=6;
	this.hurt=this._size[type].r;
	this.range=30;
}
Bullet.prototype=new Sprite();
Bullet.prototype.construstor=Bullet;
Bullet.prototype.collTest=function(obj2){
	var a=this.x-obj2.x;
	var b=this.y-obj2.y;
	var c=Math.sqrt(a*a+b*b);
	if(c<30){
		return true;	
	}	
};
function Fish(imgs,type){
	if(type<=5){
		Sprite.call(this,imgs['fish'+type]);
		this.speed=3;
	}else{
		Sprite.call(this,imgs['shark'+type%5]);	
		this.rotate=90;
		this.speed=2;
		this.range=200;
	}
	this._size=[
		null,
		{w:37,h:55,b:1,s:1},
		{w:64,h:78,b:5,s:5},
		{w:56,h:72,b:20,s:10},
		{w:59,h:77,b:50,s:20},
		{w:122,h:107,b:100,s:50},
		{w:270,h:509,b:500,s:80},
		{w:273,h:516,b:800,s:100}
	];
	this.w=this._size[type].w;
	this.h=this._size[type].h;
	this.blood=this._size[type].b;
	this.type=type;
	this.dieW=4*(Math.ceil(type/5))*this.w-this.w;
	this.score=this._size[type].s;
}
Fish.prototype=new Sprite();
Fish.prototype.constructor=Fish;
Fish.prototype.swimming=function(){
	this.sx+=this.w;
	if(this.sx>=4*(Math.ceil(this.type/5))*this.w){
		this.sx=0;	
	}	
};
Fish.prototype.die=function(){
	this.dieW+=this.w;
	this.sx=this.dieW;
	if(this.sx>=this.w*(Math.ceil(this.type/5)+1)*4){
		return true;	
	}
};
Fish.prototype.collTest=function(obj2){
	var x2=obj2.x;
	var y2=obj2.y;
	if(x2<this.x+250&&x2>this.x-180&&y2<this.y+50&&y2>this.y-50){
		return true;	
	}	
};
function Web(imgs,type){
	Sprite.call(this,imgs.web);	
	this._size=[
		null,
		{w:89,h:86,x:332,y:373},
		{w:108,h:108,x:14,y:414},
		{w:127,h:127,x:178,y:369},
		{w:148,h:148,x:254,y:196},
		{w:163,h:156,x:0,y:244},
		{w:182,h:182,x:241,y:0},
		{w:200,h:200,x:21,y:22},
	];
	this.w=this._size[type].w;
	this.h=this._size[type].h;
	this.sx=this._size[type].x;
	this.sy=this._size[type].y;
	this.oW=this.w-10;
}
Web.prototype=new Sprite();
Web.prototype.constructor=Web;
Web.prototype.shake=function(){
	this.w-=5;
	this.h-=5;
	if(this.w<this.oW){
		this.w+=20;	
		this.h+=20;
	}	
};
function Coin(imgs,type){
	Sprite.call(this,imgs['coin'+(type<3?1:2)]);
	this.w=60;
	this.h=60;
	this.speed=12;	
	this.back_dir=0;
}
Coin.prototype=new Sprite();
Coin.prototype.construstor=Coin;
Coin.prototype.turn=function(){
	this.sy+=this.w;
	if(this.sy>=this.w*10){
		this.sy=0;	
	}	
};
Coin.prototype.move=function(){
	var speedX=Math.sin(d2a(this.back_dir))*this.speed;
	var speedY=Math.cos(d2a(this.back_dir))*this.speed;	
	this.x+=speedX;
	this.y+=speedY;	
};
function Score(imgs,type){
	Sprite.call(this,imgs.number_black);
	this.w=18;
	this.h=22;
	this.sw=20;
	this.sh=24;
	this.sx=0;
	this.sy=this.sh*9;
	
	this.num=0;
	this._dis=[
		364,342,318,296,272,249
	];
}
Score.prototype=new Sprite();
Score.prototype.constructor=Score;
Score.prototype.slide=function(num){
	if(num>this.num){
		if(this.num==0&&num==9){
			this.sy=0;
			this.num=num;	
		}else{
			this.sy-=4;
			if(this.sy<=(9-num)*this.sh){
				this.sy=(9-num)*this.sh;
				this.num=num;	
			}
		}
	}else{
		if(this.num==9&&num==0){
			this.sy=9*this.sh;
			this.num=num;	
		}else{
			this.sy+=4;
			if(this.sy>=(9-num)*this.sh){
				this.sy=(9-num)*this.sh;
				this.num=num;	
			}
		};
	}	
};
function CoinText(imgs,type){
	Sprite.call(this,imgs.coinText);
	this.w=36;
	this.h=49;
	this.sx=type*this.w;
	this.hidey=0;
}
CoinText.prototype=new Sprite();
CoinText.prototype.construstor=CoinText;
CoinText.prototype.hide=function(){
	this.hidey+=1;
	this.y-=1;
	if(this.hidey>=60){
		return true;	
	}	
};
function Btn(imgs,type){
	Sprite.call(this,imgs.bottom);
	this._size=[
		{x:137,y:75},
		{x:47,y:75},
	];
	this.w=36;
	this.h=28;
	this.sx=this._size[type].x;
	this.sy=this._size[type].y;	
}
Btn.prototype=new Sprite();
Btn.prototype.constructor=Btn;

