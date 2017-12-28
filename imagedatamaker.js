class ImageDataMaker {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }


  createImageData(matrix, colors) {
    let colorsNum = 4;
    let width = this.width;
    let height = this.height;
    let array = new Uint8ClampedArray(colorsNum * width * height);

    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
        // let k = j * colorsNum + i * height * colorsNum;
        let k = (j + i * width) * colorsNum;
        if (matrix[j + i * width] == 10){
          array[    k] = colors[2].r;
          array[1 + k] = colors[2].g;
          array[2 + k] = colors[2].b;
          array[3 + k] = colors[2].a;
        }
        else if (matrix[j + i * width] == 1) {
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

    // let imageData = new ImageData(this.array, height, width);
    // return imageData;
    return array;
  }
}