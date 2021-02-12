import * as VisualTools from "./Visual.js";

let main_canvas = document.querySelector(".main-canvas");
let nav_bar = document.querySelector(".nav-bar");
let p_nav_h = nav_bar.clientHeight;

let num_ip = document.querySelector(".ip");

let start_btn = document.querySelector("#start");
let ran_btn = document.querySelector("#randomizer");
let stop_btn = document.querySelector("#stop");
let shuffle_btn = document.querySelector("#shuffle");

let options = document.querySelector(".option-wrap");
let modes = document.querySelector(".modes-wrap")

let mode_names = [];
let mode_obj = {}
for(let i in VisualTools){
  mode_names.push(VisualTools[i].modeName);
  mode_obj[VisualTools[i].modeName.toLowerCase()] = VisualTools[i];
}
let visual = new mode_obj["bar graph"](parseInt(num_ip.value), main_canvas);
let default_num = parseInt(num_ip.value);
let ran_con = 0;
//#region Custom Selections

let cur_select = document.createElement("DIV");
cur_select.setAttribute("class", "current-select");
cur_select.setAttribute("tabindex", 1);
cur_select.setAttribute("title", "Choose an algorithm");
cur_select.setAttribute(
  "value",
  visual.description["Bubble Sort"][0].toLowerCase()
);
cur_select.innerHTML = visual.description["Bubble Sort"][0];

let caret = document.createElement("I");
caret.setAttribute("class", "fas fa-angle-down arrow-down");
cur_select.appendChild(caret);

options.appendChild(cur_select);

let parent_select_list = document.createElement("DIV");
parent_select_list.setAttribute("class", "select-items__parent");


let select_list = document.createElement("DIV");
select_list.setAttribute("class", "select-items");
select_list.classList.toggle("hide-items");

function createChoice(text = "", container, class_name = "choices", _arrow = 0) {
  let _text = document.createTextNode(text);
  let _div = document.createElement("DIV");
  _div.appendChild(_text);
  if (class_name) _div.setAttribute("class", class_name);
  container.appendChild(_div);
  if (_arrow) {
    let caret_2 = document.createElement("I");
    caret_2.setAttribute("class", "fas fa-caret-right sub-arrow-down");
    _div.appendChild(caret_2);
  }
  return _div;
}

for (let i in visual.description) {
  
  if (visual.description[i].length === 1) createChoice(i, select_list);
  else {
    let sub = createChoice(undefined, select_list, "sub-select");
    createChoice(i, sub, "choices sub-select__front", 1);
    
    let sub_items = createChoice(undefined, sub, "sub-select__items");
    for (let j of visual.description[i]) {
      createChoice(j, sub_items);
    }
  }
}
// parent_select_list.appendChild(select_list);
options.appendChild(select_list);
//#endregion

//#region Mode Options
let cur_mode = document.createElement("DIV");
cur_mode.setAttribute('class', 'cur-mode')
cur_mode.setAttribute("tabindex", 1);
cur_mode.setAttribute("title", "Choose a display mode");
cur_mode.setAttribute(
  "value",
  mode_names[0]
);
cur_mode.innerHTML = mode_names[0];
let mode_caret = document.createElement("I");
mode_caret.setAttribute("class", "fas fa-angle-down arrow-down");
cur_mode.appendChild(mode_caret);

modes.appendChild(cur_mode);

let modes_list = document.createElement("DIV");
modes_list.setAttribute("class", "mode-items");
modes_list.classList.toggle("hide-items");

//#region Color Mode & Dot Mode Checker
let color_checker_con = document.createElement("DIV");
color_checker_con.classList.add("color-checker");
color_checker_con.setAttribute("title", "Change to color mode");
let color_checker = document.createElement("INPUT");
color_checker.type = "checkbox";
color_checker.id = "Color Mode";

let lb = document.createElement("LABEL");
lb.htmlFor = "Color Mode";
lb.appendChild(document.createTextNode("Color Mode"));

