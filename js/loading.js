'use strict'
;(function(wind,doc){
	var oLoad=document.querySelector('#loading');
	var oC=doc.querySelector('#c1');
	var gd=oC.getContext('2d');
	oC.width=doc.documentElement.clientWidth;
	oC.height=doc.documentElement.clientHeight;
	var cx=oC.width/2;
	var cy=oC.height/2;
	addEvent(wind,'resize',function(){
		oC.width=doc.documentElement.clientWidth;
		oC.height=doc.documentElement.clientHeight;
		cx=oC.width/2;
		cy=oC.height/2;	
	});
	function drawArc(cx,cy,r,s,e,color,w,d){
		color=color||'#fff';
		w=w||0;
		d=d||0;
		gd.beginPath();
		gd.strokeStyle=color;
		gd.lineWidth=w;
		gd.shadowBlur=0;
		gd.arc(cx,cy,r,d2a(s-90+d),d2a(e-90+d),false);
		gd.stroke();
	}
	function drawCircle(cx,cy,t){
		eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('d(c,5,h,-k,k,\'e(3,3,3,0.7)\',4,a);d(c,5,h,i,r,\'e(3,3,3,0.9)\',8,a);d(c,5,h,h,H,\'e(3,3,3,0.9)\',8,a);d(c,5,p,o,n,\'e(3,3,3,0.8)\',6,b);d(c,5,p,-s,q,\'e(3,3,3,0.6)\',4,b);d(c,5,j,G,o,\'e(3,3,3,0.8)\',4,a);d(c,5,j,m,L,\'e(3,3,3,0.8)\',4,a);d(c,5,v,q,n,\'e(3,3,3,0.6)\',6,b);d(c,5,A,-C,s,\'e(3,3,3,0.8)\',4,b);d(c,5,z,-r,-i,\'#g\',i,a);d(c,5,l,j,y,\'#g\',x,b);d(c,5,K,l,m,\'e(3,3,3,0.9)\',4,b);a+=1,b-=2;f.M=\'w u\';f.I=\'E\';f.B=\'D\';f.O=\'#g\';f.F=k;f.J=\'#g\';f.N(t,c,5);',51,51,'|||255||cy|||||||cx|drawArc|rgba|gd|fff|180|20|150|10|80|240|280|145|165|30|90|60||黑体|130|90px|14|170|100|120|textBaseline|200|middle|center|shadowBlur|45|230|textAlign|shadowColor|75|350|font|fillText|fillStyle'.split('|'),0,{}))
	}
	var a=0,b=0;
	var t=5;
	if(document.documentElement.clientWidth<700){
		var t1=setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			drawCircle(cx,cy,t);
			if(t==0){
				clearInterval(t1);	
				boom();
			}
		},30);
		var t2=setInterval(function(){
			t--;
			if(t==0){
				clearInterval(t2);
			}	
		},1000);
	}else{
		loadImages({
			'shark1':'images/shark1.png',
			'shark2':'images/shark2.png',	
			'web':'images/web.png',
			'click':'images/click.png',
			'bg':'images/bg.png'
		},function(result){
			var shark=new Fish(result,7);
			shark.y=oC.height/2;
			shark.x=-250;
			var total=shark.blood;
			var aDShark=[];
			var aWeb=[];
			t='0%';
			var count=0;
			var t1=setInterval(function(){
				gd.clearRect(0,0,oC.width,oC.height);
				drawCircle(cx,cy,t);
				gd.shadowBlur=0;
				
				shark.draw&&shark.draw(gd);
				shark.move&&shark.move();
				if(shark.x>oC.width+350){
					shark.rotate=-90;	
				}else if( shark.x<-300){
					shark.rotate=90;	
				}
				if(count/3>10&&count/5<13){
					if(Math.round((count/4))%2){
						gd.drawImage(result.click,shark.x+50,shark.y-50,134,122);	
					}
				}
				for(var i=0;i<aDShark.length;i++){
					aDShark[i].draw(gd);	
				}
				document.onclick=function(ev){
					var pos={x:ev.pageX,y:ev.pageY};
					if(shark){
						if(!shark.collTest)return;
						if(shark.collTest(pos)){
							var web=new Web(result,7);
							web.x=pos.x;
							web.y=pos.y;
							aWeb.push(web);
							shark.blood-=40;
							t=Math.round((1-shark.blood/total)*100)+'%';
							if(shark.blood<=0){
								aDShark.push(shark);
								shark={};
								clearInterval(t2);
							}
						}	
					}
				};
				for(var i=0;i<aWeb.length;i++){
					aWeb[i].draw(gd);
					aWeb[i].shake();	
				}
				while(aWeb.length>8){
					aWeb.splice(aWeb.length-1,1);	
				}
			},30);	
			var t2=setInterval(function(){
				shark.swimming&&shark.swimming();
				count++;
			},120);
			var t3=setInterval(function(){
				aWeb.shift();
				for(var i=0;i<aDShark.length;i++){
					if(aDShark[i].die()){
						aDShark.splice(i,1);
						i--;
						clearInterval(t1);
						clearInterval(t2);
						clearInterval(t3);
						boom();	
					}	
				}
			},240);
		});
	}
	
	var oMask=document.querySelector('#mask');
	oMask.style.width=document.documentElement.clientWidth+'px';
	oMask.style.height=document.documentElement.clientHeight+'px';
	var R=7;
	var C=10;
	var w=oMask.offsetWidth/C;
	var h=oMask.offsetHeight/R;
	for(var i=0;i<R;i++){
		for(var j=0;j<C;j++){
			var oS=document.createElement('span');
			oS.style.left=j*w+'px';
			oS.style.top=i*h+'px';
			oS.style.width=w+'px';
			oS.style.height=h+'px';
			oS.style.opacity=1;
			oS.style.backgroundPosition=-j*w+'px'+' -'+i*h+'px';
			oS.style.display='none'
			oMask.appendChild(oS);	
		}	
	}
	var aS=oMask.children;
	function boom(){
		oC.style.display='none';
		for(var i=0;i<aS.length;i++){
			aS[i].style.display='block';	
		}
		for(var i=0;i<aS.length;i++){
			aS[i].style.WebkitTransition='.6s all ease-out';
			aS[i].style.MozTransition='.6s all ease-out';
			aS[i].style.msTransition='.6s all ease-out';
			var sT='translate('+(aS[i].offsetLeft+aS[i].offsetWidth/2-oMask.offsetWidth/2)+'px,'+(aS[i].offsetTop+aS[i].offsetHeight/2-oMask.offsetHeight/2)+'px) rotateX('+rnd(-180,180)+'deg) rotateY('+rnd(-180,180)+'deg) translateZ(100px) scale(1.5,1.5)';
			aS[i].style.WebkitTransform=sT;
			aS[i].style.MozTransform=sT;
			aS[i].style.msTransform=sT;
			aS[i].style.opacity=0;	
		}	
		aS[aS.length-1].addEventListener('transitionend',function(){
				if(oLoad.children.length==0)return;
				oLoad.removeChild(oC);
				oLoad.removeChild(oMask);
				lazyLoad();
		},false);
	}
	function lazyLoad(){
		var aImg=document.getElementsByTagName('img');
		for(var i=0;i<aImg.length;i++){
			aImg[i].src=aImg[i].getAttribute('_src');	
		}		
	}
})(window,document);