// import Method from "/Methods.js";


start_btn.addEventListener("click", () =>{
	method.status = !method.status;
	// start_btn.innerHTML = method.status ? "Stop" : "Start";
	method.status ? (() => { 
		start_btn.firstChild.classList = "fas fa-pause";
		start_btn.lastChild.data = " STOP";
		start_sort();
	})() : (()=>{
		stop_sort();
	})();
	
});
method.callBack = function() {
	start_btn.firstChild.classList = "fas fa-play";
	start_btn.lastChild.data = " START";
}
window.addEventListener("resize", setup);
cur_select.addEventListener("method_changed", change_method, false);
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
	method.callBack();
	fn = `method["${cur_select.getAttribute("value").toLowerCase()}"]?.()`;
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
	method.callBack();
}