color_checker_con.append(color_checker);
color_checker_con.appendChild(lb);
modes_list.appendChild(color_checker_con);

let dot_checker_con = document.createElement("DIV");
dot_checker_con.classList.add("dot-checker");
dot_checker_con.setAttribute("title", "Change to dot mode");
let dot_checker = document.createElement("INPUT");
dot_checker.type = "checkbox";
dot_checker.id = "Dot Mode";

let lbd = document.createElement("LABEL");
lbd.htmlFor = "Dot Mode";
lbd.appendChild(document.createTextNode("Dot Mode"));

dot_checker_con.append(dot_checker);
dot_checker_con.appendChild(lbd);
modes_list.appendChild(dot_checker_con);
//#endregion
for (let i of mode_names) {
  createChoice(i, modes_list, "m-choices");
}
modes.appendChild(modes_list);

function keepModeStatus() {
  if (color_checker.checked) visual.isColor = true;
  else visual.isColor = false;
  if (dot_checker.checked) visual.isDot = true;
  else visual.isDot = false;
}
//#endregion

//#region Events
let caret_rotated = 0;
function toggleOptList() {
  cur_select.classList.toggle("active");
  select_list.classList.toggle("hide-items");
  caret.style.transform = caret_rotated ? `rotate(0deg)` : `rotate(-180deg)`;
  caret_rotated = !caret_rotated;
  let sub_select = select_list.querySelectorAll(".sub-select__items");
  for (let i = sub_select.length; i--; )
    if (!sub_select[i].classList.contains("hide-items"))
      sub_select[i].classList.add("hide-items");
}
cur_select.addEventListener("click", toggleOptList);

let mode_caret_rotated = 0;
function toggleModeList() {
  cur_mode.classList.toggle("active");
  modes_list.classList.toggle("hide-items");
  mode_caret.style.transform = mode_caret_rotated ? `rotate(0deg)` : `rotate(-180deg)`;
  mode_caret_rotated = !mode_caret_rotated;
  // let sub_select = select_list.querySelectorAll(".sub-select__items");
  // for (let i = sub_select.length; i--; )
  //   if (!sub_select[i].classList.contains("hide-items"))
  //     sub_select[i].classList.add("hide-items");
}
cur_mode.addEventListener("click", toggleModeList);

let choices = document.querySelectorAll(".choices");
for (let i of choices) {
  if (i.classList.contains("sub-select__front"))
    i.addEventListener("click", () => {
      let sub_select = select_list.querySelectorAll(".sub-select__items");
      
      for (let j = sub_select.length; j--; ) {
        if (
          !sub_select[j].classList.contains("hide-items") &&
          !sub_select[j].isEqualNode(i.nextSibling)
        ) {
          sub_select[j].classList.add("hide-items");
        }
      }
      i.parentNode
        .querySelector(".sub-select__items")
        .classList.toggle("hide-items");
      stop_sort();
    });
  else
    i.addEventListener("click", () => {
      cur_select.firstChild.data = i.innerHTML;
      cur_select.setAttribute("value", i.innerHTML.toLowerCase());
      toggleOptList();
      stop_sort();
    });
}
let m_choices = document.querySelectorAll(".m-choices");
async function change_mode(i) {
  cur_mode.firstChild.data = i.innerHTML;
  let new_mode = i.innerHTML.toLowerCase();
  cur_mode.setAttribute("value", new_mode);
  toggleModeList();
  await stop_sort();
  visual = new mode_obj[new_mode](parseInt(num_ip.value), main_canvas);
  reset_callBack();
  keepModeStatus();
  setup();
}
for (let i of m_choices) {
  i.addEventListener("click", () => {
    change_mode(i);
  }, false);
}
window.addEventListener("click", (event) => {
  if (!options.contains(event.target) && cur_select.classList.contains("active")) {
    toggleOptList();
  }
  if (
    !modes.contains(event.target) &&
    cur_mode.classList.contains("active")
  ) {
    toggleModeList();
  }
});

