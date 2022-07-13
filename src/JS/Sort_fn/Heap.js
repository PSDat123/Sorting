export default class MaxHeap {
  constructor(arr) {
    this.items = arr;
    // this.buildHeap();
  }
  swap(index1, index2) {
    let t = this.items[index1];
    this.items[index1] = this.items[index2];
    this.items[index2] = t;
  }
  parentIndexOf(index) {
    return (index - 1) >> 1;
  }
  leftChildIndexOf(index) {
    return (index << 1) + 1;
  }
  rightChildIndexOf(index) {
    return (index << 1) + 2;
  }
  hasParent(index) {
    return this.parentIndexOf(index) < 0 ? false : true;
  }
  hasLeftChild(index) {
    return this.leftChildIndexOf(index) < this.items.length ? true : false;
  }
  hasRightChild(index) {
    return this.rightChildIndexOf(index) < this.items.length ? true : false;
  }
  shiftUp(index) {
    let p;
    while (index > 0) {
      p = this.parentIndexOf(index);
      if (this.items[p] < this.items[index]) {
        this.swap(p, index);
      }
      index = p;
    }
  }
  heapify(n, index) {
    let largest_i = index;
    let l = this.leftChildIndexOf(largest_i);
    let r = this.rightChildIndexOf(largest_i);

    if (l < n && this.items[l] > this.items[largest_i]) largest_i = l;
    if (r < n && this.items[r] > this.items[largest_i]) largest_i = r;
    if (largest_i !== index) {
      this.swap(largest_i, index);
      this.heapify(n, largest_i);
    }
  }
  buildHeap() {
    let n = this.items.length;
    for (let i = this.parentIndexOf(n); i >= 0; i--) this.heapify(n, i);
  }
  heapSort() {
    this.buildHeap();
    let n = this.items.length;
    for (let i = n - 1; i >= 0; --i) {
      this.swap(i, 0);
      this.heapify(i, 0);
    }
  }
}
