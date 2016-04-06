'use strict'
;(function(){
	function Work(workId,boxId,sideId){
		var oWork=document.getElementById(workId);
		var oBox=document.getElementById(boxId);
		var oSideBar=document.getElementById(sideId);
		var oUl=oBox.children[0];
		var aLi=oBox.getElementsByTagName('li');
		var aImg=oBox.getElementsByTagName('img');
		var disC=oBox.offsetWidth/2;
		oBox.style.marginTop=-oBox.offsetHeight/2+'px';	
		oBox.style.marginLeft=-oBox.offsetWidth/2+'px';
		addEvent(window,'resize',function(){
			oBox.style.marginTop=-oBox.offsetHeight/2+'px';	
			oBox.style.marginLeft=-oBox.offsetWidth/2+'px';
			oUl.style.top=oBox.offsetHeight/4+'px';
			oUl.style.height=oBox.offsetHeight/2+'px';
			disC=oBox.offsetWidth/2;
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.width=oBox.offsetHeight/2+'px';	
			}
			oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
		});
		
		oUl.style.top=oBox.offsetHeight/4+'px';
		oUl.style.height=oBox.offsetHeight/2+'px';
		for(var i=0;i<aLi.length;i++){
			aLi[i].style.width=oBox.offsetHeight/2+'px';	
		}
		oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';
		var l=disC-2.5*aLi[0].offsetWidth;
		oBox.onmousedown=function(ev){
			var oEvent=ev||event;
			var disX=oEvent.clientX-oUl.offsetLeft;
			oSideBar.style.transition='none';
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				l=oEvent.clientX-disX;
				setPos();	
			};	
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				oSideBar.style.transition='.7s all ease';
				oBox.releaseCapture&&oBox.releaseCapture();	
			};
			oBox.setCapture&&oBox.setCapture();
			return false;
		};
		function setPos(){
			if(l>disC-(0+0.5)*aLi[0].offsetWidth){
				l=disC-(0+0.5)*aLi[0].offsetWidth;
			}else if(l<disC-(aLi.length-1+0.5)*aLi[0].offsetWidth){
				l=disC-(aLi.length-1+0.5)*aLi[0].offsetWidth;	
			}
			oUl.style.left=l+'px';
			oSideBar.style.backgroundPosition=1350*(l-disC+(0+0.5)*aLi[0].offsetWidth)/((aLi.length-1)*aLi[0].offsetWidth*5)+'px 0';
			for(var i=0;i<aImg.length;i++){
				var dis=disC-(aLi[i].offsetLeft+aLi[0].offsetWidth/2+oUl.offsetLeft);
				var scale=1-Math.abs(dis)/500;
				(scale<0.1)&&(scale=0.1);
				aImg[i].style.height=scale*1.2*oBox.offsetHeight+'px';
				aImg[i].style.marginTop=-(aImg[i].offsetHeight-aLi[0].offsetHeight)/2+'px';	
				aImg[i].style.width=aLi[0].offsetWidth*4*scale+'px';
				aImg[i].style.marginLeft=-(aImg[i].offsetWidth-aLi[0].offsetWidth)/2+'px';
				aImg[i].style.zIndex=scale*10000;
				(scale>0.8)&&(scale==1);
				aImg[i].style.opacity=scale;
			}	
		}
		oUl.style.left=l+'px';
		setPos();	
		fnWheel(oWork,function(down){
			oSideBar.style.transition='none';
			if(down){
				l-=25;
				setPos();	
			}else{
				l+=25;
				setPos();	
			}	
			oSideBar.style.transition='.7s all ease';
		});
	}
	function DragBall(ballId,workId){
		var oBall=document.getElementById(ballId);
		var oWork=document.getElementById(workId);
		var iSpeedX=15;
		var iSpeedY=-10;
		var oldX=0;
		var oldY=0;
		var timer=null;
		addEvent(oBall,'dblclick',function(){
			window.open('eq/works.html','_blank');
		});
		oBall.onmousedown=function(ev){
			clearInterval(timer);
			var oEvent=ev||event;
			var disX=oEvent.clientX-oBall.offsetLeft;
			var disY=oEvent.clientY-oBall.offsetTop;
			document.onmousemove=function(ev){
				var oEvent=ev||event;
				l=oEvent.clientX-disX;
				t=oEvent.clientY-disY;
				if(l<0){
					l=0;	
				}else if(l>oWork.offsetWidth-oBall.offsetWidth-2){
					l=oWork.offsetWidth-oBall.offsetWidth-2;	
				}
				if(t<0){
					t=0;	
				}else if(t>oWork.offsetHeight-oBall.offsetHeight-2){
					t=oWork.offsetHeight-oBall.offsetHeight-2;	
				}
				oBall.style.left=l+'px';
				oBall.style.top=t+'px';
				iSpeedX=ev.clientX-oldX;
				iSpeedY=ev.clientY-oldY;
				oldX=ev.clientX;
				oldY=ev.clientY;
			};
			document.onmouseup=function(){
				move();
				document.onmousemove=null;
				document.onmouseup=null;
				oBall.releaseCapture&&oBall.releaseCapture();	
			};
			oBall.setCapture&&oBall.setCapture();
			return false;	
		};
		move();
		var t=20;
		var l=20;	
		function move(){
			clearInterval(timer);
			timer=setInterval(function(){
				iSpeedY+=3;
				l+=iSpeedX;
				t+=iSpeedY;	
				if(l<0){
					l=0;
					iSpeedX*=-0.8;
					iSpeedY*=0.8;
				}else if(l>oWork.offsetWidth-oBall.offsetWidth-2){
					l=oWork.offsetWidth-oBall.offsetWidth-2;
					iSpeedX*=-0.8;
					iSpeedY*=0.8;
				}
				if(t<0){
					t=0;
					iSpeedY*=-0.8;
					iSpeedX*=0.8;	
				}else if(t>oWork.offsetHeight-oBall.offsetHeight-2){
					t=oWork.offsetHeight-oBall.offsetHeight-2;
					iSpeedY*=-0.8;
					iSpeedX*=0.95;	
				}
				oBall.style.left=l+'px';
				oBall.style.transform='rotate('+l+'deg)';
				oBall.style.top=t+'px';
				if(Math.abs(iSpeedX)<1)iSpeedX=0;
				if(Math.abs(iSpeedY)<1)iSpeedY=0;
				if(iSpeedX==0&&iSpeedY==0&&t==oWork.offsetHeight-oBall.offsetHeight){
					clearInterval(timer);	
				}
			},30);
		}
	}
	var oSide=document.getElementById('sidebar');
	var oSel=document.getElementById('m_sel');
	var aOpt=getByClass(oSel,'m_option');
	var oCont=document.getElementById('content');
	var aDiv=oCont.children;
	var lastIndex=0;
	var oBtn=document.getElementById('r_btn');
	var oSBtn=oBtn.children[0];
	var bOk=false;
	for(var i=0;i<aOpt.length;i++){
		(function(index){
			aOpt[i].onclick=function(){
				//clientWidth<=1200时，点击选项，sidebar需要隐藏
				if(document.documentElement.clientWidth<=1200){
					oSide.style.transition='none';
					if(document.documentElement.clientWidth<700){
						startMove(oSide,{left:-oSide.offsetWidth},{complete:fnEnd});
					}else{
						startMove(oSide,{left:-oSide.offsetWidth+50},{complete:fnEnd});
					}
					oSBtn.className='s_btn';
					bOk=false;
				}
				
				if(index==1||index==2||index==3){
					oSide.style.backgroundPosition='-135px 0';	//Demo选项中的图片为中间位置
				}else{
					oSide.style.backgroundPosition='0 0';
				}
				for(var i=0;i<aOpt.length;i++){
					aOpt[i].style.color='';	
				}
				aOpt[index].style.color='rgb(255,247,0)';
				setTimeout(function(){
					tab(index);	
				},500);
				function tab(index){
					aDiv[lastIndex].style.transition='.7s all ease';
					aDiv[lastIndex].style.opacity=0;
					aDiv[index].style.opacity=0;
					
					TransitionEnd(aDiv[lastIndex],function(){
						aDiv[lastIndex].style.display='none';
						aDiv[index].style.transition='.8s all ease';
						aDiv[index].style.display='block';
						if(index==1){
							aDiv[index].style.left='-500px';
							Work('work_html','html_box','sidebar');	
							DragBall('ball1','work_html');
							
						}else if(index==2){
							aDiv[index].style.left='-500px';
							Work('work_js','js_box','sidebar');
							DragBall('ball2','work_js');
						}else if(index==3){
							aDiv[index].style.left='-500px';
							Work('work_h5','js_h5','sidebar');
							DragBall('ball3','work_h5');
						}else if(index==4||index==5){
							aDiv[index].style.top='-60px';	
						
						}
						setTimeout(function(){
							aDiv[index].style.top=0;
							aDiv[index].style.left=0;
							aDiv[index].style.opacity=1;
							lastIndex=index;
							TransitionEnd(aDiv[index],function(){
								aDiv[index].style.transition='none';
							})
						},0);	
					});
				}
			};	
		})(i);
	}
	addEvent(oBtn,'click',function(){
		oSide.style.transition='none';
		if(bOk){
			if(document.documentElement.clientWidth<700){
				startMove(oSide,{left:-oSide.offsetWidth},{complete:fnEnd});
			}else{
				startMove(oSide,{left:-oSide.offsetWidth+50},{complete:fnEnd});
			}
			oSBtn.className='s_btn';
		}else{
			startMove(oSide,{left:0},{complete:fnEnd});
			oSBtn.className='s_btn active';
		}
		bOk=!bOk;	
	});
	function fnEnd(){
		oSide.style.transition='.7s all ease';	
	}
	var oLoad=document.getElementById('loading');
	var timer=setInterval(function(){
		if(oLoad.children.length==0){
			oSide.style.transform='translate(0,0)';
			clearInterval(timer);	
		}
	},100);
	addEvent(window,'resize',function(){
		var cW=document.documentElement.clientWidth;
		if(cW>1200){
			oSide.style.left='0px';
			oSBtn.className='s_btn';
		}else if(cW<=1200&&cW>700){
				oSide.style.left=-320+'px';
				bOk=false;
		}else if(cW<=700){
			oSide.style.left=-oSide.offsetWidth+'px';
			bOk=false;	
		}
	});
})();

























