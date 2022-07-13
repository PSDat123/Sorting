"use strict";
import MaxHeap from "./Heap"
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
      temp = 0,
      st = 0;
    for (;;) {
      if (await visual.sleep()){
        visual.showData(undefined, arr);
        visual.highLightedLine(undefined, i);
      }
      if (!visual.status) break;
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
        st = 1;
        break;
      }
      i++;
      if (i === max) {
        max -= count;
        count = 0;
        i = 0;
      }
    }
    if (!st) visual.showData(undefined, arr);
    else visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Comb Sort
sortContainer.set("Comb sort".toLowerCase(), {
  family: "Comb sort",
  name: "Comb sort",
  sort: async (visual, arr) => {
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
        let tmp = await visual.sleep();
        if (!visual.status) return 0;
        if(tmp){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i);
        }
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
        if (i + gap <= max && tmp) visual.highLightedLine(undefined, i + gap);
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
    visual.finishSort(arr);
    return arr;
  },
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
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i - 1);
        }
        if (!visual.status) return 0;
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
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Merge Sort
sortContainer.set("Merge Sort".toLowerCase(), {
  family: "Merge Sort",
  name: "Merge Sort",
  sort: async (visual, arr) => {
    visual.status = 1;

    let mergeSort = async (l, r) => {
      if (!visual.status) return -1;
      if (l < r) {
        let m = ~~(l + (r - l) / 2);
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
        let tmp = await visual.sleep();
        if (!visual.status) return -1;
        if(tmp) visual.showData(undefined, arr);
        if (R[dr] === undefined || L[dl] < R[dr]) {
          temp_arr.push(L[dl]);
          if(tmp) visual.highLightedLine(undefined, dl + l, m + dr);
          dr--;
        } else {
          temp_arr.push(R[dr]);
          if(tmp) visual.highLightedLine(undefined, dl + l, m + dr);
          dl--;
        }
      }
      for (let i = 0; i < temp_arr.length; i++) {
        arr[l + i] = temp_arr[i];
        if (await visual.sleep()) {
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, l + i);
        }
        if (!visual.status) return -1;
      }
    };
    let t = (await mergeSort(0, arr.length - 1)) || 1;
    if (t === -1) {
      visual.showData(undefined, arr);
      return arr;
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

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
        
        if (temp_index - gap >= 0 && arr[temp_index] < arr[temp_index - gap]) {
          temp = arr[temp_index];
          arr[temp_index] = arr[temp_index - gap];
          arr[temp_index - gap] = temp;
          // [arr[temp_index][1], arr[temp_index - gap][1]] = [arr[temp_index - gap][1], arr[temp_index][1]];
          temp_index -= gap;
        } else {
          i++;
          temp_index = i;
        }
        let tmp = await visual.sleep();
        if (tmp){
          visual.showData(undefined, arr);
          visual.highLightedLine(
            undefined,
            temp_index - gap * (temp_index >= gap)
          );
        }
        if (!visual.status) return 0;
        if (i >= max) {
          gap = ~~(gap / 2);
          i = gap;
          temp_index = gap;
          if (gap < 1) {
            return 1;
          }
        }
        if(tmp) visual.highLightedLine(undefined, i);
      }
    };
    let t = await main();
    if (!t) {
      visual.showData(undefined, arr);
      return arr;
    }
    visual.finishSort(arr);
    return arr;
  },
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
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i);
        }
        if (!visual.status) return 0;
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
    visual.finishSort(arr);
    return arr;
  },
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
    // 		this.redLine(undefined, arr[i]);
    // 		this.redLine(undefined, arr[j]);
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
      var ran = ~~(l + (r - l) / 2);
      // temp = arr[ran][1]; //swap
      // arr[ran][1] = arr[l][1];
      // arr[l][1] = temp;
      //#endregion
      let pivot_value = arr[ran];
      let i = l - 1,
        j = r + 1;

      for (;;) {
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
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(visual.highLightColor[1], ran);
          visual.highLightedLine(undefined, i, j - 1 * !con_i);
        }
        if (!visual.status) return -1;
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
    visual.finishSort(arr);
    return arr;
  },
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
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i);
        }
        if (!visual.status) return 0;
        range[~~((arr[i] % 10 ** n) / 10 ** (n - 1))]++;
        
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
        if (range[i] < arr.length) visual.highLightedLine(undefined, range[i]);
        if (i !== 0) {
          if (i === l - 1) {
            bucket_len[i] = arr.length - bucket[i];
          }
          bucket_len[i - 1] = bucket[i] - bucket[i - 1];
        }
      }

      for (let i = 0, l = arr.length; i !== l; i++) {
        let digit = ~~((arr[i] % 10 ** n) / 10 ** (n - 1));
        temp_arr[range[digit]] = arr[i];
        range[digit]++;
      }
      for (;;) {
        let tmp = await visual.sleep();
        if (!visual.status) return 0;
        let _n = 0;
        if (tmp) visual.showData(undefined, arr);
        for (let i = 0, l = bucket.length; i !== l; i++) {
          if (bucket_len[i]) {
            arr[bucket[i]] = temp_arr[bucket[i]];
            if(tmp) visual.highLightedLine(undefined, bucket[i]);
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
    visual.finishSort(arr);
    return arr;
  },
});

