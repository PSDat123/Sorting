// import Method from "/Methods.js";

let nav_bar = document.querySelector(".nav-bar");
let start_btn = document.querySelector(".start");
let current_opt = document.querySelector(".selection");
let num_ip = document.querySelector(".ip");

// let num = parseInt(num_ip.value);
let data = [];

let method = new Method(parseInt(num_ip.value),data,canvas);
let default_num = parseInt(num_ip.value); 
// method.description = Object.getOwnPropertyNames(Method.prototype);
// method.description.shift();
// console.log(method.description);
for(let i of method.description){
	let tag = document.createElement("OPTION");
	let text = document.createTextNode(i);
	tag.appendChild(text)
	tag.classList.add("opts");
	// tag.value = i.match(/^(?:\w){2}/g).join("").trim() + "sort";
	tag.value = i.toLowerCase();
	current_opt.appendChild(tag);
}

start_btn.addEventListener("click", () =>{
	method.status = !method.status;
	// start_btn.innerHTML = method.status ? "Stop" : "Start";
	method.status ? (() => { 
		start_btn.firstChild.classList = "fas fa-pause";
		start_btn.lastChild.data = " STOP";
		start_sort();
	})() : (()=>{
		start_btn.firstChild.classList = "fas fa-play";
		start_btn.lastChild.data = " START";
		stop_sort();
	})();
	
});
method.callBack = function() {
	start_btn.firstChild.classList = "fas fa-play";
	start_btn.lastChild.data = " START";
}
window.addEventListener("resize", setup);
current_opt.addEventListener("change", change_method);
num_ip.addEventListener("change", () => { 
	stop_sort();
	method.num = parseInt(num_ip.value);
	if (method.num < +num_ip.min || method.num > +num_ip.max){ 
		num_ip.value = default_num;
		method.num = default_num;
		alert("Invalid number (Too high or too low)");
	}
	setup();
});

function setup(){
	canvas.width = window.innerWidth;
 	canvas.height =	window.innerHeight - nav_bar.offsetHeight;
 	method.c_height = canvas.height;
	method.c_width = canvas.width;
	
	method.setRandomData();	
	method.updatePara();

	method.set_default_fill();
	method.showData();
}
setup();

let fn = '';
function change_method() {
	method.status = 0;
	fn = `method["${current_opt.value.toLowerCase()}"]?.()`;
	// console.log(fn);
}
change_method();

function start_sort(){
	if(method.num >= +num_ip.min){
		cancelAnimationFrame(method.req);
		Function(fn)();
	}
	// start_btn.removeEventListener("click", start_sort);
	// method.Isort();
	// start_btn.addEventListener("click", start_sort);
}

function stop_sort() {
	cancelAnimationFrame(method.req);
	method.status = 0;
}

