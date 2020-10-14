let canvas = document.querySelector("canvas");
let nav_bar = document.querySelector(".nav-bar");
let start_btn = document.querySelector(".start");

let num = 100;
let data = [];

let method = new Method(canvas.getContext("2d"),num,data,canvas);

start_btn.addEventListener("click", start_sort);
window.addEventListener("resize", setup);

function setup(){
	canvas.width = window.innerWidth;
 	canvas.height =	window.innerHeight - nav_bar.offsetHeight;
 	method.c_height = canvas.height;
	method.c_width = canvas.width;

	if(method.data.length == 0) method.setRandomData();	
	method.updatePara();

	method.c.fillStyle = "#ffffff";
	method.showData();
}
setup();

function start_sort(){
	start_btn.removeEventListener("click", start_sort);
	method.BBsort();
	start_btn.addEventListener("click", start_sort);
}
