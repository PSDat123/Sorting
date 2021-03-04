import * as VisualTools from "./Visual.js";

let main_canvas = document.querySelector(".main-canvas");
let nav_bar = document.querySelector(".nav-bar");
let p_nav_h = 0;
let p_inner_h = 0;

let num_ip = document.querySelector(".ip");

let start_btn = document.querySelector("#start");
let ran_btn = document.querySelector("#randomizer");
let stop_btn = document.querySelector("#stop");
let shuffle_btn = document.querySelector("#shuffle");
let setting_btn = document.querySelector("#settings");

let options = document.querySelector(".option-wrap");
let modes = document.querySelector(".modes-wrap");

let mode_names = [];
let mode_obj = {};
let root = document.documentElement;
for (let i in VisualTools) {
  mode_names.push(VisualTools[i].modeName);
  mode_obj[VisualTools[i].modeName.toLowerCase()] = VisualTools[i];
}
let visual = new mode_obj["bar graph"](
  parseInt(num_ip.value),
  main_canvas,
  getComputedStyle(root).getPropertyValue("--primary-color")
);
let default_num = parseInt(num_ip.value);
let ran_con = 0;

//#region Settings
let setting_list = ["Speed", "Theme"];
let setting_con = (() => {
  let content = document.createElement("DIV");
  content.setAttribute("class", "setting-con");
  content.setAttribute("id", "setting");
  content.classList.toggle("hide-items");

  let setting_header = document.createElement("DIV");
  setting_header.setAttribute("class", "setting-header");
  setting_header.setAttribute("id", "setting-header");

  let back = document.createElement("I");
  back.setAttribute("class", "fas fa-arrow-left back");
  setting_header.appendChild(back);

  setting_header.appendChild(document.createTextNode("SETTINGS"));

  let exit = document.createElement("I");
  exit.setAttribute("class", "fas fa-times exit");
  setting_header.appendChild(exit);

  exit.addEventListener("click", () => {
    content.classList.toggle("hide-items");
  });
  back.addEventListener("click", () => {
    let child = setting_con.childNodes;
    for (const i of child) {
      if (i.id !== "setting-header") i.classList.add("hide-items");
      if (i.id === "setting-opts") i.classList.remove("hide-items");
    }
  });
  content.appendChild(setting_header);
  return content;
})();

let setting_elms = {};
let setting_opts = document.createElement("DIV");
setting_opts.setAttribute("class", "setting-opts");
setting_opts.setAttribute("id", "setting-opts");
for (const i of setting_list) {
  let content = document.createElement("DIV");
  content.setAttribute("class", `setting-choices ${i}`);
  content.innerHTML = i;
  setting_elms[i] = content;
}
let setting_content = {};

