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
})({"JS/Sort_fn/Sort.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortContainer = void 0;
let sortContainer = new Map(); //#region Bubble Sort

exports.sortContainer = sortContainer;
sortContainer.set("Bubble sort".toLowerCase(), {
  family: "Bubble Sort",
  name: "Bubble Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let count = 0,
        i = 0,
        max = arr.length,
        temp = 0;

    let main = async () => {
      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i);

        if (i + 1 < max && arr[i] > arr[i + 1]) {
          temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp; // [arr[i][1], arr[i+1][1]] = [arr[i+1][1], arr[i][1]];

          count = 0;
        } else {
          count++;
        }

        if (count === max) {
          return 1;
        }

        i++;

        if (i === max) {
          max -= count;
          count = 0;
          i = 0;
        }
      }
    };

    let t = await main();

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Comb Sort

sortContainer.set("Comb sort".toLowerCase(), {
  family: "Comb sort",
  name: "Comb sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let max = arr.length - 1,
        gap = ~~(arr.length * 10 / 13),
        i = 0,
        temp = 0,
        count = 0,
        con = 0,
        pgap = gap;

    let main = async () => {
      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i);

        if (i + gap <= max && arr[i] > arr[i + gap]) {
          temp = arr[i];
          arr[i] = arr[i + gap];
          arr[i + gap] = temp; // [arr[i][1], arr[i+1][1]] = [arr[i+1][1], arr[i][1]];

          if (con) gap = pgap;
          con = 0;
          count = 0;
        } else {
          count++;
        }

        if (i + gap <= max) visual.highLightedLine("#ff0505", i + gap);
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

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Insertion Sort

sortContainer.set("Insertion Sort".toLowerCase(), {
  family: "Insertion Sort",
  name: "Insertion Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let max = 1,
        i = max + 1,
        temp = 0;

    let main = async () => {
      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i - 1);
        i--;

        if (i - 1 >= 0 && arr[i] < arr[i - 1]) {
          temp = arr[i];
          arr[i] = arr[i - 1];
          arr[i - 1] = temp; // [arr[i][1], arr[i-1][1]] = [arr[i-1][1], arr[i][1]];
        } else {
          max++;
          i = max + 1; // count = 0;
        }

        if (max >= arr.length) {
          return 1;
        }
      }
    };

    let t = await main();

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Merge Sort

sortContainer.set("Merge Sort".toLowerCase(), {
  family: "Merge Sort",
  name: "Merge Sort",
  sort: async (visual, arr) => {
    visual.status = 1;

    let mergeSort = async (l, r) => {
      if (!visual.status) return -1;

      if (l < r) {
        var m = ~~(l + (r - l) / 2);
        await mergeSort(l, m);
        await mergeSort(m + 1, r);
        await merge(l, m, r);
      }

      if (!visual.status) return -1;
    };

    let merge = async (l, m, r) => {
      let L = arr.slice(l, m + 1);
      let R = arr.slice(m + 1, r + 1);
      let il = L.length + R.length;
      let temp_arr = [];

      for (let dl = 0, dr = 0; dl + dr < il; dl++, dr++) {
        await visual.sleep();
        if (!visual.status) return -1;
        visual.showData(undefined, arr);

        if (R[dr] === undefined || L[dl] < R[dr]) {
          temp_arr.push(L[dl]);
          visual.highLightedLine("#ff0505", dl + l, m + dr);
          dr--;
        } else {
          temp_arr.push(R[dr]);
          visual.highLightedLine("#ff0505", dl + l, m + dr);
          dl--;
        }
      }

      for (let i = 0; i < temp_arr.length; i++) {
        await visual.sleep();
        if (!visual.status) return -1;
        arr[l + i] = temp_arr[i];
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", l + i);
      }
    };

    let t = (await mergeSort(0, arr.length - 1)) || 1;

    if (t === -1) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Shell Sort

sortContainer.set("Shell Sort".toLowerCase(), {
  family: "Shell Sort",
  name: "Shell Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let max = arr.length,
        gap = ~~(arr.length / 2),
        i = gap,
        temp_index = gap,
        temp = 0;

    let main = async () => {
      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;

        if (temp_index - gap >= 0 && arr[temp_index] < arr[temp_index - gap]) {
          temp = arr[temp_index];
          arr[temp_index] = arr[temp_index - gap];
          arr[temp_index - gap] = temp; // [arr[temp_index][1], arr[temp_index - gap][1]] = [arr[temp_index - gap][1], arr[temp_index][1]];

          temp_index -= gap;
        } else {
          i++;
          temp_index = i;
        }

        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", temp_index - gap * (temp_index >= gap));

        if (i >= max) {
          gap = ~~(gap / 2);
          i = gap;
          temp_index = gap;

          if (gap < 1) {
            return 1;
          }
        }

        visual.highLightedLine("#ff0505", i);
      }
    };

    let t = await main();

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Cocktail Shaker Sort

sortContainer.set("Cocktail Sort".toLowerCase(), {
  family: "Cocktail Sort",
  name: "Cocktail Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let i = 0,
        min = 0,
        max = arr.length - 1,
        inc = 1,
        temp = 0,
        count = 0;

    let main = async () => {
      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i);

        if (min <= i + inc && i + inc <= max) {
          if (inc > 0 && arr[i] > arr[i + inc] || inc < 0 && arr[i] < arr[i - 1]) {
            temp = arr[i];
            arr[i] = arr[i + inc];
            arr[i + inc] = temp;
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

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region Quick Sort

sortContainer.set("Quick Sort".toLowerCase(), {
  family: "Quick Sort",
  name: "Quick Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let temp = 0;

    let quickSort = async (l, r) => {
      if (!visual.status) return -1;

      if (l < r) {
        let pivot_index = await partition_h(l, r);
        if (pivot_index === -1) return pivot_index;
        await quickSort(l, pivot_index);
        await quickSort(pivot_index + 1, r);
      }

      if (!visual.status) return -1;
    }; //Lomuto Partition
    // let partition_l = async (l, r) => {
    // 	let pivot_value = arr[r][1];
    // 	let temp = 0;
    // 	let i = l, j = 0;
    // 	for(j = l; j < r; j++){
    // 		await visual.sleep();
    // 		this.showData();
    // 		this.redLine("#ff0505", arr[i]);
    // 		this.redLine("#ff0505", arr[j]);
    // 		if(arr[j][1] <= pivot_value){
    // 			temp = arr[i][1]; //swap
    // 			arr[i][1] = arr[j][1];
    // 			arr[j][1] = temp;
    // 			i++;
    // 		}
    // 	}
    // 	temp = arr[i][1]; //swap
    // 	arr[i][1] = arr[r][1];
    // 	arr[r][1] = temp;
    // 	return i;
    // }
    //Hoare partition


    let partition_h = async (l, r) => {
      let con_i = 0,
          con_j = 0; //#region --Random pivot--

      var ran = ~~((r + l) / 2); // temp = arr[ran][1]; //swap
      // arr[ran][1] = arr[l][1];
      // arr[l][1] = temp;
      //#endregion

      let pivot_value = arr[ran];
      let i = l - 1,
          j = r + 1;

      for (;;) {
        await visual.sleep();
        if (!visual.status) return -1;

        if (!con_i) {
          i++;

          if (arr[i] >= pivot_value) {
            con_i = 1;
          }
        }

        if (con_i) {
          j--;

          if (arr[j] <= pivot_value) {
            con_j = 1;
          }
        }

        visual.showData(undefined, arr);
        visual.highLightedLine("#68f571", ran);
        visual.highLightedLine("#ff0505", i, j - 1 * !con_i);

        if (con_i && con_j) {
          if (i >= j) return j;else {
            con_i = 0;
            con_j = 0;
            if (i === ran) ran = j;else if (j === ran) ran = i;
            temp = arr[i]; //swap

            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
    };

    let t = (await quickSort(0, arr.length - 1)) || 1;

    if (t === -1) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region LSD Radix Sort

sortContainer.set("LSD Radix Sort".toLowerCase(), {
  family: "Radix Sort",
  name: "LSD Radix Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let num_len = ~~Math.log10(Math.max.apply(null, arr)) + 1;

    let countSort = async n => {
      let range = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          //base 10
      temp_arr = [];

      for (let i = 0; i < arr.length; i++) {
        await visual.sleep();
        if (!visual.status) return 0;
        range[~~(arr[i] % 10 ** n / 10 ** (n - 1))]++;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i);
      }

      for (let i = 1; i < range.length; i++) {
        range[i] += range[i - 1];
      }

      range.unshift(0);
      range.pop();
      let bucket = [],
          bucket_len = [];

      for (let i = 0, l = range.length; i !== l; i++) {
        bucket.push(range[i]);
        if (range[i] < arr.length) visual.highLightedLine("#ff0505", range[i]);

        if (i !== 0) {
          if (i === l - 1) {
            bucket_len[i] = arr.length - bucket[i];
          }

          bucket_len[i - 1] = bucket[i] - bucket[i - 1];
        }
      }

      for (let i = 0, l = arr.length; i !== l; i++) {
        let digit = ~~(arr[i] % 10 ** n / 10 ** (n - 1));
        temp_arr[range[digit]] = arr[i];
        range[digit]++;
      }

      for (;;) {
        await visual.sleep();
        if (!visual.status) return 0;
        let _n = 0;
        visual.showData(undefined, arr);

        for (let i = 0, l = bucket.length; i !== l; i++) {
          if (bucket_len[i]) {
            arr[bucket[i]] = temp_arr[bucket[i]];
            visual.highLightedLine("#ff0505", bucket[i]);
            bucket[i]++;
            bucket_len[i]--;
            _n++;
          }
        }

        if (!_n) break;
      }
    };

    let main = async () => {
      for (let n = 1; n <= num_len; n++) {
        if (!visual.status) return 0;
        await countSort(n);
      }

      return visual.status ? 1 : 0;
    };

    let t = await main();

    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
//#region In-Place Radix

sortContainer.set("In-Place LSD Radix Sort".toLowerCase(), {
  family: "Radix Sort",
  name: "In-Place LSD Radix Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let bucket_index = [],
        len = arr.length;
    let max_p = ~~Math.log10(Math.max.apply(null, arr)) + 1;
    let cur_pos = 0;

    for (let n = 1; n <= max_p; n++) {
      cur_pos = 0;
      bucket_index = [];

      for (let i = 0; i < 10; i++) {
        bucket_index.push(len - 1);
      }

      for (let i = 0; i < len; i++) {
        let digit = ~~(arr[cur_pos] % 10 ** n / 10 ** (n - 1));
        await visual.sleep();

        if (!visual.status) {
          visual.showData(undefined, arr);
          return arr;
        }

        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", cur_pos, ...bucket_index);

        if (digit === 0) {
          cur_pos++;
        } else {
          for (let j = cur_pos, end = bucket_index[digit - 1]; j < end; j++) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }

          for (let j = digit - 1; j > 0; j--) bucket_index[j - 1]--;
        }
      }
    }

    visual.showData("#00ff00", arr);
    return arr;
  }
}); //#endregion
},{}],"JS/Visual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarGraphVisual = void 0;

var _Sort = require("./Sort_fn/Sort.js");

"use strict";

class Visualizer {
  constructor(num, canvas) {
    this.c = canvas.getContext("2d", {
      alpha: false
    });
    this.mult_data_y = [];
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.p_c_height = this.c_height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.speed = 1;
    this.status = 0;
    this.isPause = 0;
    this.sh_status = 0;

    this.description = (() => {
      let n_con = {};

      for (let val of _Sort.sortContainer.values()) {
        // eslint-disable-next-line no-prototype-builtins
        if (n_con.hasOwnProperty(val.family)) {
          n_con[val.family].push(val.name);
          n_con[val.family].sort();
          break;
        }

        n_con[val.family] = [val.name];
      }

      return Object.fromEntries(Object.entries(n_con).sort());
    })();
  } //#endregion


  async sleep() {
    if (this.isPause) {
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (!this.isPause) {
            resolve('');
            clearInterval(interval);
          }
        }, 100);
      });
    } else return new Promise(requestAnimationFrame);
  } // checkCon(){
  //   if(!this.status){
  //     if(this.isPause) return 1;
  //     else return 0;
  //   }else return 1;
  // }


  callBack() {} // pauseSort() {
  //   this.isPause = 1;
  // }


  async stopSort() {
    this.sh_status = 0;
    this.status = 0;
    this.isPause = 0;
    await this.sleep();
    this.callBack();
  }

  async startSort() {
    let name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    this.o_data_y = await _Sort.sortContainer.get(name).sort(this, this.o_data_y);
    this.stopSort();
  }

  async shuffle() {
    this.sh_status = 1;

    for (let i = this.o_data_y.length - 1; i--;) {
      await this.sleep();
      if (!this.sh_status) break;
      this.showData();
      let ran = ~~(Math.random() * (i + 1));
      let temp = this.o_data_y[i];
      this.o_data_y[i] = this.o_data_y[ran];
      this.o_data_y[ran] = temp;
    }

    this.sh_status = 0;
  }

}

class BarGraphVisual extends Visualizer {
  constructor(num, canvas) {
    super(num, canvas);
  }

  static get modeName() {
    return "Bar Graph";
  }

  showData() {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#f0f0f0";
    let arr_y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.o_data_y;
    let arr_x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.o_data_x;
    let h = this.c_height,
        cw = ~~this.col_w + 1;
    this.c.fillStyle = color;
    this.c.clearRect(0, 0, this.c_width, h);

    for (let i = arr_x.length; i--;) {
      this.c.fillRect(arr_x[i] - 1, h - arr_y[i], cw, arr_y[i]);
    }

    this.c.fillStyle = "#f0f0f0";
  }

  async highLightedLine() {
    let color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "#ff0505";
    this.c.fillStyle = color;
    let h = this.c_height,
        cw = ~~this.col_w + 1;

    for (var _len = arguments.length, indexes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      indexes[_key - 1] = arguments[_key];
    }

    for (let i = indexes.length; i--;) //Draw Highlight
    this.c.fillRect(this.o_data_x[indexes[i]] - 1, h - this.o_data_y[indexes[i]], cw, this.o_data_y[indexes[i]]);

    this.c.fillStyle = "#f0f0f0";
  }

  async update() {
    let anim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let n_num = this.num;
    this.col_w = this.c_width / n_num;
    let cur_l = this.o_data_x.length,
        min_h = 5;

    for (let i = 0, l = n_num; i !== l; i++) {
      this.o_data_x[i] = ~~(i * this.col_w);
    }

    if (n_num < cur_l) {
      for (let i = cur_l - n_num; i--;) {
        this.o_data_x.pop();
        this.o_data_y.pop();
      }
    } else {
      for (let i = 0, _l = n_num - cur_l; i < _l; i++) {
        this.o_data_y.push(~~(Math.random() * (this.c_height - 5)) + min_h); //cos//~~(this.c_height - (Math.cos(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
        //sin//~~(this.c_height - (Math.sin(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
      }

      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }

    this.showData();
  }

  async animData(arr_y, begin, end) {
    let mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "up";
    let atime = 40,
        temp = arr_y.slice();

    function lerp(start, end, per) {
      return start + (end - start) * per;
    }

    switch (mode) {
      case "up":
        for (let i = begin; i < end; i++) {
          temp[i] = 0;
        }

        for (let n = atime; n--;) {
          await this.sleep();

          for (let i = begin; i < end; i++) {
            temp[i] = lerp(temp[i], arr_y[i], 0.15);
          }

          this.showData("#f0f0f0", temp);
        }

        break;

      case "down":
        for (let n = atime; n--;) {
          await this.sleep();

          for (let i = begin; i < end; i++) {
            temp[i] = lerp(temp[i], 0, 0.15);
          }

          this.showData("#f0f0f0", temp);
        }

        break;

      default:
        break;
    }
  }

  async randomize() {
    await this.animData(this.o_data_y, 0, this.o_data_y.length, "down");
    this.o_data_x = [];
    this.o_data_y = [];
    await this.update(this.num);
  }

}

exports.BarGraphVisual = BarGraphVisual;
},{"./Sort_fn/Sort.js":"JS/Sort_fn/Sort.js"}],"JS/Sorting.js":[function(require,module,exports) {
"use strict";

var VisualTools = _interopRequireWildcard(require("./Visual.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

let main_canvas = document.querySelector(".main-canvas");
let nav_bar = document.querySelector(".nav-bar");
let p_nav_h = nav_bar.clientHeight;
let num_ip = document.querySelector(".ip");
let start_btn = document.querySelector("#start");
let ran_btn = document.querySelector("#randomizer");
let stop_btn = document.querySelector("#stop");
let shuffle_btn = document.querySelector("#shuffle");
let options = document.querySelector(".option-wrap");
let modes = document.querySelector(".modes-wrap");
let mode_names = [];

for (let i in VisualTools) {
  mode_names.push(VisualTools[i].modeName);
}

let visual = new VisualTools.BarGraphVisual(parseInt(num_ip.value), main_canvas);
let default_num = parseInt(num_ip.value);
let ran_con = 0; //#region Custom Selections

let cur_select = document.createElement("DIV");
cur_select.setAttribute("class", "current-select");
cur_select.setAttribute("tabindex", 1);
cur_select.setAttribute("title", "Choose an algorithm");
cur_select.setAttribute("value", visual.description["Bubble Sort"][0].toLowerCase());
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

function createChoice() {
  let text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  let container = arguments.length > 1 ? arguments[1] : undefined;
  let class_name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "choices";

  let _arrow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

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
  if (visual.description[i].length === 1) createChoice(i, select_list);else {
    let sub = createChoice(undefined, select_list, "sub-select");
    createChoice(i, sub, "choices sub-select__front", 1);
    let sub_items = createChoice(undefined, sub, "sub-select__items");

    for (let j of visual.description[i]) {
      createChoice(j, sub_items);
    }
  }
} // parent_select_list.appendChild(select_list);


options.appendChild(select_list); //#endregion
//#region Mode Options

let cur_mode = document.createElement("DIV");
cur_mode.setAttribute('class', 'cur-mode');
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

for (let i of mode_names) {
  createChoice(i, modes_list, "m-choices");
}

modes.appendChild(modes_list); //#endregion
//#region Events

let caret_rotated = 0;

function toggleOptList() {
  cur_select.classList.toggle("active");
  select_list.classList.toggle("hide-items");
  caret.style.transform = caret_rotated ? "rotate(0deg)" : "rotate(-180deg)";
  caret_rotated = !caret_rotated;
  let sub_select = select_list.querySelectorAll(".sub-select__items");

  for (let i = sub_select.length; i--;) if (!sub_select[i].classList.contains("hide-items")) sub_select[i].classList.add("hide-items");
}

cur_select.addEventListener("click", toggleOptList);
let mode_caret_rotated = 0;

function toggleModeList() {
  cur_mode.classList.toggle("active");
  modes_list.classList.toggle("hide-items");
  mode_caret.style.transform = mode_caret_rotated ? "rotate(0deg)" : "rotate(-180deg)";
  mode_caret_rotated = !mode_caret_rotated; // let sub_select = select_list.querySelectorAll(".sub-select__items");
  // for (let i = sub_select.length; i--; )
  //   if (!sub_select[i].classList.contains("hide-items"))
  //     sub_select[i].classList.add("hide-items");
}

cur_mode.addEventListener("click", toggleModeList);
let choices = document.querySelectorAll(".choices");

for (let i of choices) {
  if (i.classList.contains("sub-select__front")) i.addEventListener("click", () => {
    let sub_select = select_list.querySelectorAll(".sub-select__items");

    for (let j = sub_select.length; j--;) {
      if (!sub_select[j].classList.contains("hide-items") && !sub_select[j].isEqualNode(i.nextSibling)) {
        sub_select[j].classList.add("hide-items");
      }
    }

    i.parentNode.querySelector(".sub-select__items").classList.toggle("hide-items");
    stop_sort();
  });else i.addEventListener("click", () => {
    cur_select.firstChild.data = i.innerHTML;
    cur_select.setAttribute("value", i.innerHTML.toLowerCase());
    toggleOptList();
    stop_sort();
  });
}

let m_choices = document.querySelectorAll(".m-choices");

for (let i of m_choices) {
  i.addEventListener("click", () => {
    cur_mode.firstChild.data = i.innerHTML;
    cur_mode.setAttribute("value", i.innerHTML.toLowerCase());
    toggleModeList();
    stop_sort();
  });
}

window.addEventListener("click", event => {
  if (!options.contains(event.target) && cur_select.classList.contains("active")) {
    toggleOptList();
  }

  if (!modes.contains(event.target) && cur_mode.classList.contains("active")) {
    toggleModeList();
  }
});
let idle = 1;

visual.callBack = function () {
  start_btn.firstElementChild.classList = "fas fa-play";
  start_btn.setAttribute("title", "Start");
  idle = 1;
};

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
      start_btn.firstElementChild.classList = visual.isPause ? "fas fa-play" : "fas fa-pause";
      start_btn.setAttribute("title", visual.isPause ? "Start" : "Pause");
    }
  }
});
window.addEventListener("resize", () => {
  if (window.outerWidth - window.innerWidth < 100 || window.outerHeight - window.innerHeight < 200 || nav_bar.clientHeight !== p_nav_h) {
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
  } // window.scrollTo(0, document.body.scrollHeight);


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
shuffle_btn.addEventListener("click", async () => {
  if (!ran_con) {
    ran_con = 1;
    await stop_sort();
    await visual.shuffle();
    ran_con = 0;
  }
}); //#endregion
//#region Setup

let default_width = window.outerWidth;

function setup() {
  let anim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  main_canvas.width = default_width;
  main_canvas.height = window.innerHeight - nav_bar.clientHeight;
  main_canvas.height -= 5;
  visual.c_height = main_canvas.height;
  visual.c_width = main_canvas.width;
  visual.update(anim);
}

window.addEventListener("load", setup); //#endregion

async function start_sort() {
  if (visual.num >= +num_ip.min) {
    console.clear(); //Start Timer

    const start = new Date().getTime();
    console.log("Start: ".concat(start)); // await visual[cur_select.getAttribute("value").toLowerCase()]?.();

    await visual.startSort(cur_select.getAttribute("value").toLowerCase()); //End Timer

    const end = new Date().getTime();
    console.log("End: ".concat(end));
    console.log("Time taken: ".concat(end - start, "ms")); //Time taken
    // visual.callBack();
  }
}

async function stop_sort() {
  await visual.stopSort();
}
},{"./Visual.js":"JS/Visual.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51506" + '/');

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