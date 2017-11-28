class ImageDataMaker {
  constructor(width, height, matrix) {
    this.step = width / matrix.length;
    this.array = new Uint8ClampedArray(4 * width * height);
    this.matrix = matrix;
    this.width = width;
    this.height = height;
  }


  createImageData(r = 50, g = 50, b = 50, a = 100) {
    let width = this.matrix.length;
    let height = this.matrix[0].length;
    let array = this.array;
    let matrix = this.matrix;
    let colors = 4;
    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {
        let k = j * colors + i * height * colors;
        if (matrix[i][j] > 0) {
          array[    k] = r;
          array[1 + k] = g;
          array[2 + k] = b;
          array[3 + k] = a;
        }
        else {
          array[    k] = 0;
          array[1 + k] = 0;
          array[2 + k] = 0;
          array[3 + k] = 0;
        }
      }
    }

    let imageData = new ImageData(this.array, this.width, this.height);
    return imageData;
  }
}