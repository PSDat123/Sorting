import { sortContainer } from "./Sort_fn/Sort.js";
"use strict";

export class Visualizer {
  constructor(num, canvas) {
    this.c = canvas.getContext("2d", { alpha: false });
    this.o_data_x = [];
    this.o_data_y = [];
    this.canvas = canvas;
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.speed = 1;
    this.status = 0;
    this.description = (() => {
      let n_con = {};
      for (let val of sortContainer.values()){
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
  }
  //#endregion
  sleep(){
    return new Promise(requestAnimationFrame);
  }
  updateCanvas(_canvas) {
    this.c_height = _canvas.height;
    this.c_width = _canvas.width;
    this.col_w = this.c_width / this.o_data_x.length;
  }

  callBack() {}

  pauseSort() {}

  stopSort() {
    this.status = 0;
    this.callBack();
    // this.status = 0;
  }
  async startSort(name = "") {
    this.o_data_y = await sortContainer
      .get(name)
      .sort(this, this.o_data_y);
    this.stopSort();
  }
}

export class ColumnVisual extends Visualizer {
  constructor(num, canvas) {
    super(num, canvas);
  }
  showData(color = "#f0f0f0", arr_y = this.o_data_y, arr_x = this.o_data_x) {
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    this.c.fillStyle = color;
    this.c.clearRect(0, 0, this.c_width, h);
    for (let i = arr_x.length; i--; ) {
      this.c.fillRect(arr_x[i] - 1, h - arr_y[i], cw, arr_y[i]);
    }
    this.c.fillStyle = "#f0f0f0";
  }
  async highLightedLine(color = "#ff0505", ...indexes) {
    this.c.fillStyle = color;
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    for (
      let i = indexes.length;
      i--; //Draw Highlight
    )
      this.c.fillRect(
        this.o_data_x[indexes[i]] - 1,
        h - this.o_data_y[indexes[i]],
        cw,
        this.o_data_y[indexes[i]]
      );
    this.c.fillStyle = "#f0f0f0";
  }
  async update(anim = 1) {
    this.updateCanvas(this.canvas);
    let n_num = this.num;
    this.col_w = this.c_width / n_num;
    let cur_l = this.o_data_x.length,
      min_h = 5;
    for (let i = 0, l = n_num; i !== l; i++) {
      this.o_data_x[i] = ~~(i * this.col_w);
    }
    if (n_num < cur_l) {
      for (let i = cur_l - n_num; i--; ) {
        this.o_data_x.pop();
        this.o_data_y.pop();
      }
    } else {
      for (let i = 0, _l = n_num - cur_l; i < _l; i++) {
        this.o_data_y.push(~~(Math.random() * (this.c_height - 5)) + min_h);
        //cos//~~(this.c_height - (Math.cos(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
        //sin//~~(this.c_height - (Math.sin(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
      }
      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }
    this.showData();
  }

  async animData(arr_y, begin, end, mode = "up") {
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
        for (let n = atime; n--; ) {
          await this.sleep();
          for (let i = begin; i < end; i++) {
            temp[i] = lerp(temp[i], arr_y[i], 0.15);
          }
          this.showData("#f0f0f0", temp);
        }
        break;
      case "down":
        for (let n = atime; n--; ) {
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
    await this.animData(
      this.o_data_y,
      0,
      this.o_data_y.length,
      "down"
    );
    this.o_data_x = [];
    this.o_data_y = [];
    await this.update(this.num);
  }
}
