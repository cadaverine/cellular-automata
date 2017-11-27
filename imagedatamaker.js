class ImageDataMaker {
	constructor(width, height, matrix) {
		this.step = width / matrix.length;
		this.array = new Uint8ClampedArray(4 * width * height);
		this.matrix = matrix;
		this.width = width;
		this.height = height;
	}

	createImageData(r = 100, g = 100, b = 100, a = 50) {
		let width = this.matrix.length;
		let height = this.matrix[0].length;
		let array = this.array;
		let matrix = this.matrix;
		let colors = 4;
		for(let i = 0; i < width; i++) {
			for(let j = 0; j < height; j++) {
				let num = matrix[i][j];
				let k = j * colors + i * height * colors;
				array[    k] = r * num;
				array[1 + k] = g * num;
				array[2 + k] = b * num;
				array[3 + k] = a * num;
			}
		}

		let imageData = new ImageData(this.array, this.width, this.height);
		return imageData;
	}
}