class Coin{
	constructor(type){
		this.type=type;
		this.x=0;
		this.y=0;
		this.timer=null;
		this.move();
		this.cur=0;
		this.timer=null;
		this.scale=1
	}
	draw(o2d){
		o2d.save();
		o2d.translate( this.x+30,this.y )
		o2d.scale( this.scale,this.scale )
		switch( this.type ){
			case 1 : 
			case 2 : 
				o2d.drawImage(JSON["coinAni1"],
					0,this.cur*60,60,60,
					-30,-30,30,30
				)
			;break;
			case 3 : 
			case 4 : 
			case 5 : 
				o2d.drawImage(JSON["coinAni2"],
					0,this.cur*60,60,60,
					-30,-30,30,30
				)
			;break
		}
		o2d.restore();
	}
	move(){
		var flag =true;
		var timer=setInterval(function(){
			this.cur++
			if( this.cur==10 ){
				this.cur=0;				  
			}
			if( this.scale>2 ){
				flag=false;
			}
			if( this.scale<1 ){
				clearInterval( timer )
			}
			if( flag ){
				this.scale+=0.05
			}else{
				this.scale-=0.1
			}
			this.x+=(0-this.x)/10;
			this.y+=(700-this.y)/10

		}.bind(this),50)
	}
}