let idle = 1;
function reset_callBack() {
  visual.callBack = function () {
    start_btn.firstElementChild.classList = "fas fa-play";
    start_btn.setAttribute("title", "Start");
    idle = 1;
  };
}
reset_callBack();
start_btn.addEventListener("click", async () => {
  if (!ran_con){
    
    if (!visual.status && idle) {
      start_btn.firstElementChild.classList = "fas fa-pause";
      start_btn.setAttribute("title", "Pause");
      idle = 0;
      start_sort();
    } 
    else{
      visual.status = true;
      visual.isPause = !visual.isPause;
      start_btn.firstElementChild.classList = visual.isPause
        ? "fas fa-play"
        : "fas fa-pause";
      start_btn.setAttribute("title", visual.isPause ? "Start" : "Pause");
    }
  }
});

window.addEventListener("resize", () => {
  if (
      window.outerWidth - window.innerWidth < 100 ||
      window.outerHeight - window.innerHeight < 200 ||
      nav_bar.clientHeight !== p_nav_h
  ){
    p_nav_h = nav_bar.clientHeight;
    setup(0);
  }
});

num_ip.addEventListener("change", async () => {
  stop_sort();
  visual.num = parseInt(num_ip.value);
  if (visual.num < +num_ip.min || visual.num > +num_ip.max || !num_ip.value) {
    num_ip.value = default_num;
    visual.num = default_num;
    alert("Invalid number (Too high or too low)");
  }
  setup();
});

ran_btn.addEventListener("click", async () => {
  if (!ran_con) {
    await stop_sort();
    ran_con = 1;
    num_ip.disabled = true;
    await visual.randomize();
    ran_con = 0;
    num_ip.disabled = false;
  }
});
stop_btn.addEventListener("click", () => stop_sort());
shuffle_btn.addEventListener("click", () => {
  (async function () {
    if(!ran_con){
      ran_con = 1;
      await stop_sort();
      await visual.shuffle();
      ran_con = 0;
    }
  })();
});

color_checker.addEventListener("change", () => {
  if (color_checker.checked) visual.isColor = true;
  else visual.isColor = false;
  setup(0);
});
dot_checker.addEventListener("change", () => {
  if (dot_checker.checked) visual.isDot = true;
  else visual.isDot = false;
  setup(0);
});

color_checker_con.addEventListener("click", (event) => {
  if (
    !color_checker.contains(event.target) &&
    !lb.contains(event.target)
  ) {
    color_checker.checked = !color_checker.checked;
    if (color_checker.checked) visual.isColor = true;
    else visual.isColor = false;
    setup(0);
  }
}, true);
dot_checker_con.addEventListener("click", (event) => {
  if (
    !dot_checker.contains(event.target) &&
    !lbd.contains(event.target)
  ) {
    dot_checker.checked = !dot_checker.checked;
    if (dot_checker.checked) visual.isDot = true;
    else visual.isDot = false;
    setup(0);
  }
}, true);
//#endregion

//#region Setup
let default_width = window.outerWidth;
function setup(anim = 1) {
  main_canvas.width = default_width;
  main_canvas.height = window.innerHeight - nav_bar.clientHeight;
  main_canvas.height -= 5 ;
  visual.c_height = main_canvas.height;
  visual.c_width = main_canvas.width;

  visual.update(anim);
}
window.addEventListener("load", setup);
//#endregion

async function start_sort() {
  if (visual.num >= +num_ip.min) {
    console.clear();
    //Start Timer
    const start = new Date().getTime();
    console.log(`Start: ${start}`);

    await visual.startSort(cur_select.getAttribute("value").toLowerCase());
    //End Timer
    const end = new Date().getTime();
    console.log(`End: ${end}`);
    console.log(`Time taken: ${end - start}ms`); //Time taken
    // visual.callBack();
  }
}
async function stop_sort() {
  await visual.stopSort();
}
