// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"JS/Methods.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Method {
  constructor(num, data, canvas) {
    this.c = canvas.getContext("2d");
    this.data = data;
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.status = 0;
    this.req = 0;
    this.speed = 1;
    this.description = Object.keys(Method.prototype).map(s => s.split(" ").map(s1 => s1[0].toUpperCase() + s1.substr(1)).join(" ")).sort();
    this.mode = "column";
  }

  showData() {
    this.c.clearRect(0, 0, this.c_width, this.c_height);
    var a = this.col_w * this.num / this.c_width;

    for (var i = 0, l = this.data.length; i !== l; i++) {
      this.c.fillRect(this.data[i][0] - a, this.c_height - this.data[i][1], this.col_w + a, this.data[i][1]);
    }
  }

  redLine(data_pair) {
    let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#ff0505";
    this.set_fill(color);
    this.c.fillRect(data_pair[0] - this.col_w / (this.c_width / this.num), this.c_height - data_pair[1], this.col_w + this.col_w / (this.c_width / this.num), data_pair[1]);
    this.set_fill();
  }

  setRandomData() {
    this.col_w = this.c_width / this.num;
    let cur_l = this.data.length;

    if (this.num < cur_l) {
      for (let i = 0; i < -this.num + cur_l; i++) {
        this.data.pop();
      }

      return;
    }

    for (let i = 0; i < this.num - cur_l * (this.num >= cur_l); i++) {
      this.data.push([i * this.col_w, ~~(this.c_height - Math.random() * (this.c_height - 5))]); //cos//this.data.push([i * this.col_w, (this.c_height - (Math.cos(this.data.length / 10) + 1) * this.c_height/2 )]);
      //sin//this.data.push([i * this.col_w, (this.c_height - (Math.sin(this.data.length / 10) + 1) * this.c_height / 2)]);
    }
  }

  end_sort() {
    cancelAnimationFrame(this.req);
    this.c.fillStyle = "#00ff00";
    this.showData();
    this.status = 0;
    this.callBack();
  }

  set_fill() {
    let style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#f0f0f0";
    this.c.fillStyle = style;
  }

  callBack() {}

  async sleep() {
    return new Promise(requestAnimationFrame);
  }

} //#region Bubble Sort


exports.default = Method;

Method.prototype["Bubble sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let count = 0,
      i = 0,
      max = this.num,
      temp = 0;

  let main = async () => {
    for (;;) {
      if (!this.status) return 0;
      await this.sleep();
      this.showData();
      this.redLine(this.data[i]);

      if (i + 1 < max && this.data[i][1] > this.data[i + 1][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i + 1][1];
        this.data[i + 1][1] = temp; // [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];

        count = 0;
      } else {
        count++;
      }

      if (count >= max) {
        return 1;
      }

      i++;

      if (i >= max) {
        max -= count;
        count = 0;
        i = 0;
      }
    }
  };

  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
}; //#endregion
//#region Comb Sort


Method.prototype["Comb sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let max = this.data.length - 1,
      gap = ~~(this.data.length * 10 / 13),
      i = 0,
      temp = 0,
      count = 0,
      con = 0,
      pgap = gap;

  let main = async () => {
    for (;;) {
      if (!this.status) return 0;
      await this.sleep();
      this.showData();
      this.redLine(this.data[i]);

      if (i + gap <= max && this.data[i][1] > this.data[i + gap][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i + gap][1];
        this.data[i + gap][1] = temp; // [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];

        if (con) gap = pgap;
        con = 0;
        count = 0;
      } else {
        count++;
      }

      this.redLine(this.data[i + gap]);
      i++;

      if (i + gap > max) {
        i = 0;
        pgap = gap;
        gap = ~~(gap * 10 / 13);

        if (gap < 1 && count >= max) {
          return 1;
        } else if (gap < 1 || count >= max - pgap) {
          con = 1;
          gap = 1;
        }

        count = 0;
      }
    }
  };

  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
}; //#endregion
//#region Insertion Sort


Method.prototype["Insertion sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let max = 1,
      i = max + 1,
      temp = 0;

  let main = async () => {
    for (;;) {
      if (!this.status) return 0;
      await this.sleep();
      this.showData();
      this.redLine(this.data[i - 1]);
      i--;

      if (i - 1 >= 0 && this.data[i][1] < this.data[i - 1][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i - 1][1];
        this.data[i - 1][1] = temp; // [this.data[i][1], this.data[i-1][1]] = [this.data[i-1][1], this.data[i][1]];
      } else {
        max++;
        i = max + 1; // count = 0;
      }

      if (max >= this.num) {
        return 1;
      }
    }
  };

  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
}; //#endregion
//#region Merge Sort


