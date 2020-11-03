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
		this.description = ["Bubble Sort", "Insertion Sort", "Merge Sort"].sort();
	}
	updatePara = function(){
		for (let i = 0; i < this.data.length; i++) {
			this.col_w = this.c_width / this.num;
			this.data[i][0] = i * this.col_w;
		}
	}
	showData = function(){
		c.clearRect(0, 0, this.c_width, this.c_height);
		for (let i = 0; i < this.num; i++) {
			c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		}
	}
	redLine = function(data_pair) {
		c.fillStyle = "#ff0000";
		c.fillRect(data_pair[0], this.c_height - data_pair[1], this.col_w, data_pair[1]);
		c.fillStyle = "#ffffff";
	}
	setRandomData = function(){
		this.col_w = this.c_width / this.num;
		let cur_l = this.data.length;
		if (this.num < cur_l){
			this.data = [];
		}
		for (let i = 0; i < this.num - cur_l * (this.num >= cur_l); i++) {
			this.data.push([i * this.col_w, Math.floor(this.c_height - Math.random() * this.c_height)]);
		}
	}
}
//Bubble sort
Method.prototype.bsort = function(){
	let i = 0;
	let max = this.num;
	c.fillStyle = "#ffffff";
	let count = 0;
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let main = () => {
		this.req = requestAnimationFrame(main);
		this.showData();
		this.redLine(this.data[i]);
		if(i + 1 < this.num && this.data[i][1] > this.data[i+1][1]){
			[this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];
			count = 0;
		}
		else{
			count++;
		}	
		if (count >= max){
			c.fillStyle = "#00ff00";
			this.showData();
			cancelAnimationFrame(this.req);	
			this.status = 0;	
			//End Timer
			const end = new Date().getTime();
			console.log(`End: ${end}`);
			console.log(`Time taken: ${end - start}ms`); //Time taken
		}
		i++;
		if(i >= max){
			max-= count;
			count = 0;
			i = 0;
		}
	}
	main();
}
//Insertion sort
Method.prototype.isort = function(){
	let max = 1;
	let i = max + 1;
	let count = 0;
	c.fillStyle = "#ffffff";
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let main = () => {
		this.req = requestAnimationFrame(main);
		i--;
		this.showData();
		this.redLine(this.data[i]);
		if(i - 1 >= 0 && this.data[i][1] < this.data[i-1][1]){
			[this.data[i][1], this.data[i-1][1]] = [this.data[i-1][1], this.data[i][1]];
		}
		else{
			max++;
			i=max + 1;
			count = 0;
		}
		if(max >= this.num) {
			c.fillStyle = "#00ff00";
			this.showData();
			cancelAnimationFrame(this.req);	
			this.status = 0;
			//End Timer
			let end = new Date().getTime();
			console.log(`End: ${end}`);
			console.log(`Time taken: ${end - start}ms`); //Time taken
		}
	}
	main();
}
//Merge Sort
Method.prototype.msort = function (){
	c.fillStyle = "#ffffff";
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
				c.fillStyle = "#00ff00";
				this.showData();
				cancelAnimationFrame(this.req);
				this.status = 0;

				//End Timer
				let end = new Date().getTime();
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
			c.fillStyle = "#ffffff";
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
			c.fillStyle = "#ffffff";
			//Red line
			this.redLine(this.data[l + l1 + l2]);
			con ? l2++ : l1++;
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