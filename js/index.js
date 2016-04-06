'use strict'
domReady(function(){
	;(function(){
		var oWBtn=document.getElementById('work_btn');
		var oWList=document.getElementById('work_list');
		var bOk=false;
		
		addEvent(oWBtn,'click',function(){
			if(bOk){
				oWBtn.className='';
				startMove(oWList,{height:0},{complete:function(){
					oWList.style.display='none';	
				}});
			}else{
				oWBtn.style.transition='1s all ease';
				oWList.style.display='block';
				var h=oWList.scrollHeight;
				oWList.style.display='none';
				oWBtn.className='active';
				oWList.style.display='block';
				oWList.style.height=0;
				startMove(oWList,{height:h});
			}
			bOk=!bOk;
		},false);
	})();
	(function(){
		var oMyPic=document.getElementById('my_picture');
		var oLogo=document.getElementById('logo');
		var oPrev=oLogo.children[0];
		var oNext=oLogo.children[1];
		addEvent(oMyPic,'mouseenter',function(){
			oLogo.style.transform='perspective(800px) rotateY(-180deg)';	
			oPrev.style.opacity=0;
			oNext.style.opacity=1;
		});
		addEvent(oMyPic,'mouseleave',function(){
			oLogo.style.transform='perspective(800px) rotateY(0deg)';	
			oPrev.style.opacity=1;
			oNext.style.opacity=0;
		});		
	})();
	(function(){
		var oBtn=document.getElementById('movedown');
		var oContHome=document.getElementById('cont_home');
		var oSidebar=document.getElementById('sidebar');
		var bOk=false;
		oBtn.onclick=function(){
			if(bOk){
				oBtn.className='movedown'
				startMove(oContHome,{top:0});
				oSidebar.style.backgroundPosition='top left';	
			}else{
				oBtn.className='movedown active'
				startMove(oContHome,{top:-200});
				oSidebar.style.backgroundPosition='left 75%';
			}
			bOk=!bOk;
		};
		
		var oSel=document.getElementById('game_sel');
		var aA=oSel.getElementsByTagName('a');
		for(var i=0;i<aA.length;i++){
			(function(index){
				aA[i].onclick=function(){
					if(index!=0)return;
					oBtn.className='movedown'
					oSidebar.style.backgroundPosition='top left';
					startMove(oContHome,{top:0});
					bOk=false;
				};	
			})(i);
		}
		
	})();
});	


