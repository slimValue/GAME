var BULLET_SIZE=[
	null,
	{x: 86, y: 0, w: 24, h: 26},
	{x: 62, y: 0, w: 25, h: 29},
	{x: 30, y: 0, w: 31, h: 35},
	{x: 32, y: 35, w: 27, h: 31},
	{x: 30, y: 82, w: 29, h: 33},
	{x: 0, y: 82, w: 30, h: 34},
	{x: 0, y: 0, w: 30, h: 44}
]
class Bullet{
	constructor(type){
		this.x=0;
		this.y=0;
		this.type=type||1;
		this.speed=7;
		this.rotate=0;
		this.move();
		this.timer=null;
	}
	draw(o2d){
		var x = BULLET_SIZE[this.type].x
		var y = BULLET_SIZE[this.type].y
		var w = BULLET_SIZE[this.type].w
		var h = BULLET_SIZE[this.type].h
		o2d.save();
		
		if( this.rotate>0 ){
			o2d.translate(this.x+w/2,this.y+h/2)
		}else{
			o2d.translate(this.x+w/2,this.y-h/2)
		}		
		o2d.rotate( r2a(this.rotate) );
		
		o2d.drawImage( JSON["bullet"],
			x,y,w,h,
			-w,-h,w,h
		)
		o2d.restore();
	}
	move(){
		clearInterval( this.timer )
		this.timer = setInterval(function(){
			this.x+=this.speed*Math.sin( r2a(this.rotate) )
			this.y-=this.speed*Math.cos( r2a(this.rotate) )	
		}.bind(this),50-(10-this.type)*3)
	}
}