//#region Speed changer
setting_content[setting_list[0]] = (() => {
  let content = document.createElement("DIV");
  content.setAttribute("class", "speed-changer hide-items");

  //#region info box
  let info_con = document.createElement("DIV");
  info_con.setAttribute("class", "info-con");
  let parag1 = document.createElement("P");
  let parag2 = document.createElement("P");
  let parag3 = document.createElement("P");
  parag1.appendChild(document.createTextNode("30fps ~~ 33.33ms"));
  parag2.appendChild(document.createTextNode("40fps ~~ 25ms"));
  parag3.appendChild(document.createTextNode("60fps ~~ 16.67ms"));
  info_con.appendChild(parag1);
  info_con.appendChild(parag2);
  info_con.appendChild(parag3);
  //#endregion

  //#region Smooth
  let smooth_con = document.createElement("DIV");
  smooth_con.setAttribute("class", "smooth-con");
  let smooth_btn = document.createElement("INPUT");
  let smooth_lb = document.createElement("LABEL");
  smooth_btn.type = "checkbox";
  smooth_btn.id = "smooth-opt";
  smooth_lb.htmlFor = "smooth-opt";
  smooth_lb.appendChild(document.createTextNode("OPTIMIZED"));
  smooth_lb.setAttribute(
    "title",
    "Optimize animations to make them smoother and more resource efficient"
  );
  smooth_btn.checked = true;
  smooth_con.appendChild(document.createElement("HR"));
  smooth_con.appendChild(smooth_lb);
  smooth_con.appendChild(smooth_btn);
  //#endregion
  info_con.appendChild(smooth_con);
  //#region input box
  let input_con = document.createElement("DIV");
  input_con.setAttribute("class", "input-con");
  let input = document.createElement("INPUT");
  input.setAttribute("id", "ip");
  input.setAttribute("value", "33.33");
  let ip_lb = document.createElement("LABEL");
  ip_lb.htmlFor = "ip";
  ip_lb.appendChild(document.createTextNode("Delay"));
  let unit = document.createElement("P");
  unit.appendChild(document.createTextNode("ms"));

  input.disabled = true;
  input.addEventListener("change", () => {
    if (+input.value < 0) {
      alert("Invalid value, enter a new one");
      input.value = 33.33;
    }
    visual.speed = +input.value;
  });
  smooth_btn.addEventListener("change", () => {
    input.disabled = !input.disabled;
    if (smooth_btn.checked) {
      visual.speed = 0;
    } else visual.speed = +input.value;
  });

  input_con.appendChild(ip_lb);
  input_con.appendChild(input);
  input_con.appendChild(unit);
  //#endregion

  content.appendChild(info_con);
  content.appendChild(input_con);
  return content;
})();
//#endregion

//#region Theme changer
setting_content[setting_list[1]] = (() => {
  let content = document.createElement("DIV");
  content.setAttribute("class", "theme-changer hide-items");

  let primary_con = document.createElement("DIV");
  primary_con.setAttribute("class", "color-ip");
  let primary = document.createElement("INPUT");
  primary.id = "primary";
  primary.type = "color";
  primary.setAttribute(
    "value",
    getComputedStyle(root).getPropertyValue("--primary-color")
  );
  let plb = document.createElement("LABEL");
  plb.htmlFor = "primary";
  plb.appendChild(document.createTextNode("Primary Color: "));
  primary_con.appendChild(plb);
  primary_con.appendChild(primary);

  let secondary_con = document.createElement("DIV");
  secondary_con.setAttribute("class", "color-ip");
  let secondary = document.createElement("INPUT");
  secondary.id = "secondary";
  secondary.type = "color";
  secondary.setAttribute(
    "value",
    getComputedStyle(root).getPropertyValue("--secondary-color")
  );
  let slb = document.createElement("LABEL");
  slb.htmlFor = "secondary";
  slb.appendChild(document.createTextNode("Secondary Color: "));
  secondary_con.appendChild(slb);
  secondary_con.appendChild(secondary);

  let accent_con = document.createElement("DIV");
  accent_con.setAttribute("class", "color-ip");
  let accent = document.createElement("INPUT");
  accent.id = "accent";
  accent.type = "color";
  accent.setAttribute(
    "value",
    getComputedStyle(root).getPropertyValue("--accent-color")
  );
  let alb = document.createElement("LABEL");
  alb.htmlFor = "accent";
  alb.appendChild(document.createTextNode("Accent Color: "));
  accent_con.appendChild(alb);
  accent_con.appendChild(accent);

  let is_data_color_con = document.createElement("DIV");
  is_data_color_con.setAttribute("class", "color-ip");
  let is_data_color = document.createElement("INPUT");
  is_data_color.type = "checkbox";
  is_data_color.id = "data_color_opt";
  let dlb = document.createElement("LABEL");
  dlb.htmlFor = "data_color_opt";
  dlb.appendChild(document.createTextNode("Change Color Of Data?"));
  is_data_color_con.appendChild(dlb);
  is_data_color_con.appendChild(is_data_color);

  is_data_color.addEventListener("change", () => {
    if (is_data_color.checked) {
      visual.def_color = primary.value;
      setup(0);
    } else {
      visual.def_color = "#f0f0f0";
      setup(0);
    }
  });
  primary.addEventListener("change", () => {
    root.style.setProperty("--primary-color", primary.value);
    if (is_data_color.checked) {
      visual.def_color = primary.value;
      setup(0);
    }
  });
  secondary.addEventListener("change", () => {
    root.style.setProperty("--secondary-color", secondary.value);
  });
  accent.addEventListener("change", () => {
    root.style.setProperty("--accent-color", accent.value);
  });

  content.appendChild(primary_con);
  content.appendChild(secondary_con);
  content.appendChild(accent_con);
  content.appendChild(is_data_color_con);
  return content;
})();
//#endregion

