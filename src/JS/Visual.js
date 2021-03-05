import { sortContainer } from "./Sort_fn/Sort.js";
("use strict");

class Visualizer {
  constructor(num, canvas, default_color) {
    this.c = canvas.getContext("2d");
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.speed = 0;
    this.status = 0;
    this.isPause = 0;
    this.sh_status = 0;
    this.def_color = default_color;
    this.isColor = false;
    this.isDot = false;
    this.isLine = false;
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
  async sleep(time = this.speed) {
    if (this.isPause) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!this.isPause) {
            resolve("");
            clearInterval(interval);
          }
        }, 100);
      });
    } else
      return time
        ? new Promise((resolve) => setTimeout(resolve, time))
        : new Promise(requestAnimationFrame);
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
    await this.stopSort();
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
          this.showData(undefined, temp);
        }
        break;
      case "down":
        for (let n = atime; n--; ) {
          await this.sleep();
          for (let i = begin; i < end; i++) {
            temp[i] = lerp(temp[i], 0, 0.15);
          }
          this.showData(undefined, temp);
        }
        break;
      default:
        break;
    }
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
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
  }
  static get modeName() {
    return "Bar Graph";
  }
  reset(canvas) {
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.c_width = canvas.width;
  }
  drawData__LINE(arr_x = this.o_data_x, arr_y = this.o_data_y, cw) {
    let h = this.c_height,
      l = arr_x.length,
      hcw = ~~(cw / 2);
    this.c.lineJoin = "round";
    this.c.lineWidth = 2;

    this.c.beginPath();
    this.c.moveTo(arr_x[0], h - arr_y[0]);
    this.c.lineTo(arr_x[0] + hcw, h - arr_y[0]);
    for (let i = 1; i < l; i++) {
      this.c.lineTo(arr_x[i] + hcw, h - arr_y[i]);
    }
    this.c.lineTo(arr_x[l - 1] + cw, h - arr_y[l - 1]);
    this.c.stroke();
  }
  drawData(x, y, w, h, no_color = false) {
    let min_h = 5;
    if (this.isColor && !no_color) {
      let hue = ~~(360 * (1 - (y - 5) / (this.c_height - min_h)));
      this.c.fillStyle = `hsl(${hue}, 100%, 50%)`;
    }
    if (this.isDot) {
      this.c.fillRect(x, y, w, w);
      return;
    }
    this.c.fillRect(x, y, w, h);
  }
  showData(
    color = this.def_color,
    arr_y = this.o_data_y,
    arr_x = this.o_data_x
  ) {
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    this.c.fillStyle = color;
    this.c.clearRect(0, 0, this.c_width, h);
    if (this.isLine) {
      this.c.strokeStyle = color;
      this.drawData__LINE(arr_x, arr_y, cw);
      this.c.strokeStyle = this.def_color;
    } else
      for (let i = arr_x.length; i--; ) {
        this.drawData(arr_x[i] - 1, h - arr_y[i], cw, arr_y[i]);
      }
    this.c.fillStyle = this.def_color;
  }
  highLightedLine__LINE(indexes) {
    let h = this.c_height,
      cw = ~~this.col_w + 1,
      hcw = ~~(cw / 2);
    for (
      let i = indexes.length;
      i--; //Draw Highlight

    ) {
      this.c.beginPath();
      if (indexes[i])
        this.c.lineTo(
          this.o_data_x[indexes[i] - 1] + hcw,
          h - this.o_data_y[indexes[i] - 1]
        );
      this.c.lineTo(
        this.o_data_x[indexes[i]] + hcw,
        h - this.o_data_y[indexes[i]]
      );
      if (indexes[i] !== this.o_data_x.length - 1)
        this.c.lineTo(
          this.o_data_x[indexes[i] + 1] + hcw,
          h - this.o_data_y[indexes[i] + 1]
        );
      this.c.stroke();
    }
  }
  async highLightedLine(color = "#ff0505", ...indexes) {
    this.c.fillStyle = this.isColor ? "#000000" : color;
    this.c.strokeStyle = color;
    let h = this.c_height,
      cw = ~~this.col_w + 1;

    if (this.isLine) {
      this.highLightedLine__LINE(indexes);
    } else
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
    this.c.fillStyle = this.def_color;
    this.c.strokeStyle = this.def_color;
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
  async randomize() {
    await this.animData(this.o_data_y, 0, this.o_data_y.length, "down");
    this.o_data_x = [];
    this.o_data_y = [];
    await this.update(this.num);
  }
}

export class SineGraphVisual extends BarGraphVisual {
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
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
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
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

export class AdditiveWavesVisual extends BarGraphVisual {
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
    this.random_w = [];
    this.random_p = [];
    this.max_wave = 5;
    this.generate();
  }
  generate() {
    this.max_wave = ~~(2 + Math.random() * 7);
    this.random_w = [];
    this.random_p = [];
    for (let i = 0; i < this.max_wave; i++) {
      this.random_w.push(Math.random() * (this.max_wave * 0.3));
      this.random_p.push(Math.random() * 2 * Math.PI);
    }
  }
  static get modeName() {
    return "Additive Waves";
  }
  async update(anim = 1) {
    let n_num = this.num;
    this.col_w = this.c_width / n_num;
    let cur_l = this.o_data_x.length;
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
        let data_v = 0;
        for (let j = 0; j < 5; j++) {
          data_v += ~~(
            (Math.cos(
              this.random_w[j] * (this.o_data_y.length / 10) + this.random_p[j]
            ) +
              1) *
            (this.c_height / (2 * this.max_wave))
          );
        }
        this.o_data_y.push(~~(this.c_height - data_v));
      }
      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }
    this.showData();
  }
  async randomize() {
    this.generate();
    super.randomize();
  }
}

export class CircularVisual extends Visualizer {
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
    this.center_x = ~~(this.c_width / 2);
    this.center_y = ~~(this.c_height / 2);
    this.radius = ~~(
      0.46 * (this.c_width > this.c_height ? this.c_height : this.c_width)
    );
  }
  static get modeName() {
    return "Circular Plot";
  }
  reset(canvas) {
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.center_x = ~~(this.c_width / 2);
    this.center_y = ~~(this.c_height / 2);
    this.radius = ~~(
      0.46 * (this.c_width > this.c_height ? this.c_height : this.c_width)
    );
  }
  drawData__LINE(arr_x = this.o_data_x, arr_y = this.o_data_y) {
    let l = arr_x.length;

    this.c.lineJoin = "round";
    this.c.lineWidth = 2;

    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    let nr = 0;
    this.c.beginPath();
    this.c.moveTo(this.center_x, this.center_y - this.radius);
    // this.c.lineTo(arr_x[0] + hcw, h - arr_y[0]);
    for (let i = 1; i < l; i++) {
      nr = ~~Math.abs(
        this.radius * Math.cos(i * s_angle - (arr_y[i] - 1) * s_angle)
      );
      this.c.lineTo(
        this.center_x + nr * Math.cos(half_pi - i * 2 * s_angle),
        this.center_y - nr * Math.sin(half_pi - i * 2 * s_angle)
      );
    }
    this.c.closePath();
    this.c.stroke();
  }
  drawData(x, y, index, l, no_color = false) {
    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    let nr = ~~Math.abs(
      this.radius * Math.cos(index * s_angle - (y - 1) * s_angle)
    );
    this.c.beginPath();
    if (this.isColor && !no_color) {
      let hue = ~~(360 * (1 - y / l));
      this.c.fillStyle = `hsl(${hue}, 100%, 50%)`;
      this.c.strokeStyle = this.c.fillStyle;
    }
    if (this.isDot) {
      this.c.arc(
        x,
        this.center_y,
        nr,
        -half_pi + index * 2 * s_angle,
        -half_pi + (index + 1) * 2 * s_angle
      );
      this.c.stroke();
      return;
    }
    this.c.moveTo(x, this.center_y);
    this.c.arc(
      x,
      this.center_y,
      nr,
      -half_pi + index * 2 * s_angle - 0.004,
      -half_pi + (index + 1) * 2 * s_angle + 0.004
    );
    this.c.fill();
  }
  showData(
    color = this.def_color,
    arr_y = this.o_data_y,
    arr_x = this.o_data_x
  ) {
    let h = this.c_height;
    this.c.fillStyle = color;
    this.c.strokeStyle = color;
    this.c.lineCap = "round";
    this.c.lineWidth = 5;
    this.c.clearRect(0, 0, this.c_width, h);
    if (this.isLine) {
      this.drawData__LINE(arr_x, arr_y);
      this.c.strokeStyle = this.def_color;
    } else
      for (let i = arr_x.length; i--; ) {
        this.drawData(arr_x[i], arr_y[i], i, arr_y.length);
      }
    this.c.fillStyle = this.def_color;
  }
  highLightedLine__LINE(indexes) {
    let l = this.o_data_y.length;
    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    for (
      let i = indexes.length;
      i--; //Draw Highlight

    ) {
      this.c.beginPath();
      let nr = 0;
      if (indexes[i]) {
        nr = ~~Math.abs(
          this.radius *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] - 1] - 1) * s_angle
            )
        );
        this.c.lineTo(
          this.center_x +
            nr * Math.cos(half_pi - (indexes[i] - 1) * 2 * s_angle),
          this.center_y -
            nr * Math.sin(half_pi - (indexes[i] - 1) * 2 * s_angle)
        );
      }
      nr = ~~Math.abs(
        this.radius *
          Math.cos(
            indexes[i] * s_angle - (this.o_data_y[indexes[i]] - 1) * s_angle
          )
      );
      this.c.lineTo(
        this.center_x + nr * Math.cos(half_pi - indexes[i] * 2 * s_angle),
        this.center_y - nr * Math.sin(half_pi - indexes[i] * 2 * s_angle)
      );
      if (indexes[i] !== this.o_data_y.length - 1) {
        nr = ~~Math.abs(
          this.radius *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] + 1] - 1) * s_angle
            )
        );
        this.c.lineTo(
          this.center_x +
            nr * Math.cos(half_pi - (indexes[i] + 1) * 2 * s_angle),
          this.center_y -
            nr * Math.sin(half_pi - (indexes[i] + 1) * 2 * s_angle)
        );
      }
      this.c.stroke();
    }
  }
  async highLightedLine(color = "#ff0505", ...indexes) {
    this.c.fillStyle = this.isColor ? "#000000" : color;
    this.c.strokeStyle = this.isColor ? "#000000" : color;

    if (this.isLine) {
      this.highLightedLine__LINE(indexes);
    } else
      for (
        let i = indexes.length;
        i--; //Draw Highlight

      )
        this.drawData(
          this.o_data_x[indexes[i]],
          this.o_data_y[indexes[i]],
          indexes[i],
          this.o_data_y.length,
          true
        );
    this.c.fillStyle = this.def_color;
    this.c.strokeStyle = this.def_color;
  }
  async update(anim = 1) {
    let n_num = this.num;
    let cur_l = this.o_data_x.length;

    for (let i = 0, l = n_num; i !== l; i++) {
      this.o_data_x[i] = this.center_x;
    }
    if (n_num < cur_l) {
      for (let i = cur_l; i > n_num; i--) {
        this.o_data_x.pop();
        this.o_data_y.splice(this.o_data_y.indexOf(i), 1);
      }
    } else {
      for (
        let i = cur_l, j, t;
        i < n_num;
        this.o_data_y[i] = i + 1,
          j = ~~(Math.random() * (this.o_data_y.length - 1)),
          t = this.o_data_y[i],
          this.o_data_y[i] = this.o_data_y[j],
          this.o_data_y[j] = t,
          i++
      );
      if (anim) await this.animData(this.o_data_y, cur_l, n_num);
    }
    this.showData();
  }
  async randomize() {
    await this.animData(this.o_data_y, 0, this.o_data_y.length, "down");
    this.o_data_x = [];
    this.o_data_y = [];
    await this.update(this.num);
  }
}

export class EllipticVisual extends CircularVisual {
  constructor(num, canvas, default_color) {
    super(num, canvas, default_color);
    this.center_x = ~~(this.c_width / 2);
    this.center_y = ~~(this.c_height / 2);
    this.radius_x = ~~(0.46 * this.c_width);
    this.radius_y = ~~(0.46 * this.c_height);
  }
  static get modeName() {
    return "Elliptic Plot";
  }
  reset(canvas) {
    this.o_data_x = [];
    this.o_data_y = [];
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.center_x = ~~(this.c_width / 2);
    this.center_y = ~~(this.c_height / 2);
    this.radius_x = ~~(0.46 * this.c_width);
    this.radius_y = ~~(0.46 * this.c_height);
  }
  drawData__LINE(arr_x = this.o_data_x, arr_y = this.o_data_y) {
    let l = arr_x.length;

    this.c.lineJoin = "round";
    this.c.lineWidth = 2;

    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    let nrx = 0,
      nry = 0;
    this.c.beginPath();
    this.c.moveTo(this.center_x, this.center_y - this.radius_y);
    for (let i = 1; i < l; i++) {
      nrx = ~~Math.abs(
        this.radius_x * Math.cos(i * s_angle - (arr_y[i] - 1) * s_angle)
      );
      nry = ~~Math.abs(
        this.radius_y * Math.cos(i * s_angle - (arr_y[i] - 1) * s_angle)
      );
      this.c.lineTo(
        this.center_x + nrx * Math.cos(half_pi - i * 2 * s_angle),
        this.center_y - nry * Math.sin(half_pi - i * 2 * s_angle)
      );
    }
    this.c.closePath();
    this.c.stroke();
  }
  drawData(x, y, index, l, no_color = false) {
    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    let t = Math.abs(Math.cos(index * s_angle - (y - 1) * s_angle));
    let nrx = ~~(this.radius_x * t);
    let nry = ~~(this.radius_y * t);
    this.c.beginPath();
    if (this.isColor && !no_color) {
      let hue = ~~(360 * (1 - y / l));
      this.c.fillStyle = `hsl(${hue}, 100%, 50%)`;
      this.c.strokeStyle = this.c.fillStyle;
    }
    if (this.isDot) {
      this.c.ellipse(
        x,
        this.center_y,
        nrx,
        nry,
        0,
        -half_pi + index * 2 * s_angle,
        -half_pi + (index + 1) * 2 * s_angle
      );
      this.c.stroke();
      return;
    }
    this.c.moveTo(x, this.center_y);
    this.c.ellipse(
      x,
      this.center_y,
      nrx,
      nry,
      0,
      -half_pi + index * 2 * s_angle - 0.004,
      -half_pi + (index + 1) * 2 * s_angle + 0.004
    );
    this.c.fill();
  }
  highLightedLine__LINE(indexes) {
    let l = this.o_data_y.length;
    let s_angle = Math.PI / l;
    let half_pi = Math.PI / 2;
    let nrx = 0,
      nry = 0;
    for (
      let i = indexes.length;
      i--; //Draw Highlight

    ) {
      this.c.beginPath();

      if (indexes[i]) {
        nrx = ~~Math.abs(
          this.radius_x *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] - 1] - 1) * s_angle
            )
        );
        nry = ~~Math.abs(
          this.radius_y *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] - 1] - 1) * s_angle
            )
        );
        this.c.lineTo(
          this.center_x +
            nrx * Math.cos(half_pi - (indexes[i] - 1) * 2 * s_angle),
          this.center_y -
            nry * Math.sin(half_pi - (indexes[i] - 1) * 2 * s_angle)
        );
      }
      nrx = ~~Math.abs(
        this.radius_x *
          Math.cos(
            indexes[i] * s_angle - (this.o_data_y[indexes[i]] - 1) * s_angle
          )
      );
      nry = ~~Math.abs(
        this.radius_y *
          Math.cos(
            indexes[i] * s_angle - (this.o_data_y[indexes[i]] - 1) * s_angle
          )
      );
      this.c.lineTo(
        this.center_x + nrx * Math.cos(half_pi - indexes[i] * 2 * s_angle),
        this.center_y - nry * Math.sin(half_pi - indexes[i] * 2 * s_angle)
      );
      if (indexes[i] !== this.o_data_y.length - 1) {
        nrx = ~~Math.abs(
          this.radius_x *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] + 1] - 1) * s_angle
            )
        );
        nry = ~~Math.abs(
          this.radius_y *
            Math.cos(
              indexes[i] * s_angle -
                (this.o_data_y[indexes[i] + 1] - 1) * s_angle
            )
        );
        this.c.lineTo(
          this.center_x +
            nrx * Math.cos(half_pi - (indexes[i] + 1) * 2 * s_angle),
          this.center_y -
            nry * Math.sin(half_pi - (indexes[i] + 1) * 2 * s_angle)
        );
      }
      this.c.stroke();
    }
  }
}
