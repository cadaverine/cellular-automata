
// Пожелания:
// 1) Добавить алгоритм, который распознает осцилляторы, глайдеры,
// степперы и прочие стабильные конфигурации
// 2) Добавить возможность менять масштаб
// 3) Добавить поддержку других клеточных автоматов (напр. "Steppers")
// 4) Добавить параметр "возраст": молодость/зрелость/старость
// 4) Добавить температурную подсветку (зоны активности, затухания...)
// 5) Создание внешнего вида вынести в класс UI
// 6) Вынести обсчет матриц в Worker
// 7) Для обсчета матриц использовать WebAssembly (Rust) ?
// 8) Добавить возможность задавать произвольные правила

let ruleSelect = document.getElementsByClassName("select-rules")[0];
let canvas = document.getElementsByClassName("canvas")[0];
let startButton = document.getElementsByClassName("start-button")[0];
let stopButton = document.getElementsByClassName("stop-button")[0];
let randomButton = document.getElementsByClassName("random-button")[0];
let intervalRange = document.getElementsByClassName("interval-range")[0];
let densityRange = document.getElementsByClassName("density-range")[0];
let fullnessRange = document.getElementsByClassName("free-space-range")[0];
let counter = document.getElementsByClassName("counter")[0];

let width = canvas.width;
let height = canvas.height;

let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;

let rule = ruleSelect.value;
let interval = intervalRange.value;
let density = densityRange.value * 0.1;
let fullness = fullnessRange.value * 0.1;


let board = new Board(canvas, 1);
board.setRandom(density, fullness);
let maker = new ImageDataMaker(width, height, board.currentMatrix);
let data = maker.createImageData();
ctx.putImageData(data, 0, 0);



let intervalID = null;
let generation = 0;
counter.textContent = generation;

startButton.onclick = () => {
  if (!intervalID) {
    generation = 0;
    intervalID = setInterval(() => {
      rule = ruleSelect.value;
      step = board.nextStep(rule);
      let maker = new ImageDataMaker(width, height, board.currentMatrix);
      let data = maker.createImageData();
      ctx.putImageData(data, 0, 0);
      counter.textContent = ++generation;
    }, interval);
  }
}


stopButton.onclick = () => {
  clearInterval(intervalID);
  intervalID = null;
}


randomButton.onclick = () => {
  clearInterval(intervalID);
  intervalID = null;
  for (var i = 0; i < length; i++) {
    output.data[i] = 255;
  }
  density = densityRange.value * 0.1;
  fullness = fullnessRange.value * 0.1;
  board.setRandom(density, fullness);
  let maker = new ImageDataMaker(width, height, board.currentMatrix);
  let data = maker.createImageData();
  ctx.putImageData(data, 0, 0);
  generation = 0;
  counter.textContent = generation;
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
      let maker = new ImageDataMaker(width, height, board.currentMatrix);
      let data = maker.createImageData();
      ctx.putImageData(data, 0, 0);
      counter.textContent = ++generation;
    }, interval);
  }
}

// Переработать
fullnessRange.oninput = () => {
  clearInterval(intervalID);
  intervalID = null;
  for (var i = 0; i < length; i++) {
    output.data[i] = 255;
  }
  density = densityRange.value * 0.1;
  fullness = fullnessRange.value * 0.1;
  board.setRandom(density, fullness);
  let maker = new ImageDataMaker(width, height, board.currentMatrix);
  let data = maker.createImageData();
  ctx.putImageData(data, 0, 0);
  generation = 0;
  counter.textContent = generation;
}

// Переработать
densityRange.oninput = () => {
  clearInterval(intervalID);
  intervalID = null;
  for (var i = 0; i < length; i++) {
    output.data[i] = 255;
  }
  density = densityRange.value * 0.1;
  fullness = fullnessRange.value * 0.1;
  board.setRandom(density, fullness);
  let maker = new ImageDataMaker(width, height, board.currentMatrix);
  let data = maker.createImageData();
  ctx.putImageData(data, 0, 0);
  generation = 0;
  counter.textContent = generation;
}