// console.log(setting_content);
for (const i in setting_elms) {
  setting_opts.appendChild(setting_elms[i]);
  setting_elms[i].addEventListener("click", () => {
    setting_content[i]?.classList.toggle("hide-items");
    setting_opts.classList.toggle("hide-items");
  });
  setting_con.appendChild(setting_content[i]);
}
setting_con.appendChild(setting_opts);

document.body.appendChild(setting_con);
dragElement(setting_con);

function dragElement(elmnt) {
  //Got this from w3school, too lazy to do it myself
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "-header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "-header").onmousedown = dragMouseDown;
  }
  // else {
  //   // otherwise, move the DIV from anywhere inside the DIV:
  //   elmnt.onmousedown = dragMouseDown;
  // }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
setting_btn.addEventListener("click", () => {
  setting_con.classList.toggle("hide-items");
});
//#endregion

//#region Custom Selections
let opt_pages = [];
let cur_page = 1;
let max_items_inpage = 9;
for (let i = 0, a = Object.keys(visual.description), l = a.length; i < l; i++) {
  if (i % max_items_inpage === 0) {
    opt_pages.push([]);
  }
  opt_pages[~~(i / max_items_inpage)].push(a[i]);
}

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

function createChoice(
  text = "",
  container,
  class_name = "choices",
  _arrow = 0
) {
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

let page_list = [];
for (let j = 0; j < opt_pages.length; j++) {
  let page = document.createElement("DIV");
  page.setAttribute("class", `page${j + 1}`);
  page.classList.toggle("hide-items");
  page_list.push(page);

  for (let i = 0; i < opt_pages[j].length; i++) {
    if (visual.description[opt_pages[j][i]].length === 1)
      createChoice(opt_pages[j][i], page);
    else {
      let sub = createChoice(undefined, page, "sub-select");
      createChoice(opt_pages[j][i], sub, "choices sub-select__front", 1);

      let sub_items = createChoice(undefined, sub, "sub-select__items");
      for (let k of visual.description[opt_pages[j][i]]) {
        createChoice(k, sub_items);
      }
    }
  }
  select_list.appendChild(page);
}
let p_switcher = document.createElement("DIV");
p_switcher.setAttribute("class", "page-switch");
let toleft = document.createElement("BUTTON");
toleft.setAttribute("class", "page-btn");
toleft.setAttribute("title", "To previous page");
let left_arrow = document.createElement("I");
left_arrow.setAttribute("class", "fas fa-angle-left");
toleft.appendChild(left_arrow);

let page_num = document.createElement("DIV");
page_num.setAttribute("class", "page-num");
let page_num_p = document.createElement("P");
function updatePageNum() {
  page_num_p.innerHTML = `${cur_page}/${opt_pages.length}`;
}
updatePageNum();
page_num.appendChild(page_num_p);

let toright = document.createElement("BUTTON");
toright.setAttribute("class", "page-btn");
toright.setAttribute("title", "To next page");
let right_arrow = document.createElement("I");
right_arrow.setAttribute("class", "fas fa-angle-right");
toright.appendChild(right_arrow);

p_switcher.appendChild(toleft);
p_switcher.appendChild(page_num);
p_switcher.appendChild(toright);

select_list.appendChild(p_switcher);

options.appendChild(select_list);
//#endregion

//#region Mode Options
let cur_mode = document.createElement("DIV");
cur_mode.setAttribute("class", "cur-mode");
cur_mode.setAttribute("tabindex", 1);
cur_mode.setAttribute("title", "Choose a display mode");
cur_mode.setAttribute("value", mode_names[0]);
cur_mode.innerHTML = mode_names[0];
let mode_caret = document.createElement("I");
mode_caret.setAttribute("class", "fas fa-angle-down arrow-down");
cur_mode.appendChild(mode_caret);

modes.appendChild(cur_mode);

let modes_list = document.createElement("DIV");
modes_list.setAttribute("class", "mode-items");
modes_list.classList.toggle("hide-items");

//#region Color Mode & Dot Mode & Line Mode Checker

//#region Color Mode
let color_checker_con = document.createElement("DIV");
color_checker_con.classList.add("color-checker");
color_checker_con.setAttribute("title", "Change to color mode");
let color_checker = document.createElement("INPUT");
color_checker.type = "checkbox";
color_checker.id = "Color Mode";

let lb = document.createElement("LABEL");
lb.htmlFor = "Color Mode";
lb.appendChild(document.createTextNode("Color Mode"));

color_checker_con.appendChild(color_checker);
color_checker_con.appendChild(lb);
modes_list.appendChild(color_checker_con);
//#endregion

//#region Dot Mode
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

//#region Line Mode
let line_checker_con = document.createElement("DIV");
line_checker_con.classList.add("line-checker");
line_checker_con.setAttribute("title", "Change to line mode");
let line_checker = document.createElement("INPUT");
line_checker.type = "checkbox";
line_checker.id = "Line Mode";

let lbl = document.createElement("LABEL");
lbl.htmlFor = "Line Mode";
lbl.appendChild(document.createTextNode("Line Mode"));

line_checker_con.append(line_checker);
line_checker_con.appendChild(lbl);
modes_list.appendChild(line_checker_con);
//#endregion

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
  if (line_checker.checked) visual.isLine = true;
  else visual.isLine = false;
}
//#endregion

