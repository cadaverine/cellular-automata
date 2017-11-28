class Board {
  constructor(canvas, step) {
    this.step = step;
    this.width = canvas.width / step;
    this.height = canvas.height / step;
    this.currentMatrix = this.__createMatrix(this.width, this.height);
    this.nextMatrix = this.__createMatrix(this.width, this.height);
  }


  setRandom(density) {
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        this.currentMatrix[i][j] = Math.round(density * Math.random());
      }
    }
  }


  nextStep() {
    let accum = 0;
    let accumTop = 0;
    let accumBottom = 0
    let accumLeft = 0;
    let accumRight = 0;

    let leftTop = 0;
    let rightTop = 0;
    let leftBottom = 0;
    let rightBottom = 0;

    // let width = this.width;
    // let height = this.height;
    let width = this.height;
    let height = this.width;
    let nextMatrix = this.nextMatrix;
    let currentMatrix = this.currentMatrix;

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

        this.__setNext(accum, i, j);
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

      this.__setNext(accumTop, i, j);

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

      this.__setNext(accumBottom, i, j);
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

      this.__setNext(accumLeft, i, j);

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

      this.__setNext(accumRight, i, j);
    }

    // Обновить углы
    // corners
    let i = 0, j = 0;
    leftTop = currentMatrix[i + 1][j    ] +
              currentMatrix[i + 1][j + 1] +
              currentMatrix[i    ][j + 1];
    this.__setNext(leftTop, i, j);

    i = width - 1, j = 0;
    rightTop = currentMatrix[i - 1][j    ] +
               currentMatrix[i - 1][j + 1] +
               currentMatrix[i    ][j + 1];
    this.__setNext(rightTop, i, j);

    i = 0, j = height - 1;
    leftBottom = currentMatrix[i + 1][j    ] +
                 currentMatrix[i + 1][j - 1] +
                 currentMatrix[i    ][j - 1];
    this.__setNext(leftBottom, i, j);

    i = width - 1, j = height - 1;
    rightBottom = currentMatrix[i - 1][j    ] +
                  currentMatrix[i - 1][j - 1] +
                  currentMatrix[i    ][j - 1];
    this.__setNext(rightBottom, i, j);


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

  // change to __setNext
  __setNext(accum, i, j) {
    if (this.currentMatrix[i][j] === 1) {
      if (accum == 2 || accum == 3) {
        this.nextMatrix[i][j] = 1;
      }
      else {
        this.nextMatrix[i][j] = 0;
      }
    }
    else {
      if (accum == 3) {
        this.nextMatrix[i][j] = 1;
      }
      else {
        this.nextMatrix[i][j] = 0;
      }
    }
  }
}