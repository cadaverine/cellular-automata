class ImageDataMaker {
  constructor(width, height) {
    this.array = new Uint8ClampedArray(4 * width * height);
  }


  createImageData(matrix, colors) {
    let width = matrix.length;
    let height = matrix[0].length;
    let array = this.array;

    let colorsNum = 4;
    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {
        let k = j * colorsNum + i * height * colorsNum;
        if (matrix[i][j] == 10){
          array[    k] = colors[2].r;
          array[1 + k] = colors[2].g;
          array[2 + k] = colors[2].b;
          array[3 + k] = colors[2].a;
        }
        else if (matrix[i][j] == 1) {
          array[    k] = colors[1].r;
          array[1 + k] = colors[1].g;
          array[2 + k] = colors[1].b;
          array[3 + k] = colors[1].a;
        }
        else {
          array[    k] = colors[0].r;
          array[1 + k] = colors[0].g;
          array[2 + k] = colors[0].b;
          array[3 + k] = colors[0].a;
        }
      }
    }

    let imageData = new ImageData(this.array, this.width, this.height);
    return imageData;
  }
}