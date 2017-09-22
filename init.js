/*系统资源*/
const resource=[
      'fish1','fish2','fish3','fish4','fish5',
      'cannon1','cannon2','cannon3','cannon4','cannon5','cannon6','cannon7',
      'bottom','bullet','coinAni1','coinAni2','web','number_black'
    ];

/*系统初始化*/
window.onload=function(){
	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	var can = document.querySelector("#can")
	var o2d = can.getContext("2d")

	/*新建炮筒*/
	var cannon = new Cannon()

	var arrBullet=[] /*炮弹*/
	var arrFish=[]	 /*鱼*/
	var arrWeb=[]	 /*渔网*/
	var arrDieFish=[] /*死鱼*/
	var arrCoin=[] 		/*金币*/
	var arrScore=[];   /*6个积分牌*/
	var score = 0 ;  /*分数*/
	/*加载数据*/
	loading( resource,function(){
	},load );
	/*建立记分牌*/
	for( var i=1;i<=6;i++ ){
		var borard = new Score(i);
		arrScore.push(borard)
	}
/*统一绘制*/
	setInterval( function(){
		o2d.clearRect(0,0,can.width,can.height)	

/*控制鱼的出生点*//*控制鱼的出生点*//*控制鱼的出生点*//*控制鱼的出生点*/
		if( Math.random()<0.01 ){
			var fish = new Fish( rand(1,5),arrBullet )
			if( Math.random()>0.5 ){
				fish.rotate=rand( 45,135 );
				fish.x=-80
			}else{
				fish.rotate=rand( -135,-45 );	
				fish.x=can.width+80
			}
			fish.y=rand( 150,can.height-150 )
			arrFish.push(fish)
		}
/*绘制渔网*//*绘制渔网*//*绘制渔网*//*绘制渔网*//*绘制渔网*/		
		for( var i=0;i<arrWeb.length;i++ ){
			arrWeb[i].draw(o2d)
		}
/*咸鱼*//*咸鱼*//*咸鱼*//*咸鱼*//*咸鱼*//*咸鱼*//*咸鱼*/	
		for( var i =0;i<arrDieFish.length;i++ ){
			arrDieFish[i].draw(o2d);
		}							
/*鱼*//*鱼*//*鱼*//*鱼*//*鱼*//*鱼*//*鱼*/
		for( var i=0;i<arrFish.length;i++ ){

			arrFish[i].draw(o2d)

/*鱼儿优化*//*鱼儿优化*//*鱼儿优化*//*鱼儿优化*/
			if(
				arrFish[i].x<-100||
				arrFish[i].x>can.width+100||
				arrFish[i].y<-100||
				arrFish[i].y>can.height+100
			){
				clearInterval( arrFish[i].timer1 )
				clearInterval( arrFish[i].timer2 )				
				arrFish.splice(i,1)
			}
		}
/*金币*//*金币*//*金币*//*金币*//*金币*//*金币*//*金币*/
		for( var i = 0 ; i<arrCoin.length;i++ ){
			arrCoin[i].draw(o2d)
		}		
/*炮弹*//*炮弹*//*炮弹*//*炮弹*//*炮弹*//*炮弹*//*炮弹*//*炮弹*/
		for( var i = 0 ; i<arrBullet.length;i++ ){
			arrBullet[i].draw(o2d)

/*炮弹优化*//*炮弹优化*//*炮弹优化*//*炮弹优化*//*炮弹优化*//*炮弹优化*/
			if(
				arrBullet[i].x<-100||
				arrBullet[i].x>can.width+100||
				arrBullet[i].y<-100||
				arrBullet[i].y>can.height+100
			){
				clearInterval( arrBullet[i].timer )
				arrBullet.splice(i,1)
			}
		}
/*碰撞检测*//*碰撞检测*//*碰撞检测*//*碰撞检测*//*碰撞检测*/
	for( var i = 0 ; i<arrFish.length;i++ ){
		for( var j=0;j<arrBullet.length;j++ ){
			var crash = arrFish[i].isCrash( arrBullet[j].x,arrBullet[j].y )			
			if( crash ){
				var fishX1=arrFish[i].x;
				var fishY1=arrFish[i].y;
				var bulletType=arrBullet[j].type;
				/*击中炮弹消失*/
				arrBullet.splice(j,1)
				/*出渔网*/
				var web = new Web();
				web.x=fishX1;
				web.y=fishY1;
				web.type=bulletType
				arrWeb.push(web)
				setTimeout(function(){
					arrWeb.splice(0,1)
				},500)
			}
		}
	}	



/*渔网捕鱼碰撞检测*//*渔网捕鱼碰撞检测*//*渔网捕鱼碰撞检测*/			
	for( var i = 0 ; i<arrWeb.length;i++ ){
		for( var j=0;j<arrFish.length;j++ ){
			var iscatch = arrWeb[i].isCatch(arrFish[j].x,arrFish[j].y)
			if( iscatch ){
				/*渔网内的所有鱼都会死亡*/
				var fishType=arrFish[j].type;
				var fishX2 = arrFish[j].x;
				var fishY2 = arrFish[j].y;
				var fishRotate = arrFish[j].rotate;
				clearInterval(arrFish[j].timer1)
				clearInterval(arrFish[j].timer2)
				arrFish.splice(j--,1)
				
				/*判断得分*/
				
				switch(fishType){
					case 1 :
					case 2 : score++;break;
					case 3 :
					case 4 :
					case 5 : score+=10;break;
				}			
							
				for( var i=0;i<getBit( score ).length;i++ ){
					var index = parseInt( getBit( score )[i] )	
					arrScore[5-i].move();	
					arrScore[5-i].cur=9-index
				}


				$("score").innerHTML=score;
				/*出现金币*/
				var coin = new Coin(fishType);
				coin.x=fishX2;
				coin.y=fishY2;
				arrCoin.push(coin)
				setTimeout(function(){
					arrCoin.shift();
				},2000)

				/*死鱼出现*/
				var dieFish=new DieFish(fishType);
				dieFish.x=fishX2;
				dieFish.y=fishY2;
				dieFish.rotate=fishRotate;
				arrDieFish.push(dieFish)
				setTimeout(function(){
					arrDieFish.shift();
				},700)
			}
		}
	}

/*炮台*//*炮台*//*炮台*//*炮台*//*炮台*//*炮台*//*炮台*/
		o2d.drawImage( JSON["bottom"],
		0,0,765,70,
		0,532,765,70	
		)
/*记分牌*//*记分牌*//*记分牌*//*记分牌*//*记分牌*//*记分牌*/	
		for( var i =0 ; i<arrScore.length;i++ ){
			arrScore[i].draw(o2d)
		}
/*炮筒*//*炮筒*//*炮筒*//*炮筒*//*炮筒*//*炮筒*//*炮筒*//*炮筒*/
		cannon.draw(o2d)

	},16 )


	/*移动调整炮台方向*/
	can.onmousemove=function(e){
		var e = e || event;
		var x = e.pageX -can.offsetLeft-cannon.x
		var y = cannon.y-(e.pageY-can.offsetTop)
		var rt =90-a2r( Math.atan2( y,x ) )
		cannon.rotate = rt;		
		can.onclick=function(e){				
			cannon.shut();		
			var bullet =new Bullet(cannon.type);
			bullet.rotate=cannon.rotate;
			bullet.x=cannon.x
			bullet.y=cannon.y
			arrBullet.push(bullet)			
		}		
	}	
	/*点击切换炮台*/
	$("left").onclick=function(){
		if(cannon.type==1){
			return;
		}else{
			cannon.type--;
		}
	}
	$("right").onclick=function(){
		if( cannon.type==7 ){
			return;
		}else{
			cannon.type++;
		}
	}
}