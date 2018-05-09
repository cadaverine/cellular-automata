let ruleSelect = document.getElementsByClassName("select-rules")[0];
let canvas = document.getElementsByClassName("canvas")[0];
let startButton = document.getElementsByClassName("start-button")[0];
let stopButton = document.getElementsByClassName("stop-button")[0];
let resetButton = document.getElementsByClassName("random-button")[0];
let intervalRange = document.getElementsByClassName("interval-range")[0];
let densityRange = document.getElementsByClassName("density-range")[0];
let fullnessRange = document.getElementsByClassName("free-space-range")[0];
let generationCounter = document.getElementsByClassName("counter generation")[0];
let populationCounter = document.getElementsByClassName("counter population")[0];

let width = canvas.width;
let height = canvas.height;

let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;

let rule = ruleSelect.value;
let interval = intervalRange.value;
let density = densityRange.value * 0.1;
let fullness = fullnessRange.value * 0.1;
let colors = [
  { r: 0,   g: 0,   b:   0, a:   0 },
  { r: 97,  g: 96,  b: 135, a: 100 },
  { r: 200, g: 200, b: 200, a: 200 }
]

let board = new Board(width, height);
let imageDataMaker = new ImageDataMaker(width, height);

board.setRandom(density, fullness);
let data = imageDataMaker.createImageData(board.currentMatrix, colors);
let imageData = new ImageData(data, 450, 300);
ctx.putImageData(imageData, 0, 0); 

let intervalID = null;
let generation = 0;
let population = board.population;
generationCounter.textContent = generation;
populationCounter.textContent = population;


startButton.onclick = () => {
  if (!intervalID) {
    intervalID = setInterval(() => {
      rule = ruleSelect.value;
      step = board.nextStep(rule);
      requestAnimationFrame(() => {
        data = imageDataMaker.createImageData(board.currentMatrix, colors);
        imageData = new ImageData(data, 450, 300);
        ctx.putImageData(imageData, 0, 0);
      }) 
      generationCounter.textContent = ++generation;
      populationCounter.textContent = board.population;
    }, interval);
  }
}


stopButton.onclick = () => {
  clearInterval(intervalID);
  intervalID = null;
}


intervalRange.oninput = () => {
  if (!intervalID) {
    interval = intervalRange.value;
  }
  else {
    interval = intervalRange.value;
    clearInterval(intervalID);
    intervalID = setInterval(() => {
      rule = ruleSelect.value;
      step = board.nextStep(rule);
      requestAnimationFrame(() => {
        data = imageDataMaker.createImageData(board.currentMatrix, colors);
        imageData = new ImageData(data, 450, 300);
        ctx.putImageData(imageData, 0, 0);
      })
      generationCounter.textContent = ++generation;
      populationCounter.textContent = board.population;
    }, interval);
  }
}


let resetOrChange = () => {
  clearInterval(intervalID);
  intervalID = null;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  density = densityRange.value * 0.1;
  fullness = fullnessRange.value * 0.1;

  board.setRandom(density, fullness);
  requestAnimationFrame(() => {
    data = imageDataMaker.createImageData(board.currentMatrix, colors);
    imageData = new ImageData(data, 450, 300);
    ctx.putImageData(imageData, 0, 0);
  })
  generation = 0;
  generationCounter.textContent = generation;
  populationCounter.textContent = board.population;
}


resetButton.onclick = resetOrChange;
densityRange.oninput = resetOrChange;
fullnessRange.oninput = resetOrChange;