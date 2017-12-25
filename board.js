class Board {
  constructor(width, height, step = 1) {
    this.step = step;

    // need an explanation:
    this.height = height / step;
    this.width = width / step;

    // this.currentMatrix = this.__createMatrix(this.width, this.height);
    // this.nextMatrix = this.__createMatrix(this.width, this.height);

    this._currentMatrix = new Uint8ClampedArray(this.width * this.height).fill(0);
    this._nextMatrix = new Uint8ClampedArray(this.width * this.height).fill(0);

    this.rules = {
      conway: this.__conway,
      steppers: this.__steppers
    }

    this.population = 0;
  }


  setRandom(density, fullness) {
    let width = this.width;
    let height = this.height * fullness;
    let reminder = this.height - height
    this.population = 0;

    // for(let i = 0; i < width; i++) {
    //   for(let j = 0; j < height; j++) {
    //     this.currentMatrix[i][j] = Math.round(density * Math.random());
    //     if (this.currentMatrix[i][j] > 0) {
    //       this.population++;
    //     }
    //   }
    // }
    // for(let i = 0; i < width; i++) {
    //   for(let j = height; j < height + reminder; j++) {
    //     this.currentMatrix[i][j] = 0;
    //   }
    // }

    for(let i = 0; i < height; i++) {
      for(let j = 0; j < width; j++) {
        this.currentMatrix[j + i * width] = Math.round(density * Math.random());
        if (this.currentMatrix[j + i * width]) {
          this.population++;
        }
      }
    }
    for(let i = 0; i < height; i++) {
      for(let j = width; j < width + reminder; j++){
        this.currentMatrix[j + i * width] = Math.round(density * Math.random());
      }
    }
  }

  // width + width * height

  // setRandom(density, fullness) {
  //   let width = this.width;
  //   let height = this.height * fullness;
  //   let reminder = this.height - height
  //   this.population = 0;

  //   for(let i = 0; i < width; i++) {

  //     for(let j = 0; j < height; j++) {
  //       this._currentMatrix[i + i * j] = Math.round(density * Math.random());
  //       if (this.currentMatrix[i + i * j] > 0) {
  //         this.population++;
  //       }
  //     }
  //   }
  //   for(let i = 0; i < width; i++) {
  //     for(let j = height; j < height + reminder; j++) {
  //       this.currentMatrix[i + i * j] = 0;
  //     }
  //   }
  // }


  nextStep(rule = "conway") {
    let width = this.width;
    let height = this.height;
    let nextMatrix = this.nextMatrix;
    let currentMatrix = this.currentMatrix;

    let config = new Uint8Array(8);
    let setNext = this.rules[rule];

    this.population = 0;

    // center
    for(let i = 1; i < height - 1; i++) {
      for(let j = 1; j < width - 1; j++) {
        config[0] = currentMatrix[j - 1 + (i - 1) * width];
        config[1] = currentMatrix[j     + (i - 1) * width];
        config[2] = currentMatrix[j + 1 + (i - 1) * width];
        config[3] = currentMatrix[j - 1 +  i      * width];
        config[4] = currentMatrix[j + 1 +  i      * width];
        config[5] = currentMatrix[j - 1 + (i + 1) * width];
        config[6] = currentMatrix[j     + (i + 1) * width];
        config[7] = currentMatrix[j + 1 + (i + 1) * width];

        setNext(this, config, i, j);
      }
    }

    // top-bottom sides
    for(let j = 1; j < width - 1; j++) {
      let i = 0;
      let h = height - 1;

      config[0] = currentMatrix[j - 1 +  h      * width];
      config[1] = currentMatrix[j     +  h      * width];
      config[2] = currentMatrix[j + 1 +  h      * width];
      config[3] = currentMatrix[j - 1 +  i      * width];
      config[4] = currentMatrix[j + 1 +  i      * width];
      config[5] = currentMatrix[j - 1 + (i + 1) * width];
      config[6] = currentMatrix[j     + (i + 1) * width];
      config[7] = currentMatrix[j + 1 + (i + 1) * width];

      setNext(this, config, i, j);

      i = height - 1;
      h = 0

      config[0] = currentMatrix[j - 1 + (i - 1) * width];
      config[1] = currentMatrix[j     + (i - 1) * width];
      config[2] = currentMatrix[j + 1 + (i - 1) * width];
      config[3] = currentMatrix[j - 1 +  i      * width];
      config[4] = currentMatrix[j + 1 +  i      * width];
      config[5] = currentMatrix[j - 1 +  h      * width];
      config[6] = currentMatrix[j     +  h      * width];
      config[7] = currentMatrix[j + 1 +  h      * width];

      setNext(this, config, i, j);
    }

    // right-left sides
    for(let i = 1; i < height - 1; i++) {
      let j = 0;
      let w = width - 1;

      config[0] = currentMatrix[w     + (i - 1) * width];
      config[1] = currentMatrix[j     + (i - 1) * width];
      config[2] = currentMatrix[j + 1 + (i - 1) * width];
      config[3] = currentMatrix[w     +  i      * width];
      config[4] = currentMatrix[j + 1 +  i      * width];
      config[5] = currentMatrix[w     + (i + 1) * width];
      config[6] = currentMatrix[j     + (i + 1) * width];
      config[7] = currentMatrix[j + 1 + (i + 1) * width];

      setNext(this, config, i, j);

      j = width - 1;
      w = 0;

      config[0] = currentMatrix[j - 1 + (i - 1) * width];
      config[1] = currentMatrix[j     + (i - 1) * width];
      config[2] = currentMatrix[w     + (i - 1) * width];
      config[3] = currentMatrix[j - 1 +  i      * width];
      config[4] = currentMatrix[w     +  i      * width];
      config[5] = currentMatrix[j - 1 + (i + 1) * width];
      config[6] = currentMatrix[j     + (i + 1) * width];
      config[7] = currentMatrix[w     + (i + 1) * width];

      setNext(this, config, i, j);
    }

    // corners
    let i = 0, j = 0;
    let w = width - 1,
        h = height - 1;

    // left-top corner
    config[0] = currentMatrix[w     +  h      * width];
    config[1] = currentMatrix[j     +  h      * width];
    config[2] = currentMatrix[j + 1 +  h      * width];
    config[3] = currentMatrix[w     +  i      * width];
    config[4] = currentMatrix[j + 1 +  i      * width];
    config[5] = currentMatrix[w     + (i + 1) * width];
    config[6] = currentMatrix[j     + (i + 1) * width];
    config[7] = currentMatrix[j + 1 + (i + 1) * width];

    setNext(this, leftTop, i, j);

    // right-top corner
    config[0] = currentMatrix[w - 1 +  h      * width];
    config[1] = currentMatrix[w     +  h      * width];
    config[2] = currentMatrix[j     +  h      * width];
    config[3] = currentMatrix[w - 1 +  i      * width];
    config[4] = currentMatrix[j     +  i      * width];
    config[5] = currentMatrix[w - 1 + (i + 1) * width];
    config[6] = currentMatrix[w     + (i + 1) * width];
    config[7] = currentMatrix[j     + (i + 1) * width];

    setNext(this, leftTop, i, j);

    // left-bottom corner
    config[0] = currentMatrix[w     + (h - 1) * width];
    config[1] = currentMatrix[j     + (h - 1) * width];
    config[2] = currentMatrix[j + 1 + (h - 1) * width];
    config[3] = currentMatrix[w     +  h      * width];
    config[4] = currentMatrix[j + 1 +  h      * width];
    config[5] = currentMatrix[w     +  i      * width];
    config[6] = currentMatrix[j     +  i      * width];
    config[7] = currentMatrix[j + 1 +  i      * width];

    setNext(this, leftTop, i, j);

    // right-bottom corner
    config[0] = currentMatrix[w - 1 + (h - 1) * width];
    config[1] = currentMatrix[w     + (h - 1) * width];
    config[2] = currentMatrix[j     + (h - 1) * width];
    config[3] = currentMatrix[w - 1 +  h      * width];
    config[4] = currentMatrix[j     +  h      * width];
    config[5] = currentMatrix[w - 1 +  i      * width];
    config[6] = currentMatrix[w     +  i      * width];
    config[7] = currentMatrix[j     +  i      * width];

    setNext(this, leftTop, i, j);

    this.currentMatrix = nextMatrix;
    this.nextMatrix = currentMatrix;
    return this.currentMatrix;
  }

  // ***********************
  // ***'Private methods'***
  // ***********************

  __conway(_this, config, i, j) {
    for(let i = 0; i < )


    if (_this.currentMatrix[i][j] >= 1) {
      if (accum == 2 || accum == 3) {
        _this.nextMatrix[i][j] = 1;
        _this.population++;
      }
      else {
        _this.nextMatrix[i][j] = 0;
      }
    }
    else {
      if (accum == 3) {
        _this.nextMatrix[i][j] = 1;
        _this.population++;
      }
      else {
        _this.nextMatrix[i][j] = 0;
      }
    }
  }


  // __conway(_this, accum, i, j) {
  //   if (_this.currentMatrix[i][j] >= 1) {
  //     if (accum == 2 || accum == 3) {
  //       _this.nextMatrix[i][j] = 1;
  //       _this.population++;
  //     }
  //     else {
  //       _this.nextMatrix[i][j] = 0;
  //     }
  //   }
  //   else {
  //     if (accum == 3) {
  //       _this.nextMatrix[i][j] = 1;
  //       _this.population++;
  //     }
  //     else {
  //       _this.nextMatrix[i][j] = 0;
  //     }
  //   }
  // }

  __steppers(_this, accum, i, j) {
    let oldNum = accum % 10;
    let youngNum = Math.floor(accum / 10);
    let neighbours = oldNum + youngNum;

    if (_this.currentMatrix[i][j] === 10) {
      _this.nextMatrix[i][j] = 1;
      _this.population++;
    }
    else if (_this.currentMatrix[i][j] === 1) {
      if ((neighbours == 2 || neighbours == 3) && youngNum <= 1) {
        _this.nextMatrix[i][j] = 1;
        _this.population++;
      }
      else {
        _this.nextMatrix[i][j] = 0;
      }
    }
    else {
      if (neighbours == 3 && oldNum >= 2) {
        _this.nextMatrix[i][j] = 10;
        _this.population++;
      }
      else {
        _this.nextMatrix[i][j] = 0;
      }
    }
  }

}