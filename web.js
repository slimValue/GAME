var WEB_SIZE=[
	null,
	{x: 331, y: 371, r:45,w:90},
	{x: 12, y: 410, r:55,w:110},
	{x: 174, y: 371, r:65,w:130},
	{x: 254, y: 194, r:75,w:150},
	{x: 0, y: 243, r:80,w:160},
	{x: 240, y: 0, r:90,w:180},
	{x: 12, y: 20, r:100,w:200}
	
];
class Web{
	constructor(type){
		this.x=0;
		this.y=0;	
		this.type=type||1;	
		this.scale=0.5;
		this.r=WEB_SIZE[this.type].r
		this.move();
	}
	draw(o2d){
		var x = WEB_SIZE[this.type].x
		var y = WEB_SIZE[this.type].y
		var w = WEB_SIZE[this.type].w	
		o2d.save();
		o2d.translate(this.x,this.y);
        o2d.scale(this.scale,this.scale);
		o2d.drawImage(JSON["web"],
			x,y,w,w,
			-w/2,-w/2,w,w
		)
		o2d.restore();
	}
	move(){
		var timer=setInterval(function(){
          this.scale+=0.05;
          if(this.scale>1){
            clearInterval(timer);
          }
        }.bind(this),30);
	}
	isCatch(x,y){
		var a = this.x-x
		var b = this.y-y
		var c=Math.sqrt(a*a+b*b);
		if( c<this.r ){
			return true;
		}else{
			return false;
		}
	}
}