//#region Events
let caret_rotated = 0;
function toggleOptList() {
  cur_select.classList.toggle("active");
  select_list.classList.toggle("hide-items");
  page_list[cur_page - 1].classList.toggle("hide-items");
  caret.style.transform = caret_rotated ? `rotate(0deg)` : `rotate(-180deg)`;
  caret_rotated = !caret_rotated;
  let sub_select = select_list.querySelectorAll(".sub-select__items");
  for (let i = sub_select.length; i--; )
    if (!sub_select[i].classList.contains("hide-items"))
      sub_select[i].classList.add("hide-items");
}
cur_select.addEventListener("click", toggleOptList);

toleft.addEventListener("click", () => {
  page_list[cur_page - 1].classList.toggle("hide-items");
  if (cur_page === 1) cur_page = opt_pages.length;
  else cur_page--;
  updatePageNum();
  page_list[cur_page - 1].classList.toggle("hide-items");
});
toright.addEventListener("click", () => {
  page_list[cur_page - 1].classList.toggle("hide-items");
  if (cur_page === opt_pages.length) cur_page = 1;
  else cur_page++;
  updatePageNum();
  page_list[cur_page - 1].classList.toggle("hide-items");
});

let mode_caret_rotated = 0;
function toggleModeList() {
  cur_mode.classList.toggle("active");
  modes_list.classList.toggle("hide-items");
  mode_caret.style.transform = mode_caret_rotated
    ? `rotate(0deg)`
    : `rotate(-180deg)`;
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
  let p_speed = visual.speed;
  visual = new mode_obj[new_mode](
    parseInt(num_ip.value),
    main_canvas,
    getComputedStyle(root).getPropertyValue("--primary-color")
  );
  visual.speed = p_speed;
  reset_callBack();
  keepModeStatus();
  setup();
}
for (let i of m_choices) {
  i.addEventListener(
    "click",
    () => {
      change_mode(i);
    },
    false
  );
}
window.addEventListener("click", (event) => {
  if (
    !options.contains(event.target) &&
    cur_select.classList.contains("active")
  ) {
    toggleOptList();
  }
  if (!modes.contains(event.target) && cur_mode.classList.contains("active")) {
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
  if (!ran_con) {
    if (!visual.status && idle) {
      start_btn.firstElementChild.classList = "fas fa-pause";
      start_btn.setAttribute("title", "Pause");
      idle = 0;
      start_sort();
    } else {
      visual.status = true;
      visual.isPause = !visual.isPause;
      start_btn.firstElementChild.classList = visual.isPause
        ? "fas fa-play"
        : "fas fa-pause";
      start_btn.setAttribute("title", visual.isPause ? "Start" : "Pause");
    }
  }
});

window.addEventListener("resize", async () => {
  if (window.innerHeight !== p_inner_h || nav_bar.clientHeight !== p_nav_h) {
    p_nav_h = nav_bar.clientHeight;
    p_inner_h = window.innerHeight;
    await stop_sort();
    setup(0);
    visual.reset(main_canvas);
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
    if (!ran_con) {
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
  line_checker.checked = false;
  visual.isLine = false;
  setup(0);
});
dot_checker.addEventListener("change", () => {
  if (dot_checker.checked) visual.isDot = true;
  else visual.isDot = false;
  line_checker.checked = false;
  visual.isLine = false;
  setup(0);
});
line_checker.addEventListener("change", () => {
  if (line_checker.checked) {
    visual.isLine = true;
    visual.isDot = false;
    visual.isColor = false;
    dot_checker.checked = false;
    color_checker.checked = false;
  } else visual.isLine = false;
  setup(0);
});

color_checker_con.addEventListener(
  "click",
  (event) => {
    if (!color_checker.contains(event.target) && !lb.contains(event.target)) {
      color_checker.checked = !color_checker.checked;
      if (color_checker.checked) visual.isColor = true;
      else visual.isColor = false;
      line_checker.checked = false;
      visual.isLine = false;
      setup(0);
    }
  },
  true
);
dot_checker_con.addEventListener(
  "click",
  (event) => {
    if (!dot_checker.contains(event.target) && !lbd.contains(event.target)) {
      dot_checker.checked = !dot_checker.checked;
      if (dot_checker.checked) visual.isDot = true;
      else visual.isDot = false;
      line_checker.checked = false;
      visual.isLine = false;
      setup(0);
    }
  },
  true
);
line_checker_con.addEventListener("click", (event) => {
  if (!line_checker.contains(event.target) && !lbl.contains(event.target)) {
    line_checker.checked = !line_checker.checked;
    if (line_checker.checked) {
      visual.isLine = true;
      visual.isDot = false;
      visual.isColor = false;
      dot_checker.checked = false;
      color_checker.checked = false;
    } else visual.isLine = false;
    setup(0);
  }
});
//#endregion

//#region Setup
let ua = navigator.userAgent;
let isIphone = ua.indexOf("iPhone") !== -1 || ua.indexOf("iPod") !== -1;
let isIpad = ua.indexOf("iPad") !== -1;
let isAndroid = ua.indexOf("Android") !== -1;
let isMobile = isIphone || isIpad || isAndroid;

let default_width = isMobile ? window.innerWidth : window.outerWidth;
if (isIphone) default_width = screen.width;
function setup(anim = 1) {
  main_canvas.width = default_width;
  main_canvas.height = window.innerHeight - nav_bar.clientHeight;
  main_canvas.height -= 5;
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
