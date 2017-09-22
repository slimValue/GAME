var CANNON_SIZE=[
	null,
	{w: 74, h: 74},
	{w: 74, h: 76},
	{w: 74, h: 76},
	{w: 74, h: 83},
	{w: 74, h: 85},
	{w: 74, h: 90},
	{w: 74, h: 94}
];
class Cannon{
	constructor(type){
		this.type=type||1;
		this.x=431;
		this.y=570;
		this.rotate=0;
		this.cur=0;
		this.count=type||5;
	}
	draw(o2d){
		var w = CANNON_SIZE[this.type].w
		var h = CANNON_SIZE[this.type].h
		o2d.save();
		o2d.translate(this.x,this.y)
		o2d.rotate(r2a(this.rotate))
		o2d.drawImage(JSON["cannon"+this.type],  
			0,h*this.cur,w,h,
			-w/2,-h/2,w,h
		)
		o2d.restore();
	}
	shut(){	
		this.count--;
		clearInterval(timer)
		var timer = setInterval(function(){
			this.cur++
			if( this.cur==5 ){
				this.cur=0;
				clearInterval(timer)
			}
		}.bind(this),30)
	}
}