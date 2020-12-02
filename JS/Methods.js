'use strict';
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");

class Method{
	constructor(num, data, canvas){
		this.data = data;
		this.c_height = canvas.height;
		this.c_width = canvas.width;
		this.num = num;
		this.col_w = this.c_width / this.num;
		this.status = 0;
		this.req = 0;
		this.speed = 1;
		this.description = Object.keys(Method.prototype)
							.map(s => s.split(" ")
								.map(s1 => s1[0].toUpperCase() + s1.substr(1)).join(" ")).sort();
	}
	updatePara(){
		for (let i = 0; i < this.data.length; i++) {
			this.col_w = this.c_width / this.num;
			this.data[i][0] = i * this.col_w;
		}
	}
	showData(){
		c.clearRect(0, 0, this.c_width, this.c_height);
		for (let i = 0; i < this.num; i++) {
			// c.fillRect(this.data[i][0] - this.col_w / (this.c_width / this.num), this.c_height - this.data[i][1], this.col_w + this.col_w / (this.c_width / this.num), this.col_w + this.col_w / (this.c_width / this.num));
			c.fillRect(this.data[i][0] - this.col_w / (this.c_width / this.num), this.c_height - this.data[i][1], this.col_w + this.col_w / (this.c_width / this.num), this.data[i][1]);
		}
	}
	redLine(data_pair) {
		c.fillStyle = "#ff0505";
		c.fillRect(data_pair[0] - this.col_w / (this.c_width / this.num), this.c_height - data_pair[1], this.col_w + this.col_w / (this.c_width / this.num), data_pair[1]);
		this.set_default_fill();
	}
	setRandomData(){
		this.col_w = this.c_width / this.num;
		let cur_l = this.data.length;
		if (this.num < cur_l){
			for (let i = 0; i < - this.num + cur_l; i++) {
				this.data.pop();
			}
			return;
		}
		for (let i = 0; i < this.num - cur_l * (this.num >= cur_l); i++) {
			this.data.push([i * this.col_w, Math.floor(this.c_height - Math.random() * this.c_height)]);
			//cos//this.data.push([i * this.col_w, (this.c_height - (Math.cos(this.data.length / 10) + 1) * this.c_height/2 )]);
			//sin//this.data.push([i * this.col_w, (this.c_height - (Math.sin(this.data.length / 10) + 1) * this.c_height / 2)]);
		}
	}
	end_sort(){
		cancelAnimationFrame(this.req);
		c.fillStyle = "#00ff00";
		this.showData();
		this.status = 0;
		this.callBack();
	}
	set_default_fill(){
		c.fillStyle = "#f0f0f0";
	}
	callBack(){

	}
}
//Bubble sort
Method.prototype["Bubble sort".toLowerCase()] = function(){
	this.set_default_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let count = 0;
	let i = 0;
	let max = this.num;
	let temp = 0;
	let main = () => {
		this.req = requestAnimationFrame(main);
		this.showData();
		this.redLine(this.data[i]);
		for(let n = 0; n < this.speed; n++){
			if(i + 1 < max && this.data[i][1] > this.data[i+1][1]){
				temp = this.data[i][1];
				this.data[i][1] = this.data[i + 1][1];
				this.data[i + 1][1] = temp;
				// [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];
				count = 0;
			}
			else{
				count++;
			}	
			if (count >= max){
				this.end_sort();
				//End Timer
				const end = new Date().getTime();
				console.log(`End: ${end}`);
				console.log(`Time taken: ${end - start}ms`); //Time taken
				break;
			}
			i++;
			if(i >= max){
				max-= count;
				count = 0;
				i = 0;
			}
		}
	}
	main();
}
//Insertion sort
Method.prototype["Insertion sort".toLowerCase()] = function(){
	this.set_default_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let max = 1;
	let i = max + 1;
	let temp = 0;
	let main = () => {
		this.req = requestAnimationFrame(main);
		
		this.showData();
		this.redLine(this.data[i-1]);
		for(let n = 0; n < this.speed; n++){
			i--;
			if(i - 1 >= 0 && this.data[i][1] < this.data[i-1][1]){
				temp = this.data[i][1];
				this.data[i][1] = this.data[i - 1][1];
				this.data[i - 1][1] = temp;
				// [this.data[i][1], this.data[i-1][1]] = [this.data[i-1][1], this.data[i][1]];
			}
			else{
				max++;
				i=max + 1;
				// count = 0;
			}
			if(max >= this.num) {
				this.end_sort();
				//End Timer
				const end = new Date().getTime();
				console.log(`End: ${end}`);
				console.log(`Time taken: ${end - start}ms`); //Time taken
				break;
			}
		}
	}
	main();
}
//Merge Sort
Method.prototype["Merge sort".toLowerCase()] = function (){
	this.set_default_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let queue = [];
	(function merge_index(l,r){
		if(l<r){
			var m = Math.floor(l + (r - l) / 2);
			merge_index(l,m);
			merge_index(m+1, r);
			queue.push([l,m,r]);
		}
	})(0, this.data.length - 1);
	// console.log(queue);
	let q_i = 0
	let l = queue[q_i][0];
	let m = queue[q_i][1];
	let r = queue[q_i][2];
	let a1 = this.data.slice(l, m + 1);
	let a2 = this.data.slice(m + 1, r + 1);
	let l1 = 0, l2 = 0, con = 0;
	let main = () =>{
		this.req = requestAnimationFrame(main);
		if (l + l1 > m && m + 1 + l2 > r) {
			q_i++;
			if (q_i >= queue.length) {
				this.end_sort();
				//End Timer
				const end = new Date().getTime();
				console.log(`End: ${end}`);
				console.log(`Time taken: ${end - start}ms`); //Time taken
			}
			else {
				l = queue[q_i][0];
				m = queue[q_i][1];
				r = queue[q_i][2];
				a1 = this.data.slice(l, m + 1);
				a2 = this.data.slice(m + 1, r + 1);
				l1 = 0;
				l2 = 0;
			}
		}
		else if ((con = l + l1 > m) || m + 1 + l2 > r){
			this.data[l + l1 + l2] = [this.data[l + l1 + l2][0], con ? a2[l2][1] : a1[l1][1]];
			this.showData();
			c.fillStyle = "#00ffff";//cyan
			c.fillRect(this.data[m + 1][0], this.c_height - this.data[m + 1][1], this.col_w, this.data[m + 1][1]);
			this.set_default_fill();
			//Red line
			this.redLine(this.data[l + l1 + l2]);
			con? l2++ : l1++;
		}
		else{
			con = a1[l1][1] > a2[l2][1];
			this.data[l + l1 + l2] = [this.data[l + l1 + l2][0], con ? a2[l2][1] : a1[l1][1]];
			this.showData();
			c.fillStyle = "#00ffff";//cyan
			c.fillRect(this.data[m + 1][0], this.c_height - this.data[m + 1][1], this.col_w, this.data[m + 1][1]);
			this.set_default_fill();
			//Red line
			this.redLine(this.data[l + l1 + l2]);
			con ? l2++ : l1++;
		}
	} 
	main();
}
//Shell sort
Method.prototype["Shell sort".toLowerCase()] = function(){
	this.set_default_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let gap = Math.floor(this.data.length / 2);
	let i = gap, changes = 0;
	let temp_index = gap;
	let con = 0; //Finding-changes mode
	let temp = 0;
	let main = () =>{
		this.req = requestAnimationFrame(main);
		if((temp_index - gap)*((temp_index - gap) - this.data.length) <= 0 && this.data[temp_index][1] < this.data[temp_index - gap][1]){
			temp = this.data[temp_index][1];
			this.data[temp_index][1] = this.data[temp_index - gap][1];
			this.data[temp_index - gap][1] = temp;
			// [this.data[temp_index][1], this.data[temp_index - gap][1]] = [this.data[temp_index - gap][1], this.data[temp_index][1]];
			temp_index -= gap;
			changes++;
			if (con) gap = this.data.length / 4 ;
			con = 0;
		}
		else{
			i++;
			temp_index = i;
		}
		this.showData();
		this.redLine(this.data[temp_index - gap * (temp_index >= gap)]);
		if (i >= this.data.length) {
			if (con) {gap = 0; i = gap;}
			else (
				() => changes ? (() => {
					gap = Math.floor(gap / 2);
					i = gap;
					temp_index = gap;
				})() : 
				(() => {
					gap = 1; 
					con = 1;
					i = gap;
					temp_index = gap;
				})()
			)();
		}
		this.redLine(this.data[i]);
		if (gap <= 0) {
			this.end_sort();
			//End Timer
			const end = new Date().getTime();
			console.log(`End: ${end}`);
			console.log(`Time taken: ${end - start}ms`); //Time taken
		}
	}
	main();
}
//Cocktail Shaker Sort
Method.prototype["Cocktail sort".toLowerCase()] = function(){
	this.set_default_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let i = 0, min = 0, max = this.data.length - 1, inc = 1;
	let temp = 0, count = 0;
	let main = () => {
		this.req = requestAnimationFrame(main);
		this.showData();
		this.redLine(this.data[i]);
		for(let n = 0; n < this.speed; n++){
			if (min <= i + inc && i + inc <= max) {
				if ((inc > 0 && this.data[i][1] > this.data[i + inc][1]) || (inc < 0 && this.data[i][1] < this.data[i - 1][1])) {
					temp = this.data[i][1];
					this.data[i][1] = this.data[i + inc][1];
					this.data[i + inc][1] = temp;
					count = 0;
				}
				else{
					count++;
				}
				i += inc;
			}
			else{
				inc = -inc;
				i >= max ? (() => {
					max -= count;
					i = max;
				}
				)() : (() => {
					min += count;
					i = min;
				}
				)();
			}
			if(min > max){
				this.end_sort();
				//End Timer
				const end = new Date().getTime();
				console.log(`End: ${end}`);
				console.log(`Time taken: ${end - start}ms`); //Time taken
				break;
			}
		}
	}
	main();
}
//--Failed Stuffs--//

