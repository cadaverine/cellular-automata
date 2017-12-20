class WorkerManager {
  constructor(bufferLength, width, height, rule) {
    this.rule = rule;
    this.width = width;
    this.height = height;
    this.step = 1;

    this.dataBuffer = [];
    this.matrixBuffer = [];

    this.bufferLength = bufferLength;

    this.matrixWorker = new Worker("matrixworker.js");
    this.dataWorker = new Worker("dataworker.js");


    this.matrixWorker.onmessage = (message) => {
      this.matrixBuffer.push(message.data);
      this.dataWorker.postMessage({
        command: "create data",
        params: {
          matrix: this.matrixBuffer.shift(),
          colors: [
            { r:   0, g:   0, b:   0, a:   0 },
            { r: 100, g: 100, b: 100, a: 100 },
            { r: 200, g: 200, b: 200, a: 200 }
          ]
        }
      });
    }


    this.dataWorker.onmessage = (message) => {
      this.dataBuffer.push(message.data);
      if (this.dataBuffer.length < this.bufferLength) {
        this.matrixWorker.postMessage({
          command: "next",
          params: {
            rule: this.rule
          }
        });
      }
    }

    let message = {
      command: "construct",
      params: {
        width: this.width,
        height: this.height,
        step: this.step
      }
    }
    this.matrixWorker.postMessage(message);
    this.dataWorker.postMessage(message);
  }


  nextStep(rule = this.rule) {
    this.rule = rule;
    this.matrixWorker.postMessage({
      command: "next",
      params: {
        rule: this.rule
      }
    });
  }


  setRandomMatrix(density, fullness) {
    this.dataBuffer = [];
    this.matrixBuffer = [];
    this.matrixWorker.postMessage({
      command: "random",
      params: {
        density,
        fullness
      }
    });
  }

  // Добавить rule
  getData(rule = this.rule) {
    if (this.dataBuffer.length) {
      let data = this.dataBuffer.shift();
      this.nextStep(rule)
      return data;
    }
    else {
      this.nextStep(rule)
      return null;
    }
  }
}