//#endregion

//#region In-Place Radix Sort
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
        let digit = ~~((arr[cur_pos] % 10 ** n) / 10 ** (n - 1));
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, cur_pos, ...bucket_index);
        }
        if (!visual.status) {
          visual.showData(undefined, arr);
          return arr;
        }
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
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Selection Sort
sortContainer.set("Selection Sort".toLowerCase(), {
  family: "Selection Sort",
  name: "Selection Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let len = arr.length;
    let cur_lowest_i = 0;
    for (let cur_pos = 0; cur_pos < len; cur_pos++) {
      for (let i = cur_pos; i < len; i++) {
        if (arr[i] < arr[cur_lowest_i]) cur_lowest_i = i;
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(visual.highLightColor[1], cur_lowest_i);
          visual.highLightedLine(undefined, i, cur_pos);
        }
        if (!visual.status) {
          visual.showData(undefined, arr);
          return arr;
        }  
      }
      let temp = arr[cur_pos];
      arr[cur_pos] = arr[cur_lowest_i];
      arr[cur_lowest_i] = temp;
      cur_lowest_i = cur_pos + 1;
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Bitonic Sort
sortContainer.set("Bitonic Sort".toLowerCase(), {
  family: "Bitonic Sort",
  name: "Bitonic Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let ascend = true;
    let compAndSwap = async (i, j, dir) => {
      if (dir == arr[i] > arr[j]) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      if (await visual.sleep()) {
        visual.showData(undefined, arr);
        visual.highLightedLine(undefined, i, j);
      }
      if (!visual.status) return 1;
      return 0;
    };
    let greatestPowerOfTwoLessThan = (num) => {
      let k = 1;
      while (k > 0 && k < num) {
        k = k << 1;
      }
      return k >>> 1;
    };
    let bitonicSort = async (first, l, dir) => {
      if (!visual.status) return 1;
      if (l > 1) {
        let hl = ~~(l / 2);

        await bitonicSort(first, hl, !dir);
        await bitonicSort(first + hl, l - hl, dir);

        await bitonicMerge(first, l, dir);
      }
      if (!visual.status) return 1;
    };
    let bitonicMerge = async (first, l, dir) => {
      if (!visual.status) return 1;
      if (l > 1) {
        let p = greatestPowerOfTwoLessThan(l);
        for (let i = first; i < first + l - p; i++) {
          if (await compAndSwap(i, i + p, dir)) return 1;
        }
        await bitonicMerge(first, p, dir);
        await bitonicMerge(first + p, l - p, dir);
      }
    };

    if (await bitonicSort(0, arr.length, ascend))
      visual.showData(undefined, arr);
    else visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Odd Even Sort
sortContainer.set("Odd Even Sort".toLowerCase(), {
  family: "Odd Even Sort",
  name: "Odd Even Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let isSorted = false;
    while (!isSorted) {
      isSorted = true;
      for (let i = 0; i < arr.length - 1; i = i + 2) {
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i);
        }
        if (!visual.status) {
          visual.showData(undefined, arr);
          return arr;
        }
        
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          isSorted = false;
        }
      }
      for (let i = 1; i < arr.length - 1; i += 2) {
        if (await visual.sleep()){
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, i);
        }
        if (!visual.status) {
          visual.showData(undefined, arr);
          return arr;
        }
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          isSorted = false;
        }
      }
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Gnome Sort
sortContainer.set("Gnome Sort".toLowerCase(), {
  family: "Gnome Sort",
  name: "Gnome Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    let l = arr.length,
      i = 0;
    while(i < l){
      if (await visual.sleep()){
        visual.showData(undefined, arr);
        visual.highLightedLine(undefined, i);
      }
      if (!visual.status) {
        visual.showData(undefined, arr);
        return arr;
      }
      if(!i) i++;
      if(arr[i] >= arr[i - 1]) i++;
      else{
        let tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        i--;
      }
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Binary Insertion Sort
sortContainer.set("Binary Insertion Sort".toLowerCase(), {
  family: "Insertion Sort",
  name: "Binary Insertion Sort",
  sort: async (visual, arr) => {
    visual.status = 1;
    
    let binarySearchAndInsert = async (index ,L, R) => {
      let M = ~~(L + (R - L) / 2);
      if (!visual.status) {
        return -1;
      }
      if (await visual.sleep()) {
        visual.showData(undefined, arr);
        visual.highLightedLine(undefined, index);
        visual.highLightedLine(visual.highLightColor[1], M);
      }
      if(L >= R){
        for (
          let i = index,
            tmp = arr[i],
            con = M + 1 * (arr[index] > arr[M]);
          i !== con;
          arr[i] = arr[--i], arr[i] = tmp
        );
        return
      }
      if (arr[index] === arr[M]) {
        for (
          let i = index, tmp = arr[i];
          i !== M + 1;
          arr[i] = arr[--i], arr[i] = tmp
        );
        return;
      }
      return arr[index] > arr[M]
          ? await binarySearchAndInsert(index, M + 1, R)
          : await binarySearchAndInsert(index, L, M - 1);
    }
    for(let i = 1; i < arr.length; i++){
      let st = await binarySearchAndInsert(i, 0, i - 1);
      if(st === -1){
        visual.showData(undefined, arr);
        return arr;
      }
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

//#region Heap Sort
sortContainer.set("Heap Sort".toLowerCase(), {
  family: "Heap Sort",
  name: "Heap Sort",
  sort: async (visual, arr) => {
    visual.status = 1;

    let heap = new MaxHeap(arr);
    let n = arr.length

    let heapify = async (n, index) => {
      let largest_i = index;
      let l = heap.leftChildIndexOf(largest_i);
      let r = heap.rightChildIndexOf(largest_i);

      if (l < n && heap.items[l] > heap.items[largest_i]) largest_i = l;
      if (r < n && heap.items[r] > heap.items[largest_i]) largest_i = r;
      if (largest_i !== index) {
        heap.swap(largest_i, index);
        if (!visual.status) {
          return -1;
        }
        if (await visual.sleep()) {
          visual.showData(undefined, arr);
          visual.highLightedLine(undefined, largest_i);
          visual.highLightedLine(undefined, index);
        }
        return await heapify(n, largest_i);
      }
    };
    for (let i = heap.parentIndexOf(n); i >= 0; i--){
      let st = await heapify(n, i);
      if(st === -1){
        visual.showData(undefined, arr);
        return arr;
      }
    }

    for (let i = n - 1; i >= 0; --i) {
      heap.swap(i, 0);
      let st = await heapify(i, 0);
      if (st === -1) {
        visual.showData(undefined, arr);
        return arr;
      }
    }
    visual.finishSort(arr);
    return arr;
  },
});
//#endregion

export { sortContainer };
