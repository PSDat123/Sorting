'use strict';
let sortContainer = new Map();

//#region Bubble Sort
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
          arr[i + 1] = temp;
          // [arr[i][1], arr[i+1][1]] = [arr[i+1][1], arr[i][1]];
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
  },
});
//#endregion

//#region Comb Sort
sortContainer.set("Comb sort".toLowerCase(), {
  family: "Comb sort",
  name: "Comb sort",
  sort: async (visual, arr) =>{
    visual.status = 1;

    let max = arr.length - 1,
      gap = ~~((arr.length * 10) / 13),
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
          arr[i + gap] = temp;
          // [arr[i][1], arr[i+1][1]] = [arr[i+1][1], arr[i][1]];

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
    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }
    visual.showData("#00ff00", arr);
    return arr;
  }
});
//#endregion

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
          arr[i - 1] = temp;
          // [arr[i][1], arr[i-1][1]] = [arr[i-1][1], arr[i][1]];
        } else {
          max++;
          i = max + 1;
          // count = 0;
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
});
//#endregion

//#region Merge Sort
sortContainer.set("Merge Sort".toLowerCase(),{
  family: "Merge Sort",
  name: "Merge Sort",
  sort: async (visual, arr) =>{
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
    if (t === -1){
      visual.showData(undefined, arr);
      return arr;
    }
    visual.showData("#00ff00", arr);
    return arr
  }
});
//#endregion

//#region Shell Sort
sortContainer.set("Shell Sort".toLowerCase(), {
  family: "Shell Sort",
  name: "Shell Sort",
  sort: async (visual, arr) =>{
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
        if (
          temp_index - gap >= 0 &&
          arr[temp_index] < arr[temp_index - gap]
        ) {
          temp = arr[temp_index];
          arr[temp_index] = arr[temp_index - gap];
          arr[temp_index - gap] = temp;
          // [arr[temp_index][1], arr[temp_index - gap][1]] = [arr[temp_index - gap][1], arr[temp_index][1]];
          temp_index -= gap;
        } else {
          i++;
          temp_index = i;
        }
        visual.showData(undefined, arr);
        visual.highLightedLine(
          "#ff0505",
          temp_index - gap * (temp_index >= gap)
        );
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
});
//#endregion

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
          if (
            (inc > 0 && arr[i] > arr[i + inc]) ||
            (inc < 0 && arr[i] < arr[i - 1])
          ) {
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
});
//#endregion

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
    };
    //Lomuto Partition
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
        con_j = 0;
      //#region --Random pivot--
      var ran = ~~((r + l) / 2);
      // temp = arr[ran][1]; //swap
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
          if (i >= j) return j;
          else {
            con_i = 0;
            con_j = 0;
            if (i === ran) ran = j;
            else if (j === ran) ran = i;
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
});
//#endregion

//#region LSD Radix Sort
sortContainer.set("LSD Radix Sort".toLowerCase(), {
  family: "Radix Sort",
  name: "LSD Radix Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let num_len = ~~Math.log10(Math.max.apply(null, arr)) + 1;

    let countSort = async (n) => {
      let range = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //base 10
        temp_arr = [];
      for (let i = 0; i < arr.length; i++) {
        await visual.sleep();
        if (!visual.status) return 0;
        range[~~((arr[i] % 10 ** n) / 10 ** (n - 1))]++;
        visual.showData(undefined, arr);
        visual.highLightedLine("#ff0505", i);
        // await here
      }
      for (let i = 1; i < range.length; i++) {
        range[i] += range[i - 1];
        // await visual.sleep();
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
        let t = ~~((arr[i] % 10 ** n) / 10 ** (n - 1));
        temp_arr[range[t]] = arr[i];
        range[t]++;
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
});

//#endregion

//#region In-Place Radix
sortContainer.set("In-Place LSD Radix Sort".toLowerCase(), {
  family: "Radix Sort",
  name: "In-Place LSD Radix Sort",
  sort: async (visual, arr) => {

    return arr;
  },
});
//#endregion
export { sortContainer };
