// import Method from "/Methods.js";


let nav_bar = document.querySelector(".nav-bar");
let start_btn = document.querySelector(".start");
let current_opt = document.querySelector(".selection");
let num_ip = document.querySelector(".ip");

// let num = parseInt(num_ip.value);
let data = [];

let method = new Method(parseInt(num_ip.value),data,canvas);

// method.description = Object.getOwnPropertyNames(Method.prototype);
// method.description.shift();
// console.log(method.description);
for(let i of method.description){
	let tag = document.createElement("OPTION");
	let text = document.createTextNode(i);
	tag.appendChild(text)
	tag.value = i.match(/\b([^S])/g).join("").trim() + "sort";
	current_opt.appendChild(tag);
}
start_btn.addEventListener("click", start_sort);
window.addEventListener("resize", setup);
current_opt.addEventListener("change", change_method)
num_ip.addEventListener("change", () => { method.num = parseInt(num_ip.value); setup();})

function setup(){
	canvas.width = window.innerWidth;
 	canvas.height =	window.innerHeight - nav_bar.offsetHeight;
 	method.c_height = canvas.height;
	method.c_width = canvas.width;

	
	method.setRandomData();	
	method.updatePara();

	c.fillStyle = "#ffffff";
	method.showData();
}
setup();

let fn = '';
function change_method() {
	method.status = 0;
	fn = "method." + current_opt.value.toLowerCase() + "()";
	// console.log(fn);
}
change_method();

function start_sort(){
	if(!method.status){
		cancelAnimationFrame(method.req);
		Function(fn)();
	}
	// start_btn.removeEventListener("click", start_sort);
	// method.Isort();
	// start_btn.addEventListener("click", start_sort);
}

