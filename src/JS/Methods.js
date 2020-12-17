'use strict';

export default class Method{
	constructor(num, data, canvas){
		this.c = canvas.getContext("2d");
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
		for (var i = 0, l = this.data.length; i !== l; i++) {
			this.col_w = this.c_width / this.num;
			this.data[i][0] = i * this.col_w;
		}
	}
	showData(){
		this.c.clearRect(0, 0, this.c_width, this.c_height);
		var a = (this.col_w * this.num ) / this.c_width;
		for (var i = 0, l = this.data.length; i !== l; i++) {
			this.c.fillRect(this.data[i][0] - a, this.c_height - this.data[i][1], this.col_w + a, this.data[i][1]);
		}
	}
	redLine(data_pair, color = "#ff0505") {
		this.set_fill(color);
		this.c.fillRect(data_pair[0] - this.col_w / (this.c_width / this.num), this.c_height - data_pair[1], this.col_w + this.col_w / (this.c_width / this.num), data_pair[1]);
		this.set_fill();
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
			this.data.push([i * this.col_w, ~~(this.c_height - Math.random() * this.c_height)]);
			//cos//this.data.push([i * this.col_w, (this.c_height - (Math.cos(this.data.length / 10) + 1) * this.c_height/2 )]);
			//sin//this.data.push([i * this.col_w, (this.c_height - (Math.sin(this.data.length / 10) + 1) * this.c_height / 2)]);
		}
	}
	end_sort(){
		cancelAnimationFrame(this.req);
		this.c.fillStyle = "#00ff00";
		this.showData();
		this.status = 0;
		this.callBack();
	}
	set_fill(style="#f0f0f0"){
		this.c.fillStyle = style;
	}
	callBack(){

	}
}
//Bubble sort
Method.prototype["Bubble sort".toLowerCase()] = function(){
	this.set_fill();
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
		for(let n = 0, s = this.speed; n < s; n++){
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
//Comb sort
Method.prototype["Comb sort".toLowerCase()] = function () {
	this.set_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let max = this.data.length - 1;
	let gap = ~~((this.data.length * 10) / 13);
	let i = 0, temp = 0, count = 0, con = 0, pgap = gap;

	let main = () => {
		this.req = requestAnimationFrame(main);
		this.showData();
		this.redLine(this.data[i]);
		for (let n = 0, s = this.speed; n < s; n++) {
			if (i + gap <= max && this.data[i][1] > this.data[i + gap][1]) {
				temp = this.data[i][1];
				this.data[i][1] = this.data[i + gap][1];
				this.data[i + gap][1] = temp;
				// [this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];
				if(con) gap = pgap;
				con = 0;
				count = 0;
			}
			else {	
				count++;
			}
			if (n == s-1) this.redLine(this.data[i + gap]);	
			i++;
			if (i + gap > max) {
				i = 0;
				pgap = gap;
				gap = ~~((gap * 10) / 13);
				if (gap < 1 && count >= max) {
					this.end_sort();
					//End Timer
					const end = new Date().getTime();
					console.log(`End: ${end}`);
					console.log(`Time taken: ${end - start}ms`); //Time taken
					break;
				}
				else if (gap < 1 || count >= max - pgap) {
					con = 1;
					gap = 1;
				}
				count = 0;
			}
		}
	}
	main();
}
//Insertion sort
Method.prototype["Insertion sort".toLowerCase()] = function(){
	this.set_fill();
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
	this.set_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	function sleep(){
		return new Promise(requestAnimationFrame);
	}
	async function merge_sort(l,r){
		if(l < r){
			var m = ~~(l + (r - l) / 2);
			await merge_sort(l, m);
			await merge_sort(m + 1, r);

			await merge(l, m ,r);
		}
	}

	let merge = async (l, m, r) => {
		let L = this.data.slice(l, m + 1);
		let R = this.data.slice(m + 1, r + 1);
		let il = L.length + R.length;	
		for (let dl = 0, dr = 0; dl + dr < il; dl++, dr++){
			await sleep();
			this.showData();
			if (R[dr]?.[1] === undefined || L[dl]?.[1] < R[dr]?.[1]){
				this.data[dl + dr + l] = [this.data[dl + dr + l][0], L[dl][1]];
				this.redLine(this.data[dl + dr + l]);
				dr--;
			}
			else{
				this.data[dl + dr + l] = [this.data[dl + dr + l][0], R[dr][1]];
				this.redLine(this.data[dl + dr + l]);
				dl--;
			}		
		}
	}

	(async () => {
		await merge_sort(0, this.data.length - 1);
		this.end_sort();
		//End Timer
		const end = new Date().getTime();
		console.log(`End: ${end}`);
		console.log(`Time taken: ${end - start}ms`); //Time taken
	})();
}
//Shell sort
Method.prototype["Shell sort".toLowerCase()] = function(){
	this.set_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);

	let max = this.data.length;
	let gap = ~~(this.data.length / 2);
	let i = gap;
	let temp_index = gap, temp = 0;
	let main = () =>{
		this.req = requestAnimationFrame(main);
		if(0 <= temp_index - gap && this.data[temp_index][1] < this.data[temp_index - gap][1]){
			temp = this.data[temp_index][1];
			this.data[temp_index][1] = this.data[temp_index - gap][1];
			this.data[temp_index - gap][1] = temp;
			// [this.data[temp_index][1], this.data[temp_index - gap][1]] = [this.data[temp_index - gap][1], this.data[temp_index][1]];
			temp_index -= gap;
			// changes++;
			// if (con) gap = pgap;
			// con = 0;
		}
		else{
			i++;
			temp_index = i;
		}
		this.showData();
		this.redLine(this.data[temp_index - gap * (temp_index >= gap)]);
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
				this.end_sort();
				//End Timer
				const end = new Date().getTime();
				console.log(`End: ${end}`);
				console.log(`Time taken: ${end - start}ms`); //Time taken
			}
		}
		this.redLine(this.data[i]);
	}
	main();
}
//Cocktail Shaker Sort
Method.prototype["Cocktail sort".toLowerCase()] = function(){
	this.set_fill();
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
				if (i >= max){
					max -= count;
					i = max;
				}
				else{
					min += count;
					i = min;
				}
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

//Quick Sort
Method.prototype["Quick Sort".toLowerCase()] = function() {
	this.set_fill();
	this.status = 1;
	//Start Timer
	const start = new Date().getTime();
	console.log(`Start: ${start}`);
	function sleep() {
		return new Promise(requestAnimationFrame);
	}

	async function quickSort(l, r){
		if(l < r){
			let pivot_index = await partition_h(l, r);
			// if(br) return;
			await quickSort(l, pivot_index);
			await quickSort(pivot_index + 1, r);
		}
	}
	//Lomuto Partition
	let partition_l = async (l, r) => {
		let pivot_value = this.data[r][1];
		let temp = 0, count = 0;
		let i = l, j = 0;

		for(j = l; j < r; j++){
			await sleep();
			this.showData();
			this.redLine(this.data[i]);
			this.redLine(this.data[j]);
			if(this.data[j][1] <= pivot_value){
				temp = this.data[i][1]; //swap
				this.data[i][1] = this.data[j][1];
				this.data[j][1] = temp;
				i++;
				count++;
			}
		}
		temp = this.data[i][1]; //swap
		this.data[i][1] = this.data[r][1];
		this.data[r][1] = temp;
		return i;
	}

	//Hoare partition
	let partition_h = async (l, r) => {
		let pivot_value = this.data[l][1];
		let temp = 0, con_i = 0, con_j = 0;
		let i = l - 1, j = r + 1;
		
		while(true){
			await sleep();
			if(!con_i){
				i++;
				if (this.data[i][1] >= pivot_value){
					con_i = 1;
				}
			}
			if(con_i){
				j--;
				if (this.data[j][1] <= pivot_value){
					con_j = 1;
				}
			}
			this.showData();
			this.redLine(this.data[i]);
			this.redLine(this.data[j - 1 * !con_i]);
			
			if(con_i && con_j){
				if (i >= j) return j;
				else {
					con_i = 0;
					con_j = 0;
					temp = this.data[i][1]; //swap
					this.data[i][1] = this.data[j][1];
					this.data[j][1] = temp;
				}
			}	
		}
	}
	(async ()=>{
		await quickSort(0, this.data.length - 1);
		this.end_sort();
		//End Timer
		const end = new Date().getTime();
		console.log(`End: ${end}`);
		console.log(`Time taken: ${end - start}ms`); //Time taken
	})();
}

//  ______OLD_______

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
	// 	}
	// } 
	// main();
