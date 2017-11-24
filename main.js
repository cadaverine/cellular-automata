const width = 600;
const height = 400;

let mainContainer = document.createElement("div");

let canvas = document.createElement("canvas");

let buttonContainer = document.createElement("div");
let startButton = document.createElement("button");
let stopButton = document.createElement("button");
let clearButton = document.createElement("button");
let startButtonText = document.createTextNode("Start");
let stopButtonText = document.createTextNode("Stop");
let clearButtonText= document.createTextNode("Clear");

Object.assign(canvas, { className: "canvas scene", width, height });
Object.assign(startButton, { className: "button start-button"});
Object.assign(stopButton, { className: "button stop-button"});
Object.assign(clearButton, { className: "button clear-button"});

Object.assign(mainContainer, { className: "container main-container" });
Object.assign(buttonContainer, { className: "container button-container" });

startButton.appendChild(startButtonText);
stopButton.appendChild(stopButtonText);
clearButton.appendChild(clearButtonText);
buttonContainer.appendChild(startButton);
buttonContainer.appendChild(stopButton);
buttonContainer.appendChild(clearButton);

mainContainer.appendChild(canvas);
mainContainer.appendChild(buttonContainer);

document.body.appendChild(mainContainer);

let imageData = new ImageData(10, 10);

let ctx = canvas.getContext("2d");
let output = ctx.createImageData(canvas.width, canvas.height);
let length = output.data.length;


// let interval = setInterval(() => {
// 	for (var i = 0; i < length; i++) {
// 		output.data[i] = Math.round(255 * Math.random());
// 	}
// 	ctx.putImageData(output, 0, 0);
// }, 60);

let interval = null;

startButton.onclick = (interval) => {
	if (interval === null) {
		interval = setInterval(() => {
			for (var i = 0; i < length; i++) {
				output.data[i] = Math.round(255 * Math.random());
			}
			ctx.putImageData(output, 0, 0);
		}, 60);
		console.log(interval);
	}
}


stopButton.onclick = (interval) => {
	console.log(interval);
	clearInterval(interval); // не работает (undefined)
	interval = null;
}


console.log(imageData);
console.log(ctx);


















