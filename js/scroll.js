'use strict'
;(function(){
	function scroll(boxId,sideId){
		var oBox=document.getElementById(boxId);
		var oSide=document.getElementById(sideId);
		var t=0;
		fnWheel(oBox,function(down){
			oSide.style.transition='none';
			if(oBox.offsetHeight<document.documentElement.clientHeight){
				oBox.style.height=document.documentElement.clientHeight+'px';	
			}
			if(down){
				t-=20;
				if(t>0){
					t=0;	
				}else if(t<document.documentElement.clientHeight-oBox.offsetHeight){
					t=document.documentElement.clientHeight-oBox.offsetHeight;	
				}
				oBox.style.top=t+'px';
				oSide.style.backgroundPosition='0px '+(1200-oSide.offsetHeight)*t/(oBox.offsetHeight-document.documentElement.clientHeight)+'px';	
			}else{
				t+=20;
				if(t>0){
					t=0;	
				}else if(t<document.documentElement.clientHeight-oBox.offsetHeight){
					t=document.documentElement.clientHeight-oBox.offsetHeight;	
				}
				oBox.style.top=t+'px';
				oSide.style.backgroundPosition='0px '+(1200-oSide.offsetHeight)*t/(oBox.offsetHeight-document.documentElement.clientHeight)+'px';
			}
			oSide.style.transition='.7s all ease';
		});
	}
	scroll('about_me','sidebar');
	scroll('contact','sidebar');
})();