Method.prototype["Merge sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let merge_sort = async (l, r) => {
    if (l < r) {
      var m = ~~(l + (r - l) / 2);
      await merge_sort(l, m);
      await merge_sort(m + 1, r);
      await merge(l, m, r);
    }

    if (!this.status) return -1;
  };

  let merge = async (l, m, r) => {
    let L = this.data.slice(l, m + 1);
    let R = this.data.slice(m + 1, r + 1);
    let il = L.length + R.length;

    for (let dl = 0, dr = 0; dl + dr < il; dl++, dr++) {
      var _R$dr, _L$dl, _R$dr2;

      if (!this.status) return -1;
      await this.sleep();
      this.showData();

      if (((_R$dr = R[dr]) === null || _R$dr === void 0 ? void 0 : _R$dr[1]) === undefined || ((_L$dl = L[dl]) === null || _L$dl === void 0 ? void 0 : _L$dl[1]) < ((_R$dr2 = R[dr]) === null || _R$dr2 === void 0 ? void 0 : _R$dr2[1])) {
        this.data[dl + dr + l] = [this.data[dl + dr + l][0], L[dl][1]];
        this.redLine(this.data[dl + dr + l]);
        dr--;
      } else {
        this.data[dl + dr + l] = [this.data[dl + dr + l][0], R[dr][1]];
        this.redLine(this.data[dl + dr + l]);
        dl--;
      }
    }
  };

  let t = (await merge_sort(0, this.data.length - 1)) || 1;
  this.showData();
  if (t === -1) return;
  this.end_sort();
}; //#endregion
//#region Shell Sort


Method.prototype["Shell sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let max = this.data.length,
      gap = ~~(this.data.length / 2),
      i = gap,
      temp_index = gap,
      temp = 0;

  let main = async () => {
    for (;;) {
      if (!this.status) return 0;
      await this.sleep();

      if (temp_index - gap >= 0 && this.data[temp_index][1] < this.data[temp_index - gap][1]) {
        temp = this.data[temp_index][1];
        this.data[temp_index][1] = this.data[temp_index - gap][1];
        this.data[temp_index - gap][1] = temp; // [this.data[temp_index][1], this.data[temp_index - gap][1]] = [this.data[temp_index - gap][1], this.data[temp_index][1]];

        temp_index -= gap; // changes++;
        // if (con) gap = pgap;
        // con = 0;
      } else {
        i++;
        temp_index = i;
      }

      this.showData();
      this.redLine(this.data[temp_index - gap * (temp_index >= gap)]);

      if (i >= max) {
        gap = ~~(gap / 2);
        i = gap;
        temp_index = gap; // pgap = gap;
        // if (con) {gap = 0; i = gap;}
        // else {
        // 	if(changes){
        // 		gap = ~~(gap / 2);
        // 		i = gap;
        // 		temp_index = gap;
        // 	}
        // 	else{
        // 		gap = 1;
        // 		con = 1;
        // 		i = gap;
        // 		temp_index = gap;
        // 	}
        // }

        if (gap < 1) {
          return 1;
        }
      }

      this.redLine(this.data[i]);
    }
  };

  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
}; //#endregion
//#region Cocktail Shaker Sort


Method.prototype["Cocktail sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let i = 0,
      min = 0,
      max = this.data.length - 1,
      inc = 1,
      temp = 0,
      count = 0;

  let main = async () => {
    for (;;) {
      if (!this.status) return 0;
      await this.sleep();
      this.showData();
      this.redLine(this.data[i]);

      if (min <= i + inc && i + inc <= max) {
        if (inc > 0 && this.data[i][1] > this.data[i + inc][1] || inc < 0 && this.data[i][1] < this.data[i - 1][1]) {
          temp = this.data[i][1];
          this.data[i][1] = this.data[i + inc][1];
          this.data[i + inc][1] = temp;
          count = 0;
        } else {
          count++;
        }

        i += inc;
      } else {
        inc = -inc;

        if (i >= max) {
          max -= count;
          i = max;
        } else {
          min += count;
          i = min;
        }
      }

      if (min > max) {
        return 1;
      }
    }
  };

  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
}; //#endregion
//#region Quick Sort


