import * as VisualTools from "./Visual.js";

let main_canvas = document.querySelector(".main-canvas");
let nav_bar = document.querySelector(".nav-bar");

let num_ip = document.querySelector(".ip");

let start_btn = document.querySelector("#start");
let ran_btn = document.querySelector("#randomizer");
let stop_btn = document.querySelector("#stop");
let shuffle_btn = document.querySelector("#shuffle");

let visual = new VisualTools.ColumnVisual(parseInt(num_ip.value), main_canvas);
let default_num = parseInt(num_ip.value);
let ran_con = 0;
//#region Custom Selections

let wrap = document.querySelector(".option-wrap");

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
caret.setAttribute("class", "fas fa-caret-down arrow-down");
cur_select.appendChild(caret);

wrap.appendChild(cur_select);

let select_list = document.createElement("DIV");
select_list.setAttribute("class", "select-items");
select_list.classList.toggle("hide-items");

function createChoice(text = "", container, class_name = "choices") {
  let _text = document.createTextNode(text);
  let _div = document.createElement("DIV");
  _div.appendChild(_text);
  if (class_name) _div.setAttribute("class", class_name);
  container.appendChild(_div);
  return _div;
}
for (let i in visual.description) {
  if (visual.description[i].length === 1) createChoice(i, select_list);
  else {
    let sub = createChoice(undefined, select_list, "sub-select-container");
    createChoice(i, sub, "choices sub-select");
    let sub_items = createChoice(undefined, sub, "sub-select-items");
    for (let j of visual.description[i]) {
      createChoice(j, sub_items);
    }
  }
}
wrap.appendChild(select_list);
//#endregion

//#region Events
let caret_rotated = 0;
function toggleList() {
  cur_select.classList.toggle("active");
  select_list.classList.toggle("hide-items");
  caret.style.transform = caret_rotated ? `rotate(0deg)` : `rotate(-180deg)`;
  caret_rotated = !caret_rotated;
  let sub_select = select_list.querySelectorAll(".sub-select-items");
  for (let i = sub_select.length; i--; )
    if (!sub_select[i].classList.contains("hide-items"))
      sub_select[i].classList.add("hide-items");
}
cur_select.addEventListener("click", toggleList);
let choices = document.querySelectorAll(".choices");
for (let i of choices) {
  if (i.classList.contains("sub-select"))
    i.addEventListener("click", () => {
      let sub_select = select_list.querySelectorAll(".sub-select-items");
      
      for (let j = sub_select.length; j--; ) {
        if (
          !sub_select[j].classList.contains("hide-items") &&
          !sub_select[j].isEqualNode(i.nextSibling)
        ) {
          sub_select[j].classList.add("hide-items");
        }
      }
      i.parentNode
        .querySelector(".sub-select-items")
        .classList.toggle("hide-items");
      stop_sort();
    });
  else
    i.addEventListener("click", () => {
      cur_select.firstChild.data = i.innerHTML;
      cur_select.setAttribute("value", i.innerHTML.toLowerCase());
      toggleList();
      stop_sort();
    });
}

window.addEventListener("click", (event) => {
  if (!wrap.contains(event.target) && cur_select.classList.contains("active")) {
    toggleList();
  }
});

let idle = 1;
visual.callBack = function () {
  start_btn.firstElementChild.classList = "fas fa-play";
  start_btn.setAttribute("title", "Start");
  idle = 1;
};
start_btn.addEventListener("click", async () => {
  if (!ran_con) visual.status = !visual.status;
  // start_btn.innerHTML = visual.status ? "Stop" : "Start";
  if (visual.status && idle) {
    start_btn.firstElementChild.classList = "fas fa-pause";
    start_btn.setAttribute("title", "Pause");
    idle = 0;
    start_sort();
  } else {
    await stop_sort();
  }
});

window.addEventListener("resize", () => {
  if (
    !(
      window.outerWidth - window.innerWidth > 100 ||
      window.outerHeight - window.innerHeight > 200
    )
  )
    setup(0);
});

num_ip.addEventListener("change", async () => {
  await stop_sort();
  visual.num = parseInt(num_ip.value);
  if (visual.num < +num_ip.min || visual.num > +num_ip.max || !num_ip.value) {
    num_ip.value = default_num;
    visual.num = default_num;
    alert("Invalid number (Too high or too low)");
  }
  setup();
});

ran_btn.addEventListener("click", async () => {
  await stop_sort();
  if (!ran_con) {
    ran_con = 1;
    num_ip.disabled = true;
    await visual.randomize();
    ran_con = 0;
    num_ip.disabled = false;
  }
});
stop_btn.addEventListener("click", () => stop_sort());
shuffle_btn.addEventListener("click", async () => {
  await stop_sort();
  if(!ran_con) await visual.shuffle();
});
//#endregion

//#region Setup
function setup(anim = 1) {
  main_canvas.width =
    window.outerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  main_canvas.height =
    window.innerHeight - nav_bar.clientHeight ||
    document.documentElement.clientHeight - nav_bar.clientHeight ||
    document.body.clientHeight - nav_bar.clientHeight;
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

    // await visual[cur_select.getAttribute("value").toLowerCase()]?.();
    await visual.startSort(cur_select.getAttribute("value").toLowerCase());
    //End Timer
    const end = new Date().getTime();
    console.log(`End: ${end}`);
    console.log(`Time taken: ${end - start}ms`); //Time taken
    visual.callBack();
  }
}
async function stop_sort() {
  await visual.stopSort();
}
