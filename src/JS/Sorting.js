import Method from "./Methods.js";

let main_canvas = document.querySelector(".main-canvas");
let nav_bar = document.querySelector(".nav-bar");

let current_opt = document.querySelector(".selection");
let num_ip = document.querySelector(".ip");

let start_btn = document.querySelector(".start");
let ran_btn = document.querySelector(".randomizer");
let stop_btn = document.querySelector(".stop");

// let num = parseInt(num_ip.value);
let data = [];

let method = new Method(parseInt(num_ip.value), data, main_canvas);
let default_num = parseInt(num_ip.value);
let ran_con = 0;
//#region Custom Selection
for (let i of method.description) {
  let tag = document.createElement("OPTION");
  let text = document.createTextNode(i);
  tag.appendChild(text);
  tag.classList.add("opts");
  // tag.value = i.match(/^(?:\w){2}/g).join("").trim() + "sort";
  tag.value = i.toLowerCase();
  current_opt.appendChild(tag);
}

// const eve = new Event("method_changed")

let wrap = document.querySelector(".option-wrap");
let l = current_opt.length;

let cur_select = document.createElement("DIV");
cur_select.setAttribute("class", "current-select");
cur_select.setAttribute("value", current_opt[0].innerHTML.toLowerCase());
cur_select.innerHTML = current_opt[0].innerHTML;

let caret = document.createElement("I");
caret.setAttribute("class", "fas fa-caret-down arrow-down");
cur_select.appendChild(caret);

wrap.appendChild(cur_select);

let select_list = document.createElement("DIV"),
  select_items = [];
select_list.setAttribute("class", "select-items");
select_list.classList.toggle("hide-items");
for (let i = 0; i < l; i++) {
  // console.log(current_opt[i]);
  select_items.push(document.createElement("DIV"));
  select_items[i].setAttribute("class", "choices");
  select_items[i].innerHTML = current_opt[i].innerHTML;
  select_items[i].addEventListener("click", () => {
    cur_select.firstChild.data = select_items[i].innerHTML;
    cur_select.setAttribute("value", select_items[i].innerHTML.toLowerCase());
    // cur_select.dispatchEvent(eve);
    method.status = 0;
    method.callBack();
  });
  select_list.appendChild(select_items[i]);
}

wrap.appendChild(select_list);

wrap.addEventListener("click", toggleList);

function toggleList() {
  cur_select.classList.toggle("active");
  select_list.classList.toggle("hide-items");
}

window.addEventListener("click", (event) => {
  // console.log(event.target);
  if (!wrap.contains(event.target) && cur_select.classList.contains("active")) {
    toggleList();
  }
});
//#endregion

//#region Events
let idle = 1;
method.callBack = function () {
  start_btn.firstChild.classList = "fas fa-play";
  idle = 1;
};
start_btn.addEventListener("click", () => {
  if(!ran_con) method.status = !method.status;
  // start_btn.innerHTML = method.status ? "Stop" : "Start";
  method.status
    ? (() => {
      if(idle === 1){
        start_btn.firstChild.classList = "fas fa-pause";
        idle = 0;
        start_sort();
      }
      })()
    : (() => {
        stop_sort();
      })();
});

window.addEventListener("resize", setup);
// cur_select.addEventListener("method_changed", change_method, false);
num_ip.addEventListener("change", () => {
  stop_sort();
  method.num = parseInt(num_ip.value);
  if (method.num < +num_ip.min || method.num > +num_ip.max || !num_ip.value) {
    num_ip.value = default_num;
    method.num = default_num;
    alert("Invalid number (Too high or too low)");
  }
  setup();
});

ran_btn.addEventListener("click", async () =>{ 
  stop_sort();
  if(!ran_con){
    ran_con = 1;
    num_ip.disabled = true;
    await method.shuffle();
    ran_con = 0;
    num_ip.disabled = false;
  }
});
stop_btn.addEventListener("click", stop_sort);
//#endregion

//#region Setup
function setup() {
  main_canvas.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  main_canvas.height =
    window.innerHeight - nav_bar.clientHeight ||
    document.documentElement.clientHeight - nav_bar.clientHeight ||
    document.body.clientHeight - nav_bar.clientHeight;
  method.c_height = main_canvas.height;
  method.c_width = main_canvas.width;

  method.setRandomData();
  for (var i = 0, l = method.data.length; i !== l; i++) {
    method.data[i][0] = ~~(i * method.col_w);
  }
  method.set_fill();
  method.showData();
}
window.addEventListener("load", setup);
//#endregion

// // let fn = '';
// function change_method() {
// 	method.status = 0;
// 	method.callBack();
// 	// fn = `method["${cur_select.getAttribute("value").toLowerCase()}"]()`;
// }
// change_method();

async function start_sort() {
  if (method.num >= +num_ip.min){
    console.clear();
    //Start Timer
    const start = new Date().getTime();
    console.log(`Start: ${start}`);

    await method[cur_select.getAttribute("value").toLowerCase()]?.();

    //End Timer
    const end = new Date().getTime();
    console.log(`End: ${end}`);
    console.log(`Time taken: ${end - start}ms`); //Time taken

    method.callBack();
  }
  // start_btn.removeEventListener("click", start_sort);
  // method.Isort();
  // start_btn.addEventListener("click", start_sort);
}

function stop_sort() {
  method.status = 0;
  method.callBack();
}
