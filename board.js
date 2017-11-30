class Board {
  constructor(canvas, step) {
    this.step = step;

    // need an explanation:
    this.height = canvas.width / step;
    this.width = canvas.height / step;

    this.currentMatrix = this.__createMatrix(this.width, this.height);
    this.nextMatrix = this.__createMatrix(this.width, this.height);

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

    for(let i = 0; i < width; i++) {
      for(let j = 0; j < height; j++) {
        this.currentMatrix[i][j] = Math.round(density * Math.random());
        if (this.currentMatrix[i][j] > 0) {
          this.population++;
        }
      }
    }
    for(let i = 0; i < width; i++) {
      for(let j = height; j < height + reminder; j++) {
        this.currentMatrix[i][j] = 0;
      }
    }
  }


  nextStep(rule = "steppers") {
    let accum = 0;
    let accumTop = 0;
    let accumBottom = 0
    let accumLeft = 0;
    let accumRight = 0;

    let leftTop = 0;
    let rightTop = 0;
    let leftBottom = 0;
    let rightBottom = 0;

    let width = this.width;
    let height = this.height;
    let nextMatrix = this.nextMatrix;
    let currentMatrix = this.currentMatrix;

    let setNext = this.rules[rule];

    this.population = 0;


    // center
    for(let i = 1; i < width - 1; i++) {
      for(let j = 1; j < height - 1; j++) {
        accum = currentMatrix[i - 1][j - 1] +
                currentMatrix[i    ][j - 1] +
                currentMatrix[i + 1][j - 1] +
                currentMatrix[i - 1][j    ] +
                currentMatrix[i + 1][j    ] +
                currentMatrix[i - 1][j + 1] +
                currentMatrix[i    ][j + 1] +
                currentMatrix[i + 1][j + 1];

        setNext(this, accum, i, j);
      }
    }

    // top-bottom, righn-left sides
    for(let i = 1; i < width - 1; i++) {
      let j = 0;
      let h = height - 1;
      accumTop = currentMatrix[i - 1][j    ] +
                 currentMatrix[i + 1][j    ] +
                 currentMatrix[i - 1][j + 1] +
                 currentMatrix[i    ][j + 1] +
                 currentMatrix[i + 1][j + 1] +
                 currentMatrix[i - 1][h    ] +
                 currentMatrix[i    ][h    ] +
                 currentMatrix[i + 1][h    ];

      setNext(this, accumTop, i, j);

      j = height - 1;
      h = 0
      accumBottom = currentMatrix[i - 1][j    ] +
                    currentMatrix[i + 1][j    ] +
                    currentMatrix[i - 1][j - 1] +
                    currentMatrix[i    ][j - 1] +
                    currentMatrix[i + 1][j - 1] +
                    currentMatrix[i - 1][h    ] +
                    currentMatrix[i    ][h    ] +
                    currentMatrix[i + 1][h    ];

      setNext(this, accumBottom, i, j);
    }

    for(let j = 1; j < height - 1; j++) {
      let i = 0;
      let w = width - 1;
      accumLeft = currentMatrix[i    ][j - 1] +
                  currentMatrix[i    ][j + 1] +
                  currentMatrix[i + 1][j - 1] +
                  currentMatrix[i + 1][j    ] +
                  currentMatrix[i + 1][j + 1] +
                  currentMatrix[w    ][j - 1] +
                  currentMatrix[w    ][j    ] +
                  currentMatrix[w    ][j + 1];

      setNext(this, accumLeft, i, j);

      i = width - 1;
      w = 0;
      accumRight = currentMatrix[i    ][j - 1] +
                   currentMatrix[i    ][j + 1] +
                   currentMatrix[i - 1][j - 1] +
                   currentMatrix[i - 1][j    ] +
                   currentMatrix[i - 1][j + 1] +
                   currentMatrix[w    ][j - 1] +
                   currentMatrix[w    ][j    ] +
                   currentMatrix[w    ][j + 1];

      setNext(this, accumRight, i, j);
    }

    // need to update
    // corners
    let i = 0, j = 0;
    leftTop = currentMatrix[i + 1][j    ] +
              currentMatrix[i + 1][j + 1] +
              currentMatrix[i    ][j + 1];
    setNext(this, leftTop, i, j);

    i = width - 1, j = 0;
    rightTop = currentMatrix[i - 1][j    ] +
               currentMatrix[i - 1][j + 1] +
               currentMatrix[i    ][j + 1];
    setNext(this, rightTop, i, j);

    i = 0, j = height - 1;
    leftBottom = currentMatrix[i + 1][j    ] +
                 currentMatrix[i + 1][j - 1] +
                 currentMatrix[i    ][j - 1];
    setNext(this, leftBottom, i, j);

    i = width - 1, j = height - 1;
    rightBottom = currentMatrix[i - 1][j    ] +
                  currentMatrix[i - 1][j - 1] +
                  currentMatrix[i    ][j - 1];
    setNext(this, rightBottom, i, j);


    this.currentMatrix = nextMatrix;
    this.nextMatrix = currentMatrix;
    return this.currentMatrix;
  }

  // ***********************
  // ***'Private methods'***
  // ***********************

  __createMatrix(width, height) {
    let matrix = []
    for(let i = 0; i < width; i++) {
      matrix.push([]);
      for(let j = 0; j < height; j++) {
        matrix[i].push(0);
      }
    }
    return matrix;
  }


  __conway(_this, accum, i, j) {
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