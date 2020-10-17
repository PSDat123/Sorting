class Method{
	constructor(funcs, num, data, canvas){
		this.c = funcs;
		this.data = data;
		this.c_height = canvas.height;
		this.c_width = canvas.width;
		this.num = num;
		this.col_w = this.c_width / this.num;
		this.status = 0;
	}

	updatePara(){
		this.col_w = this.c_width / this.num;
		for(let i = 0; i < this.data.length ; i++){
			this.data[i][0] = i * this.col_w;
		}
	}

	showData(){
		this.c.clearRect(0, 0, this.c_width, this.c_height);
		for(let i = 0; i < this.num ; i++){
			this.c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		}
	}
	setRandomData(){
		this.col_w = this.c_width / this.num;
		let cur_l = this.data.length;
		for(let i = 0; i < this.num - cur_l; i++){
			this.data.push([i * this.col_w, Math.floor(this.c_height - Math.random()*this.c_height)]);
		}
	}
	//Bubble sort
	BBsort(){
		this.status = 1;
		let req = requestAnimationFrame(this.BBsort.bind(this));
		this.c.clearRect(0, 0, this.c_width, this.c_height);
		this.c.fillStyle = "#ffffff";
		let count = 0;
		for(let i = 0; i < this.num ; i++){
			if(i + 1 < this.num && this.data[i][1] > this.data[i+1][1]){
				[this.data[i][1], this.data[i+1][1]] = [this.data[i+1][1], this.data[i][1]];

				this.c.fillStyle = "#ff0000";
				this.c.fillRect(this.data[i+1][0], this.c_height - this.data[i+1][1], this.col_w, this.data[i+1][1]);
				// this.c.fillRect(this.data[i+1][0], this.c_height - this.data[i+1][1], this.col_w, this.data[i+1][1]);
				this.c.fillStyle = "#ffffff";
			}
			else{
				count++;
				this.c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
			}
			
		}
		if (count >= this.num){
			this.c.fillStyle = "#00ff00";
			this.showData();
			cancelAnimationFrame(req);	
			this.status = 0;	
		}
	}
	//Insertion sort
	Isort(){
		let cur_index = 1;
		let recur = (d_index = 1) => {
			if(d_index < 1 || d_index > this.num-1 || this.data[d_index][1] > this.data[d_index-1][1]){
				return true;				
			}	
			[this.data[d_index - 1][1], this.data[d_index][1]] = [this.data[d_index][1], this.data[d_index - 1][1]];
			
			recur(d_index - 1);
		}
		let main = () => {
			this.status = 1;
			let req = requestAnimationFrame(main);
			// this.c.clearRect(0, 0, this.c_width, this.c_height);
			this.c.fillStyle = "#ffffff";
			
			// console.log(cur_index);
			// recur(cur_index);
			//this.showData();
			recur(cur_index);
			this.showData();
			
			this.c.fillStyle = "#ff0000";
			this.c.fillRect(this.data[cur_index][0], this.c_height - this.data[cur_index][1], this.col_w, this.data[cur_index][1]);
			this.c.fillStyle = "#ffffff";

			
			cur_index++;
			if(cur_index > this.num-1) {
				this.c.fillStyle = "#00ff00";
				this.showData();
				cancelAnimationFrame(req);	
				this.status = 0;
			}
		}
		main();
	}
}