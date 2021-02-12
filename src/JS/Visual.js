import { sortContainer } from "./Sort_fn/Sort.js";
("use strict");

class Visualizer {
  constructor(num, canvas) {
    this.c = canvas.getContext("2d", { alpha: false });
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.speed = 1;
    this.status = 0;
    this.isPause = 0;
    this.sh_status = 0;
    this.isColor = false;
    this.isDot = false;
    this.description = (() => {
      let n_con = {};
      for (let val of sortContainer.values()) {
        // eslint-disable-next-line no-prototype-builtins
        if (n_con.hasOwnProperty(val.family)) {
          n_con[val.family].push(val.name);
          n_con[val.family].sort();
          continue;
        }
        n_con[val.family] = [val.name];
      }
      return Object.fromEntries(Object.entries(n_con).sort());
    })();
  }
  //#endregion
  async sleep() {
    if (this.isPause) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this.isPause) {
            resolve("");
            clearInterval(interval);
          }
        }, 100);
      });
    } else return new Promise(requestAnimationFrame);
  }

  callBack() {}

  async stopSort() {
    this.sh_status = 0;
    this.status = 0;
    this.isPause = 0;
    await this.sleep();
    this.callBack();
  }
  async startSort(name = "") {
    this.o_data_y = await sortContainer.get(name).sort(this, this.o_data_y);
    this.stopSort();
  }
  async shuffle() {
    this.sh_status = 1;
    for (let i = this.o_data_y.length; i--; ) {
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
  drawData(x, y, w, h, no_color = false) {
    let min_h = 5;
    if (this.isColor && !no_color) {
      let hue = ~~(360 * (1 - ((y - 5) / (this.c_height - min_h))));
      this.c.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (this.isDot) {
      this.c.fillRect(x, y, w, w);
      return;
    }
    this.c.fillRect(x, y, w, h);
  }
  finishSort(arr) {
    // let h = this.c_height,
    //   cw = ~~this.col_w + 1,
    //   arr_x = this.o_data_x;
    // this.c.fillStyle = "#00ff00";
    // this.c.clearRect(0, 0, this.c_width, h);
    // for (let i = arr_x.length; i--; ) {
    //   this.drawData(arr_x[i] - 1, h - arr[i], cw, arr[i], true);
    // }
    // this.c.fillStyle = "#f0f0f0";
    this.showData("#00ff00", arr);
  }
}

export class BarGraphVisual extends Visualizer {
  constructor(num, canvas) {
    super(num, canvas);
  }
  static get modeName(){
    return "Bar Graph";
  }
  showData(color = "#f0f0f0", arr_y = this.o_data_y, arr_x = this.o_data_x) {
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    this.c.fillStyle = color;
    this.c.clearRect(0, 0, this.c_width, h);
    for (let i = arr_x.length; i--; ) {
      this.drawData(arr_x[i] - 1, h - arr_y[i], cw, arr_y[i]);
    }
    this.c.fillStyle = "#f0f0f0";
  }
  async highLightedLine(color = "#ff0505", ...indexes) {
    this.c.fillStyle = this.isColor ? "#000000" :color;
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    for (
      let i = indexes.length;
      i--; //Draw Highlight
    )
      this.drawData(
        this.o_data_x[indexes[i]] - 1,
        h - this.o_data_y[indexes[i]],
        cw,
        this.o_data_y[indexes[i]],
        true
      );
    this.c.fillStyle = "#f0f0f0";
  }
  async update(anim = 1) {
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
    await this.animData(this.o_data_y, 0, this.o_data_y.length, "down");
    this.o_data_x = [];
    this.o_data_y = [];
    await this.update(this.num);
    
  }
}

export class SineGraphVisual extends BarGraphVisual {
  constructor(num, canvas) {
    super(num, canvas);
  }
  static get modeName() {
    return "Sine Graph";
  }
  async update(anim = 1) {
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
        this.o_data_y.push(
          ~~(
            this.c_height -
            (Math.sin(this.o_data_y.length / 10) + 1) *
              (this.c_height / 2 - min_h / 2)
          )
        );
      }
      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }
    this.showData();
  }
}

export class CosineGraphVisual extends BarGraphVisual {
  constructor(num, canvas) {
    super(num, canvas);
  }
  static get modeName() {
    return "Cosine Graph";
  }
  async update(anim = 1) {
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
        this.o_data_y.push(
          ~~(
            this.c_height -
            (Math.cos(this.o_data_y.length / 10) + 1) *
              (this.c_height / 2 - min_h / 2)
          )
        );
      }
      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }
    this.showData();
  }
}
