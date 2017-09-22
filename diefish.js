 var FISH_SIZE=[
      null,
      {w: 55, h: 37, collR: 17},
      {w: 78, h: 64, collR: 24},
      {w: 72, h: 56, collR: 20},
      {w: 77, h: 59, collR: 22},
      {w: 107, h: 122, collR: 29}
    ];

class DieFish{
	constructor(type){
		this.type=type;
		this.x=0;
		this.y=0;
		this.rotate=0;	
		this.cur=0;	
		this.move();
	}
	draw(o2d){		
		var w = FISH_SIZE[this.type].w;
		var h = FISH_SIZE[this.type].h;
		o2d.save();
		o2d.translate( this.x,this.y )	
		o2d.rotate( r2a(90-this.rotate) )	
		if( (90-this.rotate)>90&&(90-this.rotate)<270 ){
			o2d.scale(1,-1)
		}		
		o2d.drawImage( JSON["fish"+this.type],
		0,h*(this.cur+4),w,h,
		-w,-h/2,w,h
		)
		o2d.restore();	
	}
	move(){		
		this.timer=setInterval(function(){
			this.cur++
			if(this.cur==4){
				this.cur=0;
				clearInterval( this.timer )
			}
		}.bind(this),200)
	}
}    