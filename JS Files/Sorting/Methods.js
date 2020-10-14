class Method{
	constructor(funcs, num, data, canvas){
		this.c = funcs;
		this.data = data;
		this.c_height = canvas.height;
		this.c_width = canvas.width;
		this.num = num;
		this.col_w = this.c_width / this.num;
	}

	updatePara(){
		this.num = this.data.length;
		this.col_w = this.c_width / this.num;
		for(let i = 0; i < this.num ; i++){
			this.data[i][0] = i * this.col_w;
		}
	}

	showData(){
		for(let i = 0; i < this.num ; i++){
			this.c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		}
	}
	setRandomData(){
		this.data = [];
		this.col_w = this.c_width / this.num;
		for(let i = 0; i < this.num; i++){
			this.data.push([i * this.col_w, Math.floor(this.c_height - Math.random()*this.c_height)]);
		}
	}

	BBsort(){
		let req = requestAnimationFrame(this.BBsort.bind(this));
		this.c.clearRect(0, 0, this.c_width, this.c_height);
		this.c.fillStyle = "#ffffff";
		let count = 0;
		// console.log("1");
		for(let i = 0; i < this.num ; i++){
			if(i + 1 < this.num && this.data[i][1] > this.data[i+1][1]){
				let temp = this.data[i+1][1];
				this.data[i+1][1] = this.data[i][1];
				this.data[i][1] = temp;
			}
			else{
				count++;
			}
			this.c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
		}
		if (count >= this.num){
			this.c.fillStyle = "#00ff00";
			for(let i = 0; i < this.num ; i++){
				this.c.fillRect(this.data[i][0], this.c_height - this.data[i][1], this.col_w, this.data[i][1]);
			}
			cancelAnimationFrame(req);
		}
	}
}