Method.prototype["Quick Sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;
  let temp = 0;

  let quickSort = async (l, r) => {
    if (l < r) {
      let pivot_index = await partition_h(l, r);
      if (pivot_index === -1) return pivot_index;
      await quickSort(l, pivot_index);
      await quickSort(pivot_index + 1, r);
    }

    if (!this.status) return -1;
  }; //Lomuto Partition
  // let partition_l = async (l, r) => {
  // 	let pivot_value = this.data[r][1];
  // 	let temp = 0;
  // 	let i = l, j = 0;
  // 	for(j = l; j < r; j++){
  // 		await this.sleep();
  // 		this.showData();
  // 		this.redLine(this.data[i]);
  // 		this.redLine(this.data[j]);
  // 		if(this.data[j][1] <= pivot_value){
  // 			temp = this.data[i][1]; //swap
  // 			this.data[i][1] = this.data[j][1];
  // 			this.data[j][1] = temp;
  // 			i++;
  // 		}
  // 	}
  // 	temp = this.data[i][1]; //swap
  // 	this.data[i][1] = this.data[r][1];
  // 	this.data[r][1] = temp;
  // 	return i;
  // }
  //Hoare partition


  let partition_h = async (l, r) => {
    let con_i = 0,
        con_j = 0; //#region --Random pivot--
    // var ran = Math.floor(Math.random() * (r - l + 1) + l);
    // temp = this.data[ran][1]; //swap
    // this.data[ran][1] = this.data[l][1];
    // this.data[l][1] = temp;
    // this.redLine(this.data[ran]);
    // this.redLine(this.data[l]);
    //#endregion

    let pivot_value = this.data[l][1];
    let i = l - 1,
        j = r + 1;

    for (;;) {
      if (!this.status) return -1;
      await this.sleep();

      if (!con_i) {
        i++;

        if (this.data[i][1] >= pivot_value) {
          con_i = 1;
        }
      }

      if (con_i) {
        j--;

        if (this.data[j][1] <= pivot_value) {
          con_j = 1;
        }
      }

      this.showData();
      this.redLine(this.data[i]);
      this.redLine(this.data[j - 1 * !con_i]);

      if (con_i && con_j) {
        if (i >= j) return j;else {
          con_i = 0;
          con_j = 0;
          temp = this.data[i][1]; //swap

          this.data[i][1] = this.data[j][1];
          this.data[j][1] = temp;
        }
      }
    }
  };

  let t = (await quickSort(0, this.data.length - 1)) || 1;
  this.showData();
  if (t === -1) return;
  this.end_sort();
}; //#endregion
//#region ______OLD_____
//Merge sort algorithm
// let queue = [];
// (function merge_index(l,r){
// 	if(l<r){
// 		var m = ~~(l + (r - l) / 2);
// 		merge_index(l,m);
// 		merge_index(m+1, r);
// 		queue.push([l,m,r]);
// 	}
// })(0, this.data.length - 1);
// // console.log(queue);
// let q_i = 0
// let l = queue[q_i][0];
// let m = queue[q_i][1];
// let r = queue[q_i][2];
// let a1 = this.data.slice(l, m + 1);
// let a2 = this.data.slice(m + 1, r + 1);
// let l1 = 0, l2 = 0, con = 0;
// let main = () =>{
// 	this.req = requestAnimationFrame(main);
// 	if (l + l1 > m && m + 1 + l2 > r) {
// 		q_i++;
// 		if (q_i >= queue.length) {
// 			this.end_sort();
// 			//End Timer
// 			const end = new Date().getTime();
// 			console.log(`End: ${end}`);
// 			console.log(`Time taken: ${end - start}ms`); //Time taken
// 		}
// 		else {
// 			l = queue[q_i][0];
// 			m = queue[q_i][1];
// 			r = queue[q_i][2];
// 			a1 = this.data.slice(l, m + 1);
// 			a2 = this.data.slice(m + 1, r + 1);
// 			l1 = 0;
// 			l2 = 0;
// 		}
// 	}
// 	else if ((con = l + l1 > m) || m + 1 + l2 > r){
// 		this.data[l + l1 + l2] = [this.data[l + l1 + l2][0], con ? a2[l2][1] : a1[l1][1]];
// 		this.showData();
// 		c.fillStyle = "#00ffff";//cyan
// 		c.fillRect(this.data[m + 1][0], this.c_height - this.data[m + 1][1], this.col_w, this.data[m + 1][1]);
// 		this.set_fill();
// 		//Red line
// 		this.redLine(this.data[l + l1 + l2]);
// 		con? l2++ : l1++;
// 	}
// 	else{
// 		con = a1[l1][1] > a2[l2][1];
// 		this.data[l + l1 + l2] = [this.data[l + l1 + l2][0], con ? a2[l2][1] : a1[l1][1]];
// 		this.showData();
// 		c.fillStyle = "#00ffff";//cyan
// 		c.fillRect(this.data[m + 1][0], this.c_height - this.data[m + 1][1], this.col_w, this.data[m + 1][1]);
// 		this.set_fill();
// 		//Red line
// 		this.redLine(this.data[l + l1 + l2]);
// 		con ? l2++ : l1++;
// 		}
// }
// main();
//#endregion
},{}],"JS/Sorting.js":[function(require,module,exports) {
"use strict";

var _Methods = _interopRequireDefault(require("./Methods.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let canvas = document.querySelector("canvas");
let nav_bar = document.querySelector(".nav-bar");
let start_btn = document.querySelector(".start");
let current_opt = document.querySelector(".selection");
let num_ip = document.querySelector(".ip"); // let num = parseInt(num_ip.value);

let data = [];
let method = new _Methods.default(parseInt(num_ip.value), data, canvas);
let default_num = parseInt(num_ip.value); //#region Custom Selection

for (let i of method.description) {
  let tag = document.createElement("OPTION");
  let text = document.createTextNode(i);
  tag.appendChild(text);
  tag.classList.add("opts"); // tag.value = i.match(/^(?:\w){2}/g).join("").trim() + "sort";

  tag.value = i.toLowerCase();
  current_opt.appendChild(tag);
} // const eve = new Event("method_changed")


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
    cur_select.setAttribute("value", select_items[i].innerHTML.toLowerCase()); // cur_select.dispatchEvent(eve);

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

window.addEventListener("click", event => {
  // console.log(event.target);
  if (!wrap.contains(event.target) && cur_select.classList.contains("active")) {
    toggleList();
  }
}); //#endregion

start_btn.addEventListener("click", () => {
  method.status = !method.status; // start_btn.innerHTML = method.status ? "Stop" : "Start";

  method.status ? (() => {
    start_btn.firstChild.classList = "fas fa-pause";
    start_btn.lastChild.data = " STOP";
    start_sort();
  })() : (() => {
    stop_sort();
  })();
});

method.callBack = function () {
  start_btn.firstChild.classList = "fas fa-play";
  start_btn.lastChild.data = " START";
};

window.addEventListener("resize", setup); // cur_select.addEventListener("method_changed", change_method, false);

num_ip.addEventListener("change", () => {
  stop_sort();
  method.num = parseInt(num_ip.value);

  if (method.num < +num_ip.min || method.num > +num_ip.max) {
    num_ip.value = default_num;
    method.num = default_num;
    alert("Invalid number (Too high or too low)");
  }

  setup();
}); //#region Setup

function setup() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - nav_bar.offsetHeight;
  method.c_height = canvas.height;
  method.c_width = canvas.width;
  method.setRandomData();

  for (var i = 0, l = method.data.length; i !== l; i++) {
    method.col_w = method.c_width / method.num;
    method.data[i][0] = i * method.col_w;
  }

  method.set_fill();
  method.showData();
}

setup(); //#endregion
// // let fn = '';
// function change_method() {
// 	method.status = 0;
// 	method.callBack();
// 	// fn = `method["${cur_select.getAttribute("value").toLowerCase()}"]()`;
// }
// change_method();

async function start_sort() {
  if (method.num >= +num_ip.min) {
    var _method$cur_select$ge;

    console.clear(); //Start Timer

    const start = new Date().getTime();
    console.log("Start: ".concat(start));
    await ((_method$cur_select$ge = method[cur_select.getAttribute("value").toLowerCase()]) === null || _method$cur_select$ge === void 0 ? void 0 : _method$cur_select$ge.call(method)); //End Timer

    const end = new Date().getTime();
    console.log("End: ".concat(end));
    console.log("Time taken: ".concat(end - start, "ms")); //Time taken
  } // start_btn.removeEventListener("click", start_sort);
  // method.Isort();
  // start_btn.addEventListener("click", start_sort);

}

function stop_sort() {
  method.status = 0;
  method.callBack();
}
},{"./Methods.js":"JS/Methods.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49658" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","JS/Sorting.js"], null)
//# sourceMappingURL=/Sorting.bacb38cb.js.map