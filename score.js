var SCORE_SIZE=[
	null,
	{x:20,y:577},
	{x:40,y:577},
	{x:65,y:577},
	{x:88,y:577},
	{x:112,y:577},
	{x:135,y:577}
]
class Score{
	constructor(type,cur){
		this.type=type
		this.cur=cur||9;
		this.h=9*24
	}
	draw(o2d){
		var x =SCORE_SIZE[this.type].x
		var y =SCORE_SIZE[this.type].y
		o2d.save();		 
		o2d.drawImage( JSON["number_black"],
			0,this.h,20,20,
			x,y,20,20
		)
		o2d.restore();
	}
	move(){
		clearInterval(timer)
		var timer =setInterval( function(){			
			if( this.h==this.cur*24 ){
				clearInterval(timer)
			}else{
				this.h--
				if( this.h<0 ){
					this.h=9*24
					clearInterval(timer)
				}
			}
		}.bind(this),10 )
	}
}