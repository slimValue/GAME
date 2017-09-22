var JSON={};
function loading( data,success,load ){ /*加载*/
	var count = 0 ;
	for( var i=0;i<data.length;i++ ){
		(function(index){
			var oImg = new Image();
			oImg.onload=function(){
				count++;
				load&&load( count,data.length )
				JSON[ data[index] ]= this;      /*这个IMG对象*/
				if( data.length==count ){
					success&&success();
				}
			};
			oImg.src="img/"+data[index]+".png"
			
		})(i)
	}	
}
function r2a(n){     /*弧转角*/
	return n*Math.PI/180;
}
function a2r(n){
	return n*180/Math.PI;
}
function rand( min,max ){ /*随机数*/
	return Math.floor( Math.random()*(max-min+1)+min )
}
function load(count,length){
}
function $(id){
	return document.getElementById(id)
}
/*传入一个数，返回一个数组，这个数组是这个数的个，十，百。。。位 数字*/
function getBit(num){
	var str =  num.toString()
	var arr =[];
	for( var i=0;i<str.length;i++ ){
		arr.unshift( str[i] )  
	}
	return arr
}