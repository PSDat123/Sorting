"use strict";
export default class Method {
  constructor(num, data, canvas) {
    this.c = canvas.getContext("2d", { alpha: false });
    this.data = data;
    this.c_height = canvas.height;
    this.c_width = canvas.width;
    this.num = num;
    this.col_w = this.c_width / this.num;
    this.status = 0;
    this.speed = 1;
    this.description = Object.keys(Method.prototype)
      .map((s) =>
        s
          .split(" ")
          .map((s1) => s1[0].toUpperCase() + s1.substr(1))
          .join(" ")
      )
      .sort();
    this.mode = "column";
  }
  async sleep() {
    return new Promise(requestAnimationFrame);
  }

  //#region Drawing to canvas
  set_fill(style = "#f0f0f0") {
    this.c.fillStyle = style;
  }
  showData() {
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    this.c.clearRect(0, 0, this.c_width, this.c_height);
    for (let i = this.data.length; i--; ) {
      this.c.fillRect(
        this.data[i][0] - 1,
        h - this.data[i][1],
        cw,
        this.data[i][1]
      );
    }
  }
  redLine(color = "#ff0505", ...data_pair) {
    this.set_fill(color);
    let h = this.c_height,
      cw = ~~this.col_w + 1;
    for (let i = data_pair.length; i--; )
      this.c.fillRect(
        data_pair[i][0] - 1,
        h - data_pair[i][1],
        cw,
        data_pair[i][1]
      );
    this.set_fill();
  }
  //#endregion

  //#region Shuffling
  async shuffle() {}
  //#endregion

  //#region Animated Randomize
  async randomize() {
    this.set_fill();
    let stime = 10,
      count = 0;
    for (let i = 0; i < stime * stime; i++) {
      await this.sleep();
      count = 0;
      for (let j = 0; j < this.data.length; j++) {
        if (this.data[j][1] <= 1) {
          count++;
          this.data[j][1] = 0;
        } else this.data[j][1] -= this.data[j][1] / stime;
      }
      this.showData();
      if (count === this.data.length) break;
    }
    this.data = [];
    await this.setRandomData();
  }
  async setRandomData() {
    this.set_fill();
    this.col_w = this.c_width / this.num;
    let cur_l = this.data.length,
      min_h = 5,
      num = this.num;
    if (num < cur_l) {
      for (let i = cur_l - this.num; i--; ) {
        this.data.pop();
      }
      return;
    }
    let temp = [];
    // for (let i = 0; i < this.num - cur_l * (this.num >= cur_l); i++) {
    for (let i = 0, a = num - cur_l; i < a; i++) {
      temp.push([
        cur_l + i,
        ~~(Math.random() * (this.c_height - 5)) + min_h,
        //cos//~~(this.c_height - (Math.cos(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
        //sin//~~(this.c_height - (Math.sin(this.data.length / 10) + 1) * (this.c_height/2 - min_h/2))
      ]);
      this.data.push([~~(i * this.col_w), 0]);
    }
    await this.anim_data(temp, 12, cur_l, num);
  }
  async anim_data(_temp, _stime, start, end) {
    let stime = _stime,
      count = 0,
      temp = _temp;
    for (let i = 0; i < stime * stime; i++) {
      await this.sleep();
      count = 0;
      this.showData();
      for (let j = 0; j < end - start; j++) {
        if (this.data[start + j][1] >= temp[j][1]) {
          count++;
          this.data[start + j][1] = temp[j][1];
        } else
          this.data[start + j][1] =
            this.data[start + j][1] + temp[j][1] / stime;
      }
      if (count === end - start) break;
    }
    this.showData();
  }
  //#endregion

  callBack() {}

  end_sort() {
    this.c.fillStyle = "#00ff00";
    this.showData();
    this.status = 0;
    this.callBack();
  }
}

//#region Bubble Sort
Method.prototype["Bubble sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let count = 0,
    i = 0,
    max = this.num,
    temp = 0;
  let main = async () => {
    for (;;) {
      await this.sleep();
      if (!this.status) return 0;
      this.showData();
      this.redLine("#ff0505", this.data[i]);
      if (i + 1 < max && this.data[i][1] > this.data[i + 1][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i + 1][1];
        this.data[i + 1][1] = temp;
        // [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];
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
    this.showData();
    return;
  }
  this.end_sort();
};
//#endregion

//#region Comb Sort
Method.prototype["Comb sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let max = this.data.length - 1,
    gap = ~~((this.data.length * 10) / 13),
    i = 0,
    temp = 0,
    count = 0,
    con = 0,
    pgap = gap;

  let main = async () => {
    for (;;) {
      await this.sleep();
      if (!this.status) return 0;
      this.showData();
      this.redLine("#ff0505", this.data[i]);
      if (i + gap <= max && this.data[i][1] > this.data[i + gap][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i + gap][1];
        this.data[i + gap][1] = temp;
        // [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];

        if (con) gap = pgap;
        con = 0;
        count = 0;
      } else {
        count++;
      }
      if (i + gap <= max) this.redLine("#ff0505", this.data[i + gap]);
      i++;
      if (i + gap > max) {
        i = 0;
        pgap = gap;
        gap = ~~((gap * 10) / 13);
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
};
//#endregion

//#region Insertion Sort
Method.prototype["Insertion sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let max = 1,
    i = max + 1,
    temp = 0;
  let main = async () => {
    for (;;) {
      await this.sleep();
      if (!this.status) return 0;
      this.showData();
      this.redLine("#ff0505", this.data[i - 1]);
      i--;
      if (i - 1 >= 0 && this.data[i][1] < this.data[i - 1][1]) {
        temp = this.data[i][1];
        this.data[i][1] = this.data[i - 1][1];
        this.data[i - 1][1] = temp;
        // [this.data[i][1], this.data[i-1][1]] = [this.data[i-1][1], this.data[i][1]];
      } else {
        max++;
        i = max + 1;
        // count = 0;
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
};
//#endregion

//#region Merge Sort
Method.prototype["Merge sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let merge_sort = async (l, r) => {
    if (!this.status) return -1;
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
    let temp_arr = [];
    for (let dl = 0, dr = 0; dl + dr < il; dl++, dr++) {
      await this.sleep();
      if (!this.status) return -1;
      this.showData();
      if (R[dr]?.[1] === undefined || L[dl]?.[1] < R[dr]?.[1]) {
        temp_arr.push(L[dl][1]);
        this.redLine("#ff0505", this.data[dl + l], this.data[m + dr]);
        dr--;
      } else {
        temp_arr.push(R[dr][1]);
        // this.data[dl + dr + l] = [this.data[dl + dr + l][0], R[dr][1]];
        this.redLine("#ff0505", this.data[dl + l], this.data[m + dr]);
        dl--;
      }
    }
    for (let i = 0; i < temp_arr.length; i++) {
      await this.sleep();
      if (!this.status) return -1;

      this.data[l + i][1] = temp_arr[i];
      this.showData();
      this.redLine("#ff0505", this.data[l + i]);
    }
  };
  let t = (await merge_sort(0, this.data.length - 1)) || 1;
  this.showData();
  if (t === -1) return;
  this.end_sort();
};
//#endregion

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
      await this.sleep();
      if (!this.status) return 0;
      if (
        temp_index - gap >= 0 &&
        this.data[temp_index][1] < this.data[temp_index - gap][1]
      ) {
        temp = this.data[temp_index][1];
        this.data[temp_index][1] = this.data[temp_index - gap][1];
        this.data[temp_index - gap][1] = temp;
        // [this.data[temp_index][1], this.data[temp_index - gap][1]] = [this.data[temp_index - gap][1], this.data[temp_index][1]];
        temp_index -= gap;
        // changes++;
        // if (con) gap = pgap;
        // con = 0;
      } else {
        i++;
        temp_index = i;
      }
      this.showData();
      this.redLine(
        "#ff0505",
        this.data[temp_index - gap * (temp_index >= gap)]
      );
      if (i >= max) {
        gap = ~~(gap / 2);
        i = gap;
        temp_index = gap;
        // pgap = gap;
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
      this.redLine("#ff0505", this.data[i]);
    }
  };
  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
};
//#endregion

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
      await this.sleep();
      if (!this.status) return 0;
      this.showData();
      this.redLine("#ff0505", this.data[i]);

      if (min <= i + inc && i + inc <= max) {
        if (
          (inc > 0 && this.data[i][1] > this.data[i + inc][1]) ||
          (inc < 0 && this.data[i][1] < this.data[i - 1][1])
        ) {
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
};
//#endregion

//#region Quick Sort
Method.prototype["Quick Sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let temp = 0;

  let quickSort = async (l, r) => {
    if (!this.status) return -1;
    if (l < r) {
      let pivot_index = await partition_h(l, r);
      if (pivot_index === -1) return pivot_index;
      await quickSort(l, pivot_index);
      await quickSort(pivot_index + 1, r);
    }
    if (!this.status) return -1;
  };
  //Lomuto Partition
  // let partition_l = async (l, r) => {
  // 	let pivot_value = this.data[r][1];
  // 	let temp = 0;
  // 	let i = l, j = 0;

  // 	for(j = l; j < r; j++){
  // 		await this.sleep();
  // 		this.showData();
  // 		this.redLine("#ff0505", this.data[i]);
  // 		this.redLine("#ff0505", this.data[j]);
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
      con_j = 0;
    //#region --Random pivot--
    var ran = ~~((r + l) / 2);
    // temp = this.data[ran][1]; //swap
    // this.data[ran][1] = this.data[l][1];
    // this.data[l][1] = temp;

    //#endregion
    let pivot_value = this.data[ran][1];
    let i = l - 1,
      j = r + 1;

    for (;;) {
      await this.sleep();
      if (!this.status) return -1;
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
      this.redLine("#68f571", this.data[ran]);
      this.redLine("#ff0505", this.data[i], this.data[j - 1 * !con_i]);
      if (con_i && con_j) {
        if (i >= j) return j;
        else {
          con_i = 0;
          con_j = 0;
          if (i === ran) ran = j;
          else if (j === ran) ran = i;
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
};
//#endregion

//#region Radix Sort
Method.prototype["Radix Sort".toLowerCase()] = async function () {
  this.set_fill();
  this.status = 1;

  let num_len = ~~Math.log10(this.c_height) + 1;

  let count_sort = async (n) => {
    let range = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      temp_arr = [];
    for (let i = 0; i < this.data.length; i++) {
      await this.sleep();
      if (!this.status) return 0;
      range[~~((this.data[i][1] % 10 ** n) / 10 ** (n - 1))]++;
      this.showData();
      this.redLine("#ff0505", this.data[i]);
      // await here
    }
    for (let i = 1; i < range.length; i++) {
      range[i] += range[i - 1];
      // await this.sleep();
    }
    range.unshift(0);
    range.pop();

    let bucket = [],
      bucket_len = [];
    for (let i = 0, l = range.length; i !== l; i++) {
      bucket.push(range[i]);
      if (range[i] < this.num) this.redLine("#ff0505", this.data[range[i]]);
      if (i !== 0) {
        if (i === l - 1) {
          bucket_len[i] = this.num - bucket[i];
        }
        bucket_len[i - 1] = bucket[i] - bucket[i - 1];
      }
    }

    for (let i = 0, l = this.data.length; i !== l; i++) {
      let t = ~~((this.data[i][1] % 10 ** n) / 10 ** (n - 1));
      temp_arr[range[t]] = this.data[i][1];
      range[t]++;
    }
    for (;;) {
      await this.sleep();
      if (!this.status) return 0;
      let _n = 0;
      this.showData();
      for (let i = 0, l = bucket.length; i !== l; i++) {
        if (bucket_len[i]) {
          this.data[bucket[i]][1] = temp_arr[bucket[i]];
          this.redLine("#ff0505", this.data[bucket[i]]);
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
      if (!this.status) return 0;
      await count_sort(n);
    }
    return this.status ? 1 : 0;
  };
  let t = await main();
  this.showData();
  if (!t) return;
  this.end_sort();
};

//#endregion

//#region ______ARCHIVE_____

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