// Method.prototype.msort1 = function(){
// 	// this.status = 1;
// 	let merge = (arr, l, m, r) =>{
// 		// let c = [];
// 		let n1 = m - l + 1;
// 		let n2 = r - m;
// 		// console.log(this.data);
// 		let L = [], R = [];
// 		for (let i = 0; i < n1; i++)
// 			L[i] = arr[l + i];
// 		for (let j = 0; j < n2; j++)
// 			R[j] = arr[m + 1 + j];
// 		// let L = this.data.slice(l, m + 1);
// 		// // console.log(this.data.slice(l, l + n1));
// 		// let R = this.data.slice(m + 1, r + 1);
// 		// console.log(L,R);
// 		let  i = 0, j = 0,k = l;
// 		while(i < n1 && j < n2){
// 			if(L[i][1] <= R[j][1]){
// 				arr[k] = [arr[k][0],L[i][1]];
// 				// console.log(arr[k][1]);
// 				// c.push(b.shift());
// 				i++;
// 			}
// 			else{
// 				arr[k] = [arr[k][0], R[j][1]];
// 				// c.push(a.shift());
// 				j++;
// 			}
// 			k++;
// 		}
// 		while(i < n1){
// 			arr[k] = [arr[k][0], L[i][1]];
// 			k++;
// 			i++;
// 			// c.push(a.shift());
// 		}
// 		while(j < n2){
// 			arr[k] = [arr[k][0], R[j][1]];
// 			k++;
// 			j++;
// 			// c.push(b.shift());
// 		}
		
		
// 		this.data = arr;
// 		this.showData();
		
// 		// console.log(arr);
// 		// return c;
// 	}
// 	// let temp_a = this.data;
// 	let mergesort = (arr, l, r) =>{
// 		// var m = Math.floor(arr.length / 2)
// 		// if(arr.length == 1){
// 		// 	// console.log("sda");
// 		// 	return arr;
// 		// }

// 		if(l < r){
// 			let m = Math.floor(l + (r - l) / 2);

// 			setTimeout(() => {
// 				mergesort(arr, l, m);
// 			}, 5);
// 			setTimeout(() => {
// 				mergesort(arr, m + 1, r);
// 			}, 5);
			
// 			// console.log(this.data);
// 			setTimeout(() => {
// 				merge(arr, l, m, r);
// 			}, 5);
			
// 		}
// 	} 
	
// 	mergesort(this.data,0 , this.data.length - 1);
	
// }