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
		this.description = ["Bubble Sort", "Insertion Sort", "Merge Sort"];
	}
	updatePara = function(){
		this.col_w = this.c_width / this.num;
		for (let i = 0; i < this.data.length; i++) {
			this.data[i][0] = i * this.col_w;
		}
	}
	showData = function(){
		c.clearRect(0, 0, this.c_width, this.c_height);
		for (let i = 0; i < this.num; i++) {
			c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		}
	}
	setRandomData = function(){
		this.col_w = this.c_width / this.num;
		let cur_l = this.data.length;
		for (let i = 0; i < this.num - cur_l; i++) {
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
		c.fillStyle = "#ff0000";
		c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		c.fillStyle = "#ffffff";
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
			// console.log(`Count: ${count} | Max = ${max}`);
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
		c.fillStyle = "#ff0000";
		c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		c.fillStyle = "#ffffff"
		if(i - 1 >= 0 && this.data[i][1] < this.data[i-1][1]){
			[this.data[i][1], this.data[i-1][1]] = [this.data[i-1][1], this.data[i][1]];
		}
		else{
			// console.log(`Count: ${count} | Max = ${max}`);
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

Method.prototype.msort = function(){
	
}