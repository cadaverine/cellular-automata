const width = 800;
const height = 400;

let canvas = document.createElement("canvas");
let startButton = document.createElement("button");

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});

let startButtonText = document.createTextNode("Start");

startButton.appendChild(startButtonText);
document.body.appendChild(canvas);
document.body.appendChild(startButton);



