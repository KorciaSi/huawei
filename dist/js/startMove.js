/*
 * startMove 运动函数
 * 参数：
 * elem:被操作的元素
 * json:被修改的css属性及目标值，对象中的每一项表示一个属性及值
 * 		例如：{
 * 				"width":500,
 * 				"opacity":80,
 * 				"font-size":40
 * 			}
 * fn:当运动结束之后，触发的函数
 */

function startMove(elem,json,fn){
	var attr,target,flag
	//先清除计时器
	clearInterval(elem.timer);
	// 开启定时器	
	elem.timer=setInterval(function(){
		flag=true;// 假设所有属性都以到达目标值
		// 循环json对象，取里面每一个属性
		for(attr in json){
			target=json[attr];//目标值
			// 取elem元素的attr属性的当前值
			var v=getStyle(elem,attr);
			// 计算target目标值 与 当前属性值的间距，求步长（速度）
			if (attr=="opacity") {
				v=Math.round(v*100);//取整
			}else{
				v=parseInt(v);
			}
			var speed=(target-v)/6;
			// 如果是从左到右运动时，间距一定是正数，所以步长一定也是正数，如果走到最后几个值的时候，步长一定是小于1并且大于0的，所以需要向上取整数
			speed=speed>0 ? Math.ceil(speed):Math.floor(speed);
			// 更新属性
			if (attr=="opacity") {
				//透明度处理兼容问题
				if(elem.style.filter){
					elem.style.filter="alpha(opacity="+(v+speed)+")";
				}else{
					elem.style["opacity"]=(v+speed)/100;
				}
			}else{
				elem.style[attr]=v+speed+"px";
				
			}
			// 判断是否到达目标点，如果到达，停止定时器，否则持续运行
			if (v!=target) {
				
				flag=false;// 属性没有到达目标值
			}
		}
		// 判断是否所有的属性都以到达目标值
		if (flag) {
			clearInterval(elem.timer);
			//判断函数参数是否存在，存在则执行
			if(fn){
				fn();
			}
		}
		
		
	},30);

}


// 求非行间样式

function getStyle(elem,attr){
	if (window.getComputedStyle) {
		return getComputedStyle(elem,null)[attr];
	}else{
		return elem.currentStyle[attr];
	}
}
