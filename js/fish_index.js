'use strict'
domReady(function(){
	var oC=document.querySelector('.c2');
	var oGFish=document.getElementById('game_fish');
	var gd=oC.getContext('2d');
	var oLoad=document.getElementById('loading');
	var oCont=document.getElementById('content');
	oC.width=oCont.offsetWidth;
	oC.height=document.documentElement.clientHeight;
	loadImages({
		'bottom':'images/bottom.png',
		'cannon1':'images/cannon1.png',
		'cannon2':'images/cannon2.png',
		'cannon3':'images/cannon3.png',
		'cannon4':'images/cannon4.png',
		'cannon5':'images/cannon5.png',
		'cannon6':'images/cannon6.png',
		'cannon7':'images/cannon7.png',
		'bullet':'images/bullet.png',
		'fish1':'images/fish1.png',
		'fish2':'images/fish2.png',
		'fish3':'images/fish3.png',
		'fish4':'images/fish4.png',
		'fish5':'images/fish5.png',
		'shark1':'images/shark1.png',
		'shark2':'images/shark2.png',	
		'web':'images/web.png',
		'coin1':'images/coin1.png',
		'coin2':'images/coin2.png',
		'number_black':'images/number_black.png',
		'coinText':'images/coinText.png',
	},function(result){
		window.addEventListener('resize',function(){
			oC.width=oCont.offsetWidth;
			oC.height=document.documentElement.clientHeight;
			bottom.x=oC.width/2-10;
			bottom.y=oC.height-36;
			cannon.x=oC.width/2+30;
			cannon.y=bottom.y;	
			minu.x=oC.width/2-10;
			minu.y=oC.height-14;
			add.x=oC.width/2+70;
			add.y=oC.height-14;
			for(var i=0;i<6;i++){
				aScore[i].x=oC.width/2-aScore[i]._dis[i];
				aScore[i].y=oC.height-15;
			};
		},false);
		var bottom=new Sprite(result.bottom);
		bottom.w=765;
		bottom.h=71;
		bottom.x=oC.width/2-10;
		bottom.y=oC.height-36;
		bottom.draw(gd);
		var iNow=3;
		var cannon=new Cannon(result,iNow)
		cannon.x=oC.width/2+30;
		cannon.y=bottom.y;
		var add=new Btn(result,1);
		var minu=new Btn(result,0);
		minu.x=oC.width/2-10;
		minu.y=oC.height-14;
		add.x=oC.width/2+70;
		add.y=oC.height-14;
		var sScore=localStorage.score||toSix(100);
		var aScore=[];
		for(var i=0;i<6;i++){
			var score=new Score(result,i);
			score.x=oC.width/2-score._dis[i];
			score.y=oC.height-15;
			aScore.push(score);	
		}
		var aBullet=[];
		var aWeb=[];
		var aCoin=[];
		var aCText=[];
		var aDFish=[];
		var aFish=[];
		setInterval(function(){
			if(oLoad.children.length!=0){
				return;	
			}
			bottom.x=oC.width/2-10;
			bottom.y=oC.height-36;
			aWeb.shift();
			for(var i=0;i<aDShark.length;i++){
				if(aDShark[i].die()){
					aDShark.splice(i,1);
					i--;	
				}	
			}	
			if(aFish.length>35)return;
			var fish=new Fish(result,rnd(1,6));
			if(rnd(0,2)){
				fish.rotate=rnd(30,130);
				fish.x=-50;	
			}else{
				fish.rotate=rnd(-130,-30);
				fish.x=oC.width+50;		
			}
			fish.y=rnd(0,oC.height);
			aFish.push(fish);
			
		},240);
		var aShark=[];
		var aDShark=[];
		setInterval(function(){
			if(aShark.length>1)return;
			var shark=new Fish(result,rnd(6,8));
			shark.x=-300;
			shark.y=oC.height/2;
			aShark.push(shark);	
		},20000);
		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			for(var i=0;i<aShark.length;i++){
				aShark[i].draw(gd);
				aShark[i].move();
				if(aShark[i].x>oC.width+500){
					aShark.splice(i,1);
					i--;	
				}	
			}
			for(var i=0;i<aDShark.length;i++){
				aDShark[i].draw(gd);	
			}
			
			for(var i=0;i<aFish.length;i++){
				aFish[i].draw(gd);
				aFish[i].move();	
				if(aFish[i].x<-50||aFish[i].x>oC.width+50||aFish[i].y<-50||aFish[i].y>oC.height+50){
					aFish.splice(i,1);
					i--;	
				}
			}
			for(var i=0;i<aDFish.length;i++){
				aDFish[i].draw(gd);
			}
			for(var i=0;i<aWeb.length;i++){
				aWeb[i].draw(gd);
				aWeb[i].shake();	
			}
			for(var i=0;i<aCoin.length;i++){
				aCoin[i].draw(gd);
				aCoin[i].turn();
				aCoin[i].move();
				if(aCoin[i].x<-50||aCoin[i].y>oC.height+50){
					aCoin.splice(i,1);
					i--;	
				}	
			}
			for(var i=0;i<aCText.length;i++){
				aCText[i].hide();
				if(aCText[i].hidey>13){
					aCText[i].draw(gd);	
					if(aCText[i].hide()){
						aCText.splice(i,1);
						i--;	
					}	
				}
			}
			bottom.draw(gd);
			for(var i=0;i<aBullet.length;i++){
				aBullet[i].draw(gd);
				aBullet[i].move();	
				if(aBullet[i].x<-50||aBullet[i].x>oC.width+50||aBullet[i].y<-50){
					aBullet.splice(i,1);
					i--;	
				}
			}
			add.draw(gd);
			minu.draw(gd);
			if(cannon){
				cannon.draw(gd);
			}
			for(var i=0;i<aScore.length;i++){
				aScore[i].draw(gd);
				aScore[i].slide(sScore.charAt(i));
			}
			for(var i=0;i<aBullet.length;i++){
				for(var j=0;j<aFish.length;j++){
					if(aBullet[i]&&aFish[j]){
						if(aBullet[i].collTest(aFish[j])){
							var web=new Web(result,cannon.type);
							web.x=aBullet[i].x;
							web.y=aBullet[i].y;
							aWeb.push(web);
							aFish[j].blood-=aBullet[i].hurt;
							aBullet.splice(i,1);
							i--;
							if(aFish[j].blood<0){
								var s=aFish[j].score;
								sScore=toSix(parseInt(sScore)+s);
								localStorage.score=sScore;
								var coin=new Coin(result,aFish[j].type);
								coin.x=aFish[j].x;
								coin.y=aFish[j].y;
								var a=coin.x-(bottom.x-250);
								var b=oC.height-coin.y;
								coin.back_dir=a2d(Math.atan2(b,a))-90;
								aCoin.push(coin);
								
								var coinText=new CoinText(result,10);
								coinText.x=aFish[j].x-36;
								coinText.y=aFish[j].y;
								aCText.push(coinText);
								for(var x=0;x<(''+s).length;x++){
									var coinText=new CoinText(result,parseInt((''+s).charAt(x)));
									coinText.x=aFish[j].x+x*36;
									coinText.y=aFish[j].y;
									aCText.push(coinText);	
								}
								aDFish.push(aFish[j]);
								aFish.splice(j,1);
								j--;
							}	
						}
					}	
				}
				for(var k=0;k<aShark.length;k++){
					if(aBullet[i]&&aShark[k]){
						if(aShark[k].collTest(aBullet[i])){
							var web=new Web(result,cannon.type);
							web.x=aBullet[i].x;
							web.y=aBullet[i].y;
							aWeb.push(web);
							aShark[k].blood-=aBullet[i].hurt;
							aBullet.splice(i,1);
							i--;
							if(aShark[k].blood<=0){
								var s=aShark[k].score;
								sScore=toSix(parseInt(sScore)+s);
								localStorage.score=sScore;
								for(var l=0;l<40;l++){
									var coin=new Coin(result,aShark[k].type);
									coin.x=aShark[k].x+(l-20)*10;
									coin.y=aShark[k].y+l%2*25;
									var a=coin.x-(bottom.x-250);
									var b=oC.height-coin.y;
									coin.back_dir=a2d(Math.atan2(b,a))-90;
									coin.speed=5;
									aCoin.push(coin);	
								}
								var coinText=new CoinText(result,10);
								coinText.x=aShark[k].x-36;
								coinText.y=aShark[k].y;
								aCText.push(coinText);
								for(var x=0;x<(''+s).length;x++){
									var coinText=new CoinText(result,parseInt((''+s).charAt(x)));
									coinText.x=aShark[k].x+x*36;
									coinText.y=aShark[k].y;
									aCText.push(coinText);	
								}
								aDShark.push(aShark[k]);
								aShark.splice(k,1);
								k--;
							}
						}	
					}	
				}	
			}
			while(aWeb.length>8){
				aWeb.splice(aWeb.length-1,1);	
			}
		},30);
		setInterval(function(){
			for(var i=0;i<aFish.length;i++){
				aFish[i].swimming();	
			}	
			
			for(var i=0;i<aShark.length;i++){
				aShark[i].swimming();	
			}
			for(var i=0;i<aDFish.length;i++){
				if(aDFish[i].die()){
					aDFish.splice(i,1);
					i--;
				}
			}
		},120);
		oC.onmousemove=function(ev){
			if(ev.pageY>bottom.y)return;
			var a=ev.pageX-oCont.offsetLeft-(oC.width/2+30);
			var b=bottom.y+oCont.offsetTop-ev.pageY;
			cannon.rotate=a2d(Math.atan2(a,b));
		};
		oC.onclick=function(ev){
			var pX=ev.pageX-oCont.offsetLeft;
			var pY=ev.pageY-oCont.offsetTop;
			if(pY<bottom.y){
				var bullet=new Bullet(result,cannon.type);
				bullet.rotate=cannon.rotate;
				bullet.x=cannon.x+Math.sin(d2a(cannon.rotate))*(45+cannon.type*3);
				bullet.y=cannon.y-Math.cos(d2a(cannon.rotate))*(45+cannon.type*3);
				aBullet.push(bullet);
			}else{
				var rotate=cannon.rotate;
				if(pX>oC.width/2-28&&pX<oC.width/2+8&&pY<oC.height&&pY>oC.height-28){
					iNow--;
					iNow<1&&(iNow=7);
					cannon=new Cannon(result,iNow)
					cannon.x=oC.width/2+30;
					cannon.y=bottom.y;
					cannon.rotate=rotate;
				}else if(pX>oC.width/2+52&&pX<oC.width/2+88&&pY<oC.height&&pY>oC.height-28){
					iNow++;
					iNow>7&&(iNow=1);
					cannon=new Cannon(result,iNow);
					cannon.x=oC.width/2+30;
					cannon.y=bottom.y;
					cannon.rotate=rotate;
				}
			}
			return false;
		};
	});		
});