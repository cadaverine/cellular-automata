const width = 800;
const height = 400;

let canvas = document.createElement("canvas");
let startButton = document.createElement("button");
let stopButton = document.createElement("button");

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});
Object.assign(stopButton, { className: "button stop-button"});

let startButtonText = document.createTextNode("Start");
let stopButtonText = document.createTextNode("Stop");

startButton.appendChild(startButtonText);
stopButton.appendChild(stopButtonText);

document.body.appendChild(canvas);
document.body.appendChild(startButton);
document.body.appendChild(stopButton);


let imageData = new ImageData(10, 10);

let ctx = canvas.getContext("2d");

ctx.putImageData(imageData, 20, 20);



console.log(imageData);
console.